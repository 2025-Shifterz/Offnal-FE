import React from 'react';
import { Text, View } from 'react-native';
import TimePicker from './TimePicker';

const TimeTypeInput = ({ children }: { children: string }) => {
  return (
    <View className="flex-row items-center gap-[13px]">
      <Text className="px-[7px] py-[5px] text-heading-xxxs font-semibold text-text-subtle">
        {children}
      </Text>
      <View className="flex-row items-center gap-[6px]">
        <TimePicker />
        <Text>-</Text>
        <TimePicker />
      </View>
    </View>
  );
};

export default TimeTypeInput;
