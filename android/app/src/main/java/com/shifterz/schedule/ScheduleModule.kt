package com.shifterz.schedule

import android.graphics.BitmapFactory
import android.util.Base64
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ScheduleModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val scheduleParser = ScheduleParser(reactContext)
    override fun getName() = "ScheduleModule"

    @ReactMethod
    fun parseFromBase64(base64Image: String, promise: Promise) {
        try {
            val decodedBytes = Base64.decode(base64Image, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
            promise.resolve(scheduleParser.parse(bitmap))
        } catch (e: Exception) {
            promise.reject("PARSE_ERROR", e)
        }
    }
}