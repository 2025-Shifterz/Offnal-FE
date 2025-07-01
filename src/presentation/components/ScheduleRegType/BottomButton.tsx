import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BottomButton = () => {
  return (
    <View className="absolute bottom-[22px] w-full">
      <TouchableOpacity className="flex w-full items-center rounded-lg bg-surface-inverse py-[13px]">
        <Text className="text-body text-body-m text-text-bolder-inverse">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;
