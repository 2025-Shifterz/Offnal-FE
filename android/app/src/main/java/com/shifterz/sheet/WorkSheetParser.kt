package com.shifterz.sheet

import android.content.Context
import android.graphics.Bitmap
import org.opencv.android.OpenCVLoader
import org.opencv.android.Utils
import org.opencv.core.*
import org.tensorflow.lite.Interpreter
import java.io.FileInputStream
import java.nio.ByteBuffer
import java.nio.channels.FileChannel

class WorkSheetParser(context: Context) {
    private val interpreter: Interpreter

    companion object {
        private const val WHITE_THRESH = 0.92
        private const val LOW_CONF_MIN = 0.2
        private const val LOW_CONF_MAX = 0.6
        private const val HIGH_CONF_THRESH = 0.8
        private const val HEADER_SKIP_Y = 1
        private const val HEADER_SKIP_X = 1
        private val CLASS_LABELS = listOf("D", "N", "E")
    }

    init {
        OpenCVLoader.initLocal()
        interpreter = Interpreter(
            loadModelFile(
                context = context,
                modelName = "dne_classifier_with_metadata.tflite"
            )
        )
    }

    private fun loadModelFile(context: Context, modelName: String): ByteBuffer {
        val assetFileDescriptor = context.assets.openFd(modelName)
        val fileInputStream = FileInputStream(assetFileDescriptor.fileDescriptor)
        val fileChannel = fileInputStream.channel
        val startOffset = assetFileDescriptor.startOffset
        val declaredLength = assetFileDescriptor.declaredLength
        return fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength)
    }


    fun parse(imageBitmap: Bitmap): String {
        val origMat = Mat()
        Utils.bitmapToMat(imageBitmap, origMat)

        var warped = detectAndWarpTable(origMat)
        if (warped.height() > warped.width()) {
            Core.rotate(warped, warped, Core.ROTATE_90_CLOCKWISE)
        }

        var (result, lowConfFound) = runPass(warped)

        // 3. 저신뢰 결과 발견 시, 180도 회전 후 2차 분석 실행
        if (lowConfFound) {
            println("⟲ 저신뢰 확률 발견 → 180° 회전 후 완전 재실행")
            Core.rotate(warped, warped, Core.ROTATE_180)
            val (finalResult, _) = runPass(warped)
            result = finalResult // 2차 분석 결과로 교체
        }

        return result.toString(2)
    }

    private fun runPass(warped: Mat): Pair<JSONObject, Boolean> {
        val gray = Mat()
        Imgproc.cvtColor(warped, gray, Imgproc.COLOR_BGR2GRAY)

        val (dataRows, dataCols) = getTableCells(gray)
        if (dataRows.isEmpty() || dataCols.isEmpty()) {
            return Pair(JSONObject().put("error", "표의 셀을 찾지 못했습니다."), false)
        }

        val result = JSONObject()
        var lowConfFound = false

        dataRows.forEachIndexed { r, pair ->
            val (y1, y2) = pair

            val rowDict = JSONObject()
            dataCols.forEachIndexed { c, (x1, x2) ->
                val cellRect = Rect(x1, y1, x2 - x1, y2 - y1)
                val cellImg = Mat(gray, cellRect)
                val (label, maxProb, _) = classifyCell(cellImg)
                rowDict.put((c + 1).toString(), label)

                if (maxProb in LOW_CONF_MIN..LOW_CONF_MAX) {
                    lowConfFound = true
                }
            }
            result.put((r + 1).toString(), rowDict)
        }
        return Pair(result, lowConfFound)
    }

    private fun detectAndWarpTable(img: Mat): Mat {
        val gray = Mat(); Imgproc.cvtColor(img, gray, Imgproc.COLOR_BGR2GRAY)
        val blur = Mat(); Imgproc.GaussianBlur(gray, blur, Size(5.0, 5.0), 0.0)
        val binary = Mat()
        Imgproc.adaptiveThreshold(blur, binary, 255.0, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV, 15, 8.0)

        val contours = mutableListOf<MatOfPoint>()
        Imgproc.findContours(binary, contours, Mat(), Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE)
        contours.sortByDescending { Imgproc.contourArea(it) }

        for (cnt in contours) {
            val peri = Imgproc.arcLength(MatOfPoint2f(*cnt.toArray()), true)
            val approx = MatOfPoint2f()
            Imgproc.approxPolyDP(MatOfPoint2f(*cnt.toArray()), approx, 0.02 * peri, true)
            if (approx.total() == 4L) {
                val points = approx.toArray().sortedWith(compareBy({ it.y }, { it.x }))
                val topPoints = points.take(2).sortedBy { it.x }
                val bottomPoints = points.drop(2).sortedBy { it.x }
                val srcPoints = MatOfPoint2f(topPoints[0], topPoints[1], bottomPoints[1], bottomPoints[0])

                val width = max((bottomPoints[1].x - bottomPoints[0].x), (topPoints[1].x - topPoints[0].x))
                val height = max((bottomPoints[0].y - topPoints[0].y), (bottomPoints[1].y - topPoints[1].y))

                val dstPoints = MatOfPoint2f(Point(0.0, 0.0), Point(width-1, 0.0), Point(width-1, height-1), Point(0.0, height-1))
                val transform = Imgproc.getPerspectiveTransform(srcPoints, dstPoints)
                val warped = Mat()
                Imgproc.warpPerspective(img, warped, transform, Size(width, height))
                return warped
            }
        }
        println("⚠️ 표 외곽 인식 실패 — 원본 사용")
        return img // 실패 시 원본 반환
    }

    private fun getTableCells(gray: Mat): Pair<List<Pair<Int, Int>>, List<Pair<Int, Int>>> {
        fun detectLines(binary: Mat): Pair<List<Int>?, List<Int>?> {
            val h = binary.height(); val w = binary.width()
            val horKernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(max(10, w / 30).toDouble(), 1.0))
            val verKernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(1.0, max(10, h / 30).toDouble()))

            val hor = Mat(); Imgproc.morphologyEx(binary, hor, Imgproc.MORPH_OPEN, horKernel)
            val ver = Mat(); Imgproc.morphologyEx(binary, ver, Imgproc.MORPH_OPEN, verKernel)

            val nonZeroHor = Mat(); Core.findNonZero(hor, nonZeroHor)
            val nonZeroVer = Mat(); Core.findNonZero(ver, nonZeroVer)
            if (nonZeroHor.empty() || nonZeroVer.empty()) return Pair(null, null)

            val ys = MatOfPoint(nonZeroHor).toList().map { it.y.toInt() }.distinct().sorted()
            val xs = MatOfPoint(nonZeroVer).toList().map { it.y.toInt() }.distinct().sorted()

            fun groupCoords(coords: List<Int>, tol: Int = 10): List<Int> {
                if (coords.isEmpty()) return emptyList()
                val groups = mutableListOf<MutableList<Int>>()
                var currentGroup = mutableListOf(coords[0])
                for (i in 1 until coords.size) {
                    if (abs(coords[i] - currentGroup.last()) <= tol) {
                        currentGroup.add(coords[i])
                    } else {
                        groups.add(currentGroup)
                        currentGroup = mutableListOf(coords[i])
                    }
                }
                groups.add(currentGroup)
                return groups.map { it.average().toInt() }
            }

            return Pair(groupCoords(ys), groupCoords(xs))
        }

        val bw = Mat()
        Imgproc.adaptiveThreshold(gray, bw, 255.0, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV, 15, 8.0)

        var (yLines, xLines) = detectLines(bw)

        // 극성 반전 재시도
        if (yLines == null || xLines == null || yLines.size < 3 || xLines.size < 3) {
            val bwInv = Mat(); Core.bitwise_not(bw, bwInv)
            val (y2, x2) = detectLines(bwInv)
            yLines = y2 ?: yLines
            xLines = x2 ?: xLines
        }
        if (yLines == null || xLines == null) return Pair(emptyList(), emptyList())


        val dataYs = yLines.drop(HEADER_SKIP_Y)
        val dataXs = xLines.drop(HEADER_SKIP_X)

        val rowRanges = dataYs.zipWithNext()
        val colRanges = dataXs.zipWithNext()

        return Pair(rowRanges, colRanges)
    }

    private fun tightCropAndResize(cellImg: Mat): Mat {
        val inv = Mat(); Imgproc.threshold(cellImg, inv, 200.0, 255.0, Imgproc.THRESH_BINARY_INV)
        val nonZero = Mat(); Core.findNonZero(inv, nonZero)
        if (nonZero.empty()) return cellImg

        val rect = Imgproc.boundingRect(nonZero)
        val cropped = Mat(cellImg, rect)
        val resized = Mat(); Imgproc.resize(cropped, resized, Size(32.0, 32.0))
        return resized
    }

    private fun classifyCell(cellImg: Mat): Triple<String, Float, Boolean> {
        val tightImg = tightCropAndResize(cellImg)
        val whiteRatio = Core.mean(tightImg).`val`[0] / 255.0
        if (whiteRatio > WHITE_THRESH) {
            return Triple("-", 1.0f, true) // (label, max_prob, is_blank)
        }

        val inputBuffer = ByteBuffer.allocateDirect(1 * 32 * 32 * 1 * 4).order(ByteOrder.nativeOrder())
        val floatMat = Mat(); tightImg.convertTo(floatMat, CvType.CV_32F, 1.0 / 255.0)
        val floatArray = FloatArray(32 * 32)
        floatMat.get(0, 0, floatArray)
        floatArray.forEach { inputBuffer.putFloat(it) }

        val outputArray = Array(1) { FloatArray(CLASS_LABELS.size) }
        interpreter.run(inputBuffer, outputArray)

        val probabilities = outputArray[0]
        val maxProb = probabilities.maxOrNull() ?: 0.0f
        val maxIndex = probabilities.indices.maxByOrNull { probabilities[it] } ?: -1

        if (maxProb < HIGH_CONF_THRESH) {
            return Triple("-", maxProb, true)
        }

        val label = if (maxIndex != -1) CLASS_LABELS[maxIndex] else "-"
        return Triple(label, maxProb, false)
    }
}