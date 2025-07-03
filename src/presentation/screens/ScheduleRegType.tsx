import React from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import SelectScheduleBox from '../components/ScheduleRegType/SelectScheduleBox';
import BottomButton from '../components/ScheduleRegType/BottomButton';

const ScheduleRegType = () => {
  // 나중에 mt-50px 삭제하기
  return (
    <View className="w-full flex-1 border pt-[14px]">
      <View className="flex flex-col gap-[12px]">
        <Text className="text-heading-m font-semibold leading-[1.4] text-text-bolder">
          근무표 등록 방식을 선택해주세요.
        </Text>

        <Text className="text-label-xs text-text-subtle">
          전체 근무표를 등록해 여러 조의 스케쥴을 확인하거나,{'\n'}내 근무조만 등록해 간편하게
          일상을 관리할 수 있어요.
        </Text>
      </View>
      <View className="mt-[26px] flex flex-row gap-3">
        <SelectScheduleBox />
        <SelectScheduleBox />
      </View>

      <BottomButton />
    </View>
  );
};

export default ScheduleRegType;
