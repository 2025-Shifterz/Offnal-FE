package com.shifterz.model

import org.tensorflow.lite.DataType

/**
 * ### OCRModel
 *
 * OCR Model의 정보가 담겨 있는 데이터 클래스
 *
 * @property width Model의 입력 이미지 너비
 * @property height Model의 입력 이미지 높이
 * @property channel Model의 입력 이미지 채널
 * @property inputDataType Model의 입력 데이터 타입
 */
data class OCRModel(
    val width: Int = 32,
    val height: Int = 512,
    val channel: ModelChannel = ModelChannel.GRAY,
    val inputDataType: DataType = DataType.UINT8
)

/**
 * ### ModelChannel
 *
 * OCR Model의 채널 정보를 나타내는 Enum 클래스
 *
 * @param channels 채널 수
 *
 * @property GRAY 흑백 이미지
 * @property RGB RGB 이미지
 */
enum class ModelChannel(val channels: Int) {
    GRAY(1),
    RGB(3)
}