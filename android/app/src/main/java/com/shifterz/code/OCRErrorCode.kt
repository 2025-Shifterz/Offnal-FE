package com.shifterz.code


enum class OCRErrorCode(code: Int, message: String) {
    FAIL_TO_INIT_OCR_MODEL(code = 4000, message = "OCR 모델 초기화 실패"),
    FAIL_TO_INIT_INTERPRETER(code = 4001, message = "인터프리터 초기화 실해"),
    FAIL_TO_START_CAMERA(code = 4002, message = "카메라 시작 실패"),
    FAIL_TO_PROCESSING(code = 4003, message = "이미지 처리 실패"),
    FAIL_TO_GET_RESULT(code = 4004, message = "결과 얻기 실패")
}