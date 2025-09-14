package com.shifterz.sheet

import android.graphics.BitmapFactory
import android.os.Build
import android.util.Base64
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class WorkSheetModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val workSheetParser = WorkSheetParser(reactContext)
    override fun getName(): String = "WorkSheetModule"


    @RequiresApi(Build.VERSION_CODES.FROYO)
    @ReactMethod
    fun parseFromBase64(base64Image: String, promise: Promise) {
        try {
            val decodedByte = Base64.decode(base64Image, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedByte, 0, decodedByte.size)

            promise.resolve(workSheetParser.parse(bitmap))
        } catch (e: Exception) {
            promise.reject("PARSE_ERROR", e)
        }
    }
}