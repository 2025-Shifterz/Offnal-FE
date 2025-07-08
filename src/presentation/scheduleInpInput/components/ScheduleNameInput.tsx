import React from 'react';
import { Text, TextInput, View } from 'react-native';

const ScheduleNameInput = () => {
  return (
    <View className="mt-[20px] flex gap-[9px]">
      <Text className="text-heading-xxxs font-semibold text-text-subtle">근무표 이름</Text>
      <View className="flex-row justify-between rounded-lg bg-white px-[16px] py-[14px]">
        <TextInput
          placeholder="연세병원 근무표"
          className="text-label-xs placeholder:text-text-disabled"
        />
        <Text className="text-label-xxs">
          <Text className="text-text-primary">8</Text>
          <Text className="text-text-disabled">/10</Text>
        </Text>
      </View>
    </View>
  );
};

export default ScheduleNameInput;
