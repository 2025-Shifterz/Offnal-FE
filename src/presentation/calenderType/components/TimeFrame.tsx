// 주간, 오후, 야간, 휴일 - 박스들

import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ShiftType } from '../../../data/model/Calendar';

interface TimeFrameProps {
  text: ShiftType;
  onPress?: () => void;
}

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
} as const;

const mapShiftTypeToKey = (shift: ShiftType): keyof typeof stylesMap => {
  switch (shift) {
    case ShiftType.DAY:
      return '주간';
    case ShiftType.EVENING:
      return '오후';
    case ShiftType.NIGHT:
      return '야간';
    case ShiftType.OFF:
      return '휴일';
    default:
      return '휴일';
  }
};

const TimeFrame: React.FC<TimeFrameProps> = ({ text, onPress }: TimeFrameProps) => {
  const styleKey = mapShiftTypeToKey(text);
  const currentStyle = stylesMap[styleKey];

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
