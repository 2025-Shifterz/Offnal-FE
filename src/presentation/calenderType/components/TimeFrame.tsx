// 주간, 오후, 야간, 휴일 - 박스들

import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export type TimeFrameChildren = '주간' | '오후' | '야간' | '휴일';

interface TimeFrameProps {
  text: TimeFrameChildren;
  onPress?: () => void;
}

const TimeFrame: React.FC<TimeFrameProps> = ({ text, onPress }: TimeFrameProps) => {
  // 근무 형태에 따라 배경색과 텍스트 색상을 결정하는 객체
  const stylesMap = {
    주간: {
      backgroundColor: 'bg-surface-secondary-subtle',
      textColor: 'text-text-success',
    },
    오후: {
      backgroundColor: 'bg-surface-success-subtle',
      textColor: 'text-text-subtle',
    },
    야간: {
      backgroundColor: 'bg-surface-information-subtle',
      textColor: 'text-text-information',
    },
    휴일: {
      backgroundColor: '',
      textColor: 'text-text-danger',
    },
  };

  const currentStyle = stylesMap[text];

  // onPress를 호출하는 것은, 위에서 받은 handleTypeSelect('주간')을 그대로 실행하는 것이다.
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex h-[23px] w-[30px] items-center justify-center ${currentStyle.backgroundColor}`}
    >
      <Text className={`text-heading-xxxxs font-semibold ${currentStyle.textColor}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TimeFrame;
