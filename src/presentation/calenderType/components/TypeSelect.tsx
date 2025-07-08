import React from 'react';
import { Text, View } from 'react-native';
import TimeFrame from './TimeFrame';

const TypeSelect = () => {
  return (
    <View className="flex-col gap-[9px] rounded-b-radius-m2 bg-surface-white p-[11px]">
      <Text className="text-body-xs font-semibold text-text-subtle">근무 형태 입력</Text>
      <View className="flex-row gap-[6px]">
        <TimeFrame text="주간" />
        <TimeFrame text="오후" />
        <TimeFrame text="야간" />
        <TimeFrame text="휴일" />
      </View>
    </View>
  );
};

export default TypeSelect;
