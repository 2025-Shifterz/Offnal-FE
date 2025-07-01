import React from 'react';
import { Text, TextInput, View } from 'react-native';

const sharedPlaceholderStyle =
  'rounded-radius-s border border-background-gray-subtle1 p-[8px] placeholder:text-label-xs placeholder:text-text-disabled';

const TimeTypeInput = () => {
  return (
    <View className="flex-row items-center gap-[13px]">
      <Text className="px-[7px] py-[5px] text-heading-xxxs text-text-subtle">주간</Text>
      <View className="flex-row items-center gap-[6px]">
        <TextInput className={sharedPlaceholderStyle} placeholder="오전 08:00" />
        <Text>-</Text>
        <TextInput className={sharedPlaceholderStyle} placeholder="오전 08:00" />
      </View>
    </View>
  );
};

export default TimeTypeInput;
