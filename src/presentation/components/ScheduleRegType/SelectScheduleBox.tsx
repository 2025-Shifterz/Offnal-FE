import React from 'react';
import { Image, Text, View } from 'react-native';

const SelectScheduleBox = () => {
  return (
    <View className="w-[160px] h-[148px] bg-[#ffffff] p-[5px] flex items-center justify-center border-[1px] border-solid rounded-[8px] border-[#2ECADC]">
      {/*<Image source={require('../images/two-people.svg')} className="size-9" />*/}
      <View className="w-[136px] flex gap-[10px] items-center">
        <Text className=" text-[15px] font-semibold">전체 근무표 등록</Text>
        <Text className="text-[11px] text-center">
          여러 조의 스케줄이 담긴 {'\n'} 근무표를 등록할 수 있어요
        </Text>
      </View>
    </View>
  );
};

export default SelectScheduleBox;
