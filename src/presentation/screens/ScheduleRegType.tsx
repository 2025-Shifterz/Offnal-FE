import React from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import SelectScheduleBox from '../components/ScheduleRegType/SelectScheduleBox';
import BottomButton from '../components/ScheduleRegType/BottomButton';

const ScheduleRegType = () => {
  // 나중에 mt-50px 삭제하기
  return (
    <View className="flex-1 bg-[#F4F5F6] mt-[50px] pt-[14px] w-[328px]">
      <View className="flex flex-col gap-[12px]">
        <View className="w-[180px]">
          <Text className="font-semibold text-[22px] leading-[1.4] color-[#131416]">
            근무표 등록 방식을 선택해주세요.
          </Text>
        </View>

        <View className="w-[307px]">
          <Text className="leading-[1.2] text-[#464C53]">
            전체 근무표를 등록해 여러 조의 스케쥴을 확인하거나, 내 근무조만 등록해 간편하게 일상을
            관리할 수 있어요.
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-[26px]">
        <SelectScheduleBox />
        <SelectScheduleBox />
      </View>

      <BottomButton />
    </View>
  );
};

export default ScheduleRegType;
