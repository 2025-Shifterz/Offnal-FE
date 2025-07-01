import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SelectScheduleBox = () => {
  return (
    <TouchableOpacity className="flex h-[148px] w-[160px] items-center justify-center rounded-lg border border-border-primary bg-surface-primary-light-2 p-[5px]">
      <View className="flex w-[136px] items-center gap-[10px]">
        <Text className="text-heading-xxs font-semibold leading-[1.2] text-text-basic">
          전체 근무표 등록
        </Text>
        <Text className="text-center text-label-xxs leading-[1.2] text-text-subtle">
          여러 조의 스케줄이 담긴 {'\n'}근무표를 등록할 수 있어요
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectScheduleBox;
