package com.shifterz.ocr

/**
 * ### OCRResultListener
 *
 * OCR 추론 결과를 Shifterz React Native로 전달하기 위한 인터페이스 리스너
 *
 * @property onOCRResult OCR 추론 결과
 * @property onOCRError OCR 추론 오류
 */
interface OCRResultListener {
    fun onOCRResult(code: Int, data: String)

    fun onOCRError(code: Int, message: String)
}

