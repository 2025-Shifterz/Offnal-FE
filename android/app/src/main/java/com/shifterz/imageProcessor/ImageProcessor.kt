package com.shifterz.imageProcessor

import android.content.Context
import android.graphics.Bitmap
import com.shifterz.util.Constants
import com.shifterz.util.ImageProcessingException
import org.json.JSONObject
import org.opencv.android.Utils
import org.opencv.core.*
import org.opencv.imgcodecs.Imgcodecs
import org.opencv.imgproc.Imgproc
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil.loadMappedFile
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.max
import kotlin.math.min
import kotlin.math.hypot


class ImageProcessor(context: Context) {
    private var tfLiteInterpreter: Interpreter
    private var tfLiteInputShape: IntArray

    init {
        try {
            val modelBuffer = loadMappedFile(context, Constants.TF_LITE_MODEL_NAME)
            val options = Interpreter.Options()

            tfLiteInterpreter = Interpreter(modelBuffer, options)
            tfLiteInputShape = tfLiteInterpreter.getInputTensor(0).shape()

            println("TFLite interpreter initialized. Input shape: ${tfLiteInputShape.joinToString()}")
        } catch (e: Exception) {
            println("Error initializing TFLite interpreter: ${e.message}")
            e.printStackTrace()

            throw ImageProcessingException("Failed to initialize TFLite interpreter: ${e.message}", e)
        }
    }

    private fun sortPoints(pts: MatOfPoint2f): Array<Point> {
        val rect = arrayOfNulls<Point>(4)
        val points = pts.toArray()

        val sums = points.map { it.x + it.y }
        rect[0] = points[sums.indexOf(sums.minOrNull())]
        rect[2] = points[sums.indexOf(sums.maxOrNull())]

        val diffs = points.map { it.x - it.y }
        rect[1] = points[diffs.indexOf(diffs.minOrNull())]
        rect[3] = points[diffs.indexOf(diffs.maxOrNull())]

        return rect.filterNotNull().toTypedArray()
    }


    private fun tightCropAndResize(cellImg: Mat, outSize: Size = Size(Constants.CELL_IMG_SIZE.toDouble(), Constants.CELL_IMG_SIZE.toDouble()), extraCrop: Int = 3): Mat {
        if (cellImg.empty()) {
            return Mat(outSize, CvType.CV_8UC1, Scalar(255.0))
        }

        val threshed = Mat()
        Imgproc.threshold(cellImg, threshed, 200.0, 255.0, Imgproc.THRESH_BINARY)

        val inv = Mat()
        Core.subtract(threshed, Scalar(255.0), inv)
        threshed.release()

        val nonZeroCoords = Mat()
        Core.findNonZero(inv, nonZeroCoords)
        inv.release()

        var cropped: Mat
        if (!nonZeroCoords.empty()) {
            val boundingRect = Imgproc.boundingRect(nonZeroCoords)
            nonZeroCoords.release()

            val x1 = max(boundingRect.x + extraCrop, 0)
            val y1 = max(boundingRect.y + extraCrop, 0)
            val x2 = min(boundingRect.x + boundingRect.width - extraCrop, cellImg.cols())
            val y2 = min(boundingRect.y + boundingRect.height - extraCrop, cellImg.rows())

            if (x2 > x1 && y2 > y1) {
                cropped = cellImg.submat(Rect(x1, y1, x2 - x1, y2 - y1))
            } else {
                cropped = cellImg.submat(boundingRect)
            }
        } else {
            cropped = cellImg.clone()
        }

        val resized = Mat()
        Imgproc.resize(cropped, resized, outSize)
        cropped.release()

        return resized
    }


    private fun classifyCell(cellImg: Mat, debug: Boolean = false, r: Int = 0, c: Int = 0): String {
        val tightImg = tightCropAndResize(cellImg)
        val highValPixels = Mat()
        Imgproc.threshold(tightImg, highValPixels, 180.0, 255.0, Imgproc.THRESH_BINARY)
        val whiteRatio = Core.countNonZero(highValPixels).toDouble() / (tightImg.rows() * tightImg.cols())
        highValPixels.release() // 사용 후 해제

        if (debug) {
            println("Cell ($r, $c) white_ratio: ${"%.3f".format(whiteRatio)}")
        }

        if (debug) {
            Imgcodecs.imwrite("/sdcard/debug_cell_${r}_${c}.png", tightImg)
        }

        // 1. white_ratio로 먼저 빈칸 필터링 (Python의 WHITE_THRESH 사용)
        if (whiteRatio > Constants.WHITE_THRESH) {
            if (debug) println("Blank cell detected by white_ratio: ${"%.3f".format(whiteRatio)}")
            tightImg.release()
            return "-"
        }


        // TFLite 모델 입력 준비
        val inputBuffer = ByteBuffer.allocateDirect(1 * tfLiteInputShape[1] * tfLiteInputShape[2] * tfLiteInputShape[3] * 4).order(ByteOrder.nativeOrder())
        val floatMat = Mat()
        tightImg.convertTo(floatMat, CvType.CV_32F, 1.0 / 255.0) // 픽셀 값을 0-255에서 0-1로 정규화
        tightImg.release() // 사용 후 해제

        val floatArray = FloatArray(tfLiteInputShape[1] * tfLiteInputShape[2])
        floatMat.get(0, 0, floatArray)
        floatMat.release() // 사용 후 해제

        floatArray.forEach { inputBuffer.putFloat(it) }

        val outputArray = Array(1) { FloatArray(Constants.CLASS_LABELS.size) }

        tfLiteInterpreter.run(inputBuffer, outputArray)

        val probabilities = outputArray[0]
        val maxProb = probabilities.maxOrNull() ?: 0f // 최대 확률
        val maxIndex = probabilities.indices.maxByOrNull { probabilities[it] } ?: -1

        if (debug) {
            println("Probabilities: D=${"%.3f".format(probabilities[0])}, N=${"%.3f".format(probabilities[1])}, E=${"%.3f".format(probabilities[2])} (max=${"%.3f".format(maxProb)})")
        }

        if (maxProb < 0.7f) {
            if (debug) println("Blank cell detected by prob: ${"%.3f".format(maxProb)}")
            return "-"
        }

        return if (maxIndex != -1) Constants.CLASS_LABELS[maxIndex] else "-"
    }

    private fun findSeparators(mask: Mat, axis: String, ratio: Double = 0.5): List<Int> {
        val proj = Mat()
        Core.reduce(mask, proj, if (axis == "x") 0 else 1, Core.REDUCE_SUM, CvType.CV_32S)

        val thresh = Core.minMaxLoc(proj).maxVal * ratio

        val indices = (0 until if (axis == "x") proj.cols() else proj.rows()).filter { idx ->
            proj.get(if (axis == "x") 0 else idx, if (axis == "x") idx else 0)[0] > thresh
        }.sorted()

        proj.release()

        if (indices.isEmpty()) return emptyList()

        val groups = mutableListOf<MutableList<Int>>()
        var currentGroup = mutableListOf(indices[0])

        for (i in 1 until indices.size) {
            if (indices[i] > indices[i - 1] + 1) { // 픽셀이 연속되지 않으면 새 그룹 시작
                groups.add(currentGroup)
                currentGroup = mutableListOf()
            }
            currentGroup.add(indices[i])
        }
        groups.add(currentGroup) // 마지막 그룹 추가

        return groups.map { it.sorted()[it.size / 2] } // 각 그룹의 중앙값 반환
    }

    private fun getTableCellsAndWarp(origImgBitmap: Bitmap): Triple<Mat, List<Pair<Int, Int>>, List<Pair<Int, Int>>> {
        val origImg = Mat()
        Utils.bitmapToMat(origImgBitmap, origImg) // RGBA Mat

        val maxWidthLimit = 1000
        if (origImg.cols() > maxWidthLimit) {
            val scale = maxWidthLimit / origImg.cols().toDouble()
            Imgproc.resize(origImg, origImg, Size(maxWidthLimit.toDouble(), (origImg.rows() * scale).toDouble()))
        }

        val gray = Mat()
        Imgproc.cvtColor(origImg, gray, Imgproc.COLOR_RGBA2GRAY) // Bitmap은 보통 RGBA

        val blur = Mat()
        Imgproc.GaussianBlur(gray, blur, Size(5.0, 5.0), 0.0)

        val binary = Mat()
        Imgproc.adaptiveThreshold(blur, binary, 255.0, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV, 15, 8.0)
        blur.release() // 사용 후 해제

        val contours: List<MatOfPoint> = ArrayList()
        val hierarchy = Mat()
        Imgproc.findContours(binary, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE)
        hierarchy.release() // 사용 후 해제

        val sortedContours = contours.sortedByDescending { Imgproc.contourArea(it) }

        var tableContour: MatOfPoint2f? = null
        for (cnt in sortedContours) {
            val peri = Imgproc.arcLength(MatOfPoint2f(*cnt.toArray()), true)
            val approx = MatOfPoint2f()
            Imgproc.approxPolyDP(MatOfPoint2f(*cnt.toArray()), approx, 0.02 * peri, true)
            if (approx.rows() == 4) { // 4개의 꼭지점을 가진 사각형 컨투어
                tableContour = approx
                break
            }
            approx.release() // 사용 후 해제
        }

        val warpedImg: Mat
        val finalGray: Mat

        if (tableContour != null) {
            val rectPoints = sortPoints(tableContour)

            val tl = rectPoints[0]; val tr = rectPoints[1]; val br = rectPoints[2]; val bl = rectPoints[3]
            val widthA = hypot(br.x - bl.x, br.y - bl.y)
            val widthB = hypot(tr.x - tl.x, tr.y - tl.y)
            val maxWidth = max(widthA, widthB).toInt()

            val heightA = hypot(tr.x - br.x, tr.y - br.y)
            val heightB = hypot(tl.x - bl.x, tl.y - bl.y)
            val maxHeight = max(heightA, heightB).toInt()

            val dstPts = MatOfPoint2f(
                Point(0.0, 0.0), Point(maxWidth - 1.0, 0.0),
                Point(maxWidth - 1.0, maxHeight - 1.0), Point(0.0, maxHeight - 1.0)
            )

            val M = Imgproc.getPerspectiveTransform(MatOfPoint2f(*rectPoints), dstPts)

            warpedImg = Mat()
            Imgproc.warpPerspective(origImg, warpedImg, M, Size(maxWidth.toDouble(), maxHeight.toDouble()))
            finalGray = Mat()
            Imgproc.cvtColor(warpedImg, finalGray, Imgproc.COLOR_RGBA2GRAY) // RGB->GRAY 대신 RGBA->GRAY 사용

            tableContour.release()
            dstPts.release()
            M.release()
        } else {
            println("⚠️ 표 외곽 인식 실패 — 원본 이미지 사용")
            warpedImg = origImg.clone()
            finalGray = Mat()
            Imgproc.cvtColor(warpedImg, finalGray, Imgproc.COLOR_RGBA2GRAY)
        }
        origImg.release() // 원본 Mat 해제

        val cellBinary = Mat()
        Imgproc.threshold(finalGray, cellBinary, 0.0, 255.0, Imgproc.THRESH_BINARY_INV + Imgproc.THRESH_OTSU)


        val hKernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(100.0, 1.0))
        val vKernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(1.0, 100.0))


        val hLines = Mat()
        val vLines = Mat()

        Imgproc.morphologyEx(cellBinary, hLines, Imgproc.MORPH_OPEN, hKernel)
        Imgproc.morphologyEx(cellBinary, vLines, Imgproc.MORPH_OPEN, vKernel)

        cellBinary.release()

        val xSeps = findSeparators(vLines, "x", 0.5)
        val ySeps = findSeparators(hLines, "y", 0.5)

        hLines.release()
        vLines.release()

        val dataRows = ySeps.subList(Constants.HEADER_SKIP_Y, ySeps.size).zipWithNext()
        val dataCols = xSeps.subList(Constants.HEADER_SKIP_X, xSeps.size).zipWithNext()


        return Triple(finalGray, dataRows, dataCols)
    }

    fun processImage(imageBitmap: Bitmap): String {
        val (processedGrayImage, dataRows, dataCols) = getTableCellsAndWarp(imageBitmap)

        if (dataRows.isEmpty() || dataCols.isEmpty()) {
            processedGrayImage.release() // 사용 후 해제
            throw ImageProcessingException("❌ 테이블 셀을 찾지 못했습니다. 데이터 행 또는 열이 비어 있습니다.")
        }

        val resultJson = JSONObject()
        var debugCount = 0

        dataRows.forEachIndexed { r, (y1, y2) ->
            val rowDict = JSONObject()
            dataCols.forEachIndexed { c, (x1, x2) ->
                val cellRect = Rect(x1, y1, x2 - x1, y2 - y1)
                val cellImg = Mat(processedGrayImage, cellRect)

                val debug = (debugCount < 30)

                val classificationResult = classifyCell(cellImg, debug, r, c)
                rowDict.put((c + 1).toString(), classificationResult)

                if (debug) debugCount++
                cellImg.release()
            }
            resultJson.put((r + 1).toString(), rowDict)
        }

        processedGrayImage.release()

        return resultJson.toString(2)
    }
}