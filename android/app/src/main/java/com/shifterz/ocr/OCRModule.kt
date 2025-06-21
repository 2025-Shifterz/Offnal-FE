package com.shifterz.ocr

import androidx.lifecycle.DefaultLifecycleObserver
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.shifterz.code.OCRErrorCode

class OCRModule(
    reactContext: ReactApplicationContext
): ReactContextBaseJavaModule(reactContext), OCRResultListener, DefaultLifecycleObserver {

    init {

    }

    override fun getName(): String {
        TODO("Not yet implemented")
    }

    override fun onOCRResult(code: Int, data: String) {
        TODO("Not yet implemented")
    }

    override fun onOCRError(error: OCRErrorCode) {
        TODO("Not yet implemented")
    }

}