package com.shifterz.schedule

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import com.shifterz.util.Constants
import com.shifterz.util.loadModelFile
import org.json.JSONObject
import org.opencv.android.OpenCVLoader
import org.opencv.android.Utils
import org.opencv.core.Core
import org.opencv.core.CvType
import org.opencv.core.Mat
import org.opencv.core.Rect
import org.opencv.core.Size
import org.opencv.imgproc.Imgproc
import org.tensorflow.lite.Interpreter
import java.nio.ByteBuffer
import java.nio.ByteOrder

class ScheduleParser(context: Context) {
    private val interpreter: Interpreter

    init {
        OpenCVLoader.initLocal()
        interpreter = Interpreter(
            loadModelFile(
                context = context,
                modelName = "dne_classifier_with_metadata.tflite"
            )
        )
    }

    fun parse(imageBitmap: Bitmap): String {
        val imgMat = Mat()
        Utils.bitmapToMat(imageBitmap, imgMat)
        Imgproc.cvtColor(imgMat, imgMat, Imgproc.COLOR_RGBA2GRAY)

        val (dataRows, dataCols) = findTableCells(imgMat)
        if (dataRows.isEmpty() || dataCols.isEmpty()) return "{ \"error\": \"표를 찾지 못했습니다.\" }"

        val result = JSONObject()
        dataRows.forEachIndexed { r, (y1, y2) ->
            val rowDict = JSONObject()
            dataCols.forEachIndexed { c, (x1, x2) ->
                val cellRect = Rect(x1, y1, x2 - x1, y2 - y1)
                val cellImg = Mat(imgMat, cellRect)
                rowDict.put((c + 1).toString(), classifyCell(cellImg))
            }
            result.put((r + 1).toString(), rowDict)
        }
        return result.toString(2)
    }

    private fun findTableCells(img: Mat): Pair<List<Pair<Int, Int>>, List<Pair<Int, Int>>> {
        val binary = Mat()
        Imgproc.threshold(img, binary, 0.0, 255.0, Imgproc.THRESH_BINARY_INV + Imgproc.THRESH_OTSU)
        val hKernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(100.0, 1.0))
        val vKernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(1.0, 100.0))
        val hLines = Mat(); Imgproc.morphologyEx(binary, hLines, Imgproc.MORPH_OPEN, hKernel)
        val vLines = Mat(); Imgproc.morphologyEx(binary, vLines, Imgproc.MORPH_OPEN, vKernel)

        val xSeps = findSeparators(vLines, "x")
        val ySeps = findSeparators(hLines, "y")

        if (ySeps.size <= Constants.HEADER_SKIP_Y || xSeps.size <= Constants.HEADER_SKIP_X + 1) return Pair(emptyList(), emptyList())

        val dataRows = ySeps.subList(Constants.HEADER_SKIP_Y - 1, ySeps.size - 1).zip(ySeps.subList(
            Constants.HEADER_SKIP_Y, ySeps.size))
        val dataCols = xSeps.subList(Constants.HEADER_SKIP_X, xSeps.size - 1).zip(xSeps.subList(
            Constants.HEADER_SKIP_X + 1, xSeps.size))
        return Pair(dataRows, dataCols)
    }

    private fun findSeparators(mask: Mat, axis: String): List<Int> {
        val proj =
            Mat(); Core.reduce(mask, proj, if (axis == "x") 0 else 1, Core.REDUCE_SUM, CvType.CV_32S)
        val thresh = Core.minMaxLoc(proj).maxVal * 0.5
        val idx = (0 until if (axis == "x") proj.cols() else proj.rows()).filter {
            proj.get(if (axis == "x") 0 else it, if (axis == "x") it else 0)[0] > thresh
        }
        if (idx.isEmpty()) return emptyList()
        val groups = mutableListOf<MutableList<Int>>(); var currentGroup = mutableListOf(idx[0])
        (1 until idx.size).forEach { if (idx[it] > idx[it - 1] + 1) { groups.add(currentGroup); currentGroup = mutableListOf() }; currentGroup.add(idx[it]) }
        groups.add(currentGroup)
        return groups.map { it.sorted()[it.size / 2] }
    }

    private fun tightCropAndResize(cellImg: Mat): Mat {
        val inv = Mat(); Imgproc.threshold(cellImg, inv, 200.0, 255.0, Imgproc.THRESH_BINARY_INV)
        val nonZero = Mat(); Core.findNonZero(inv, nonZero)
        val cropped = if (nonZero.total() > 0) Mat(cellImg, Imgproc.boundingRect(nonZero)) else cellImg
        val resized = Mat(); Imgproc.resize(cropped, resized, Size(32.0, 32.0))
        return resized
    }

    private fun classifyCell(cellImg: Mat): String {
        val tightImg = tightCropAndResize(cellImg)
        if (Core.mean(tightImg).`val`[0] / 255.0 > Constants.WHITE_THRESH) return "-"

        val inputBuffer = ByteBuffer.allocateDirect(1 * 32 * 32 * 1 * 4).order(ByteOrder.nativeOrder())
        val floatMat = Mat(); tightImg.convertTo(floatMat, CvType.CV_32F, 1.0 / 255.0)
        val floatArray = FloatArray(32 * 32); floatMat.get(0, 0, floatArray)
        floatArray.forEach { inputBuffer.putFloat(it) }

        val outputArray = Array(1) { FloatArray(3) }
        interpreter.run(inputBuffer, outputArray)
        val maxIndex = outputArray[0].indices.maxByOrNull { outputArray[0][it] } ?: -1
        return if (maxIndex != -1) Constants.CLASS_LABELS[maxIndex] else "-"
    }
}