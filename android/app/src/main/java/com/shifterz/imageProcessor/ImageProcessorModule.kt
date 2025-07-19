package com.shifterz.imageProcessor

import android.graphics.BitmapFactory
import android.util.Base64
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.shifterz.util.ImageProcessingException
import org.opencv.android.OpenCVLoader

class ImageProcessorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val imageProcessor: ImageProcessor = ImageProcessor(reactContext)

    override fun getName(): String = "ImageProcessorModule"

    @ReactMethod
    fun processImageFromBase64(base64Image: String, promise: Promise) {
        if (!OpenCVLoader.initLocal()) {
            val errorMessage = "OpenCV failed to load: check OpenCV Android SDK integration."
            promise.reject("OPENCV_LOAD_ERROR", errorMessage)
            return
        }

        try {
            val decodedBytes = Base64.decode(base64Image, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)

            reactApplicationContext.currentActivity?.runOnUiThread {
                try {
                    val jsonResult = imageProcessor.processImage(bitmap)
                    promise.resolve(jsonResult)
                } catch (e: ImageProcessingException) {
                    promise.reject("IMAGE_PROCESSING_ERROR", e.message, e)
                } catch (e: Exception) {
                    promise.reject("UNKNOWN_ERROR", "An unexpected error occurred: ${e.message}", e)
                } finally {
                    bitmap.recycle()
                }
            }
        } catch (e: IllegalArgumentException) {
            promise.reject("BASE64_DECODE_ERROR", "Invalid Base64 string: ${e.message}", e)
        } catch (e: Exception) {
            promise.reject("PROCESSING_INIT_ERROR", "Error during module initialization or image decode: ${e.message}", e)
        }
    }

    /**
     * 이미지 파일 경로를 통해 처리하는 메서드 (선택 사항, Base64 방식이 더 흔하게 사용됨)
     * @param imagePath 처리할 이미지 파일의 절대 경로
     * @param promise 결과를 JavaScript로 비동기적으로 반환하기 위한 Promise 객체
     */
    @ReactMethod
    fun processImageFromFile(imagePath: String, promise: Promise) {
        if (!OpenCVLoader.initLocal()) {
            promise.reject("OPENCV_LOAD_ERROR", "OpenCV failed to load!")
            return
        }

        reactApplicationContext.currentActivity?.runOnUiThread {
            try {
                val bitmap = BitmapFactory.decodeFile(imagePath)
                if (bitmap == null) {
                    promise.reject("FILE_DECODE_ERROR", "Failed to decode bitmap from path: $imagePath")
                    return@runOnUiThread
                }
                val jsonResult = imageProcessor.processImage(bitmap)
                promise.resolve(jsonResult)
            } catch (e: ImageProcessingException) {
                promise.reject("IMAGE_PROCESSING_ERROR", e.message, e)
            } catch (e: Exception) {
                promise.reject("UNKNOWN_ERROR", "An unexpected error occurred: ${e.message}", e)
            }
        }
    }
}