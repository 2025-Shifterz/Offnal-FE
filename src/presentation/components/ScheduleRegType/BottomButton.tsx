import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BottomButton = () => {
  return (
    <View className="absolute bottom-[22px] w-full">
      <TouchableOpacity className="bg-[#1E2124] py-[13px] w-full flex items-center border rounded-[8px]">
        <Text className="color-[white] font-[17px]">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;
