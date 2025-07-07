// 주간, 오후, 야간, 휴일

import { Text, View } from 'react-native';
import React from 'react';

interface TimeFrameProps {
  children: React.ReactNode;
}

const TimeFrame: React.FC<TimeFrameProps> = ({ children }) => {
  const isNight = children === '야간';
  const isAfternoon = children === '오후';
  const isDay = children === '주간';
  const isHoliday = children === '휴일';

  const getBackgroundColor = () => {
    if (isNight) return 'bg-surface-information-subtle'; // 야간
    if (isAfternoon) return 'bg-surface-success-subtle'; // 오후
    if (isDay) return 'bg-surface-secondary-subtle'; // 주간
    if (isHoliday) return ''; // 휴일
    return '';
  };
  const getTextColor = () => {
    if (isNight) return 'text-text-information'; // 야간
    if (isAfternoon) return 'text-text-subtle'; // 오후
    if (isDay) return 'text-text-success'; // 주간
    if (isHoliday) return 'text-text-danger'; // 휴일
    return '';
  };
  return (
    <View className={`flex h-[23px] w-[30px] items-center justify-center ${getBackgroundColor()}`}>
      <Text className={`text-heading-xxxxs font-semibold ${getTextColor()}`}>{children}</Text>
    </View>
  );
};

export default TimeFrame;
