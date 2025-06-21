package com.shifterz.ocr

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Matrix
import android.graphics.RectF
import android.util.Log
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import androidx.camera.core.resolutionselector.AspectRatioStrategy
import androidx.camera.core.resolutionselector.ResolutionSelector
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import com.shifterz.code.OCRErrorCode
import com.shifterz.model.OCRModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import org.tensorflow.lite.Interpreter
import java.nio.MappedByteBuffer
import java.nio.channels.FileChannel
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.math.roundToInt
import androidx.core.graphics.createBitmap
import kotlinx.coroutines.withContext
import org.tensorflow.lite.DataType
import org.tensorflow.lite.support.common.ops.NormalizeOp
import org.tensorflow.lite.support.image.ImageProcessor
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.image.ops.ResizeOp
import org.tensorflow.lite.support.image.ops.TransformToGrayscaleOp
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.nio.ByteBuffer

class OCRProcessor(
    private val context: Context,
    private val lifecycleOwner: LifecycleOwner,
    private val listener: OCRResultListener,
    private val coroutineScope: CoroutineScope
) {
    private var cameraOCRProvider: ProcessCameraProvider? = null
    private var imageAnalyzer: ImageAnalysis? = null
    private var interpreter: Interpreter? = null

    private lateinit var cameraExecutor: ExecutorService

    private val ocrModel = OCRModel()
    private var roiRect: RectF = RectF(0f, 0f, 1f, 1f) // 기본값: 전체 화면

    fun initOCRModel(modelName: String) {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val modelFile = loadModelFile(context, modelName)
                val options = Interpreter.Options()
                interpreter = Interpreter(modelFile, options)

                // Debugging Code
                Log.d("OCRProcessor", "Model '$modelName' initialized successfully.")
                for (i in 0 until interpreter!!.inputTensorCount) {
                    val inputTensor = interpreter!!.getInputTensor(i)
                    Log.d("OCRProcessor", "Input tensor $i: Shape=${inputTensor.shape().contentToString()}, Type=${inputTensor.dataType()}")
                }
                for (i in 0 until interpreter!!.outputTensorCount) {
                    val outputTensor = interpreter!!.getOutputTensor(i)
                    Log.d("OCRProcessor", "Output tensor $i: Shape=${outputTensor.shape().contentToString()}, Type=${outputTensor.dataType()}")
                }
            } catch (e: Exception) {
                listener.onOCRError(OCRErrorCode.FAIL_TO_INIT_OCR_MODEL)
            }
        }
    }

    fun startCameraAnalysis() {
        cameraExecutor = Executors.newSingleThreadExecutor()
        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)

        cameraProviderFuture.addListener(
            {
                cameraOCRProvider = cameraProviderFuture.get()
                val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

                imageAnalyzer = ImageAnalysis.Builder()
                    .setResolutionSelector(
                        ResolutionSelector.Builder()
                            .setResolutionFilter { supportedSizes, _ ->
                                supportedSizes.filter { size -> size.width <= 1920 && size.height <= 1080 }
                            }
                            .setAspectRatioStrategy(AspectRatioStrategy.RATIO_16_9_FALLBACK_AUTO_STRATEGY)
                            .build()
                    )
                    .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                    .setImageQueueDepth(1)
                    .build()
                    .also {
                        it.setAnalyzer(cameraExecutor) { imageProxy ->
                            coroutineScope.launch(Dispatchers.Default) {
                                imageProxy.processImageProxy()
                            }
                        }
                    }

                try {
                    cameraOCRProvider?.unbindAll()
                    cameraOCRProvider?.bindToLifecycle(lifecycleOwner, cameraSelector, imageAnalyzer)
                } catch (e: Exception) {
                    listener.onOCRError(OCRErrorCode.FAIL_TO_START_CAMERA)
                }
            },
            ContextCompat.getMainExecutor(context)
        )
    }

    private suspend fun ImageProxy.processImageProxy() {
        try {
            val yBuffer = this.planes[0].buffer

            val (originalWidth, originalHeight) = this.width to this.height
            val cropLeft = (originalWidth * roiRect.left).roundToInt()
            val cropTop = (originalHeight * roiRect.top).roundToInt()
            val cropRight = (originalWidth * roiRect.right).roundToInt()
            val cropBottom = (originalHeight * roiRect.bottom).roundToInt()

            val cropWidth = cropRight - cropLeft
            val cropHeight = cropBottom - cropTop

            if (cropWidth <= 0 || cropHeight <= 0) {
                return
            }

            val ySize = yBuffer.remaining()
            val yPlane = ByteArray(ySize)
            yBuffer.get(yPlane)

            val yBitmap = createBitmap(cropWidth, cropHeight)
            val buffer = ByteBuffer.wrap(yPlane)

            yBitmap.copyPixelsToBuffer(buffer)

            val croppedBitmap = Bitmap.createBitmap(yBitmap, 0, 0, cropWidth, cropHeight)
            yBitmap.recycle()


            val rotationDegrees = this.imageInfo.rotationDegrees
            val rotatedCroppedBitmap = if (rotationDegrees != 0) {
                val matrix = Matrix().apply { postRotate(rotationDegrees.toFloat()) }
                Bitmap.createBitmap(croppedBitmap, 0, 0, croppedBitmap.width, croppedBitmap.height, matrix, true)
            } else {
                croppedBitmap
            }
            croppedBitmap.recycle()

            rotatedCroppedBitmap.runInferenceOnBitmap()

        } catch (e: Exception) {
            listener.onOCRError(OCRErrorCode.FAIL_TO_PROCESSING)
        } finally {
            this.close()
        }
    }

    private suspend fun Bitmap.runInferenceOnBitmap() {
        withContext(Dispatchers.IO) {
            if (interpreter == null) {
                listener.onOCRError(OCRErrorCode.FAIL_TO_INIT_INTERPRETER)
                return@withContext
            }


            try {
                val tensorImage = TensorImage(ocrModel.inputDataType)
                tensorImage.load(this@runInferenceOnBitmap)

                val imageProcessor = ImageProcessor.Builder()
                    .add(TransformToGrayscaleOp())
                    .add(
                        ResizeOp(
                            ocrModel.height,
                            (this@runInferenceOnBitmap.width * (ocrModel.height.toFloat() / this@runInferenceOnBitmap.height).roundToInt()),
                            ResizeOp.ResizeMethod.BILINEAR
                        )
                    )
                    .add(ResizeOp(ocrModel.height, ocrModel.width, ResizeOp.ResizeMethod.BILINEAR))
                    .add(NormalizeOp(0f, 255f)) // 0-1 정규화
                    .build()

                imageProcessor.process(tensorImage)

                val inputTensorShape = interpreter?.getInputTensor(0)?.shape() ?: return@withContext
                val inputBuffer = TensorBuffer.createFixedSize(inputTensorShape, ocrModel.inputDataType)

                inputBuffer.loadBuffer(tensorImage.buffer)

                val outputTensorShape = interpreter?.getOutputTensor(0)?.shape() ?: intArrayOf(1, 100, 50)
                val outputBuffer = TensorBuffer.createFixedSize(outputTensorShape, DataType.FLOAT32)

                val outputs = mutableMapOf<Int, Any>()
                outputs[0] = outputBuffer.buffer

                interpreter?.run(inputBuffer.buffer, outputBuffer.buffer)

                val outputArray = outputBuffer.floatArray

                // TODO("모델 출력 해석로직 작성")

                val recognizedText = outputArray.sliceArray(0..5).joinToString(", ")
                val confidence = (outputArray.maxOrNull() ?: 0f) * 100 // 임시 신뢰도

                // 바운딩 박스도 모델이 반환한다면 파싱하여 리스트에 추가 (예시)
                val boundingBoxes: List<List<Int>>? = null

                withContext(Dispatchers.Main) {
                    listener.onOCRResult(200, recognizedText)
                }

            } catch (e: Exception) {
                listener.onOCRError(OCRErrorCode.FAIL_TO_GET_RESULT)
            } finally {
                this@runInferenceOnBitmap.recycle()
            }
        }
    }

    fun stopCameraAnalysis() {
        cameraOCRProvider?.unbindAll()
        cameraExecutor.shutdown()
        interpreter?.close()
        interpreter = null

        coroutineScope.cancel()
    }

    private fun loadModelFile(context: Context, modelName: String): MappedByteBuffer {
        val fileDescriptor = context.assets.openFd(modelName)
        val inputStream = fileDescriptor.createInputStream()
        val fileChannel = inputStream.channel
        val startOffset = fileDescriptor.startOffset
        val declaredLength = fileDescriptor.declaredLength
        return fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength)
    }
}