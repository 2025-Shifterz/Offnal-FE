// 주간, 오후, 야간, 휴일 - 박스들

import { Text, View } from 'react-native';
import React from 'react';

export type TimeFrameChildren = '주간' | '오후' | '야간' | '휴일';

// 근무 형태를 나타내는 TimeFrame 컴포넌트의 props 타입을 정의합니다.
interface TimeFrameProps {
  text: TimeFrameChildren; // children으로 올 수 있는 값들을 명시적으로 제한
}

const TimeFrame: React.FC<TimeFrameProps> = ({ text }: TimeFrameProps) => {
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
      backgroundColor: '', // 휴일은 배경색 없음
      textColor: 'text-text-danger',
    },
  };

  const currentStyle = stylesMap[text];

  return (
    <View
      className={`flex h-[23px] w-[30px] items-center justify-center ${currentStyle.backgroundColor}`}
    >
      <Text className={`text-heading-xxxxs font-semibold ${currentStyle.textColor}`}>{text}</Text>
    </View>
  );
};

export default TimeFrame;
