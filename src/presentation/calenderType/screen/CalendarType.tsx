import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import BottomButton from '../../common/component/BottomButton';
import CalendarBox from '../components/CalendarBox';
import TitleMessage from '../../common/component/TitleMessage';

const CalendarType = () => {
  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1 pt-[14px]">
          <TitleMessage
            title="달력에 근무 형태를 입력해주세요."
            subTitle="각 날짜에 해당하는 근무 유형을 선택해주세요."
          />
          <View className="mt-[20px]">
            <CalendarBox />
          </View>
          <BottomButton />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CalendarType;
