// 주간, 오후, 야간, 휴일

import { Text, View } from 'react-native';
import React from 'react';

interface TimeFrameProps {
  children: React.ReactNode;
}

const TimeFrame: React.FC<TimeFrameProps> = ({ children }) => {
  return (
    <View className="flex h-[23px] w-[30px] items-center justify-center bg-surface-success-subtle">
      <Text className="text-heading-xxxxs font-semibold text-text-success">{children}</Text>
    </View>
  );
};

export default TimeFrame;
