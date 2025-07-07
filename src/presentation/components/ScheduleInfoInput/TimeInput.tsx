import React from 'react';
import { Text, TextInput, View } from 'react-native';
import TimeTypeInput from './TimeTypeInput';

const TimeInput = () => {
  return (
    <View className="flex gap-[9px]">
      <Text className="text-heading-xxxs font-semibold text-text-subtle">근무 시간 입력</Text>
      <View className="flex gap-[8px] rounded-lg bg-white px-[11px] py-[16.5px]">
        <TimeTypeInput>주간</TimeTypeInput>
        <TimeTypeInput>야간</TimeTypeInput>
        <TimeTypeInput>휴일</TimeTypeInput>
      </View>
    </View>
  );
};

export default TimeInput;
