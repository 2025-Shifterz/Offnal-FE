import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface NameInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const ScheduleNameInput = ({ value, onChangeText }: NameInputProps) => {
  return (
    <View className="mt-[20px] flex gap-[9px]">
      <Text className="text-heading-xxxs font-semibold text-text-subtle">근무표 이름</Text>
      <View className="h-[48px] flex-row justify-between rounded-lg bg-white px-[16px] py-[14px]">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="연세병원 근무표"
          maxLength={10}
          className="text-body-s placeholder:text-text-disabled"
        />
        <View className="justify-center">
          <Text className="flex justify-center text-label-xxs">
            <Text className="text-text-primary">{value.length}</Text>
            <Text className="text-text-disabled">/10</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ScheduleNameInput;
