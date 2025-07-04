import React from 'react';
import { Text, View } from 'react-native';
import CalendarBox from '../components/CalendarType/CalendarBox';
import BottomButton from '../components/ScheduleRegType/BottomButton';

const CalendarType = () => {
  return (
    <View className="w-full flex-1 pt-[14px]">
      {/* <View className="flex flex-col gap-[12px]">
        <Text className="text-heading-m font-semibold leading-[1.4] text-text-bolder">
          달력에 근무 형태를 입력해주세요.
        </Text>
        <Text className="text-label-xs text-text-subtle">
          각 날짜에 해당하는 근무 유형을 선택해주세요.
        </Text>
      </View> */}
      {/* ------------------ */}
      <View className="mt-[20px]">
        <CalendarBox />
      </View>
      {/* <BottomButton /> */}
    </View>
  );
};

export default CalendarType;
