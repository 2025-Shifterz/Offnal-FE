import React from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import TimeFrame from '../components/CalendarType/TimeFrame';

LocaleConfig.locales.fr = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'fr';

const CalendarType = () => {
  // 나중에 mt-50px 삭제하기
  return (
    <View className="w-[328px] flex-1 border pt-[14px]">
      <View className="flex flex-col gap-[12px]">
        <Text className="text-heading-m font-semibold leading-[1.4] text-text-bolder">
          달력에 근무 형태를 입력해주세요.
        </Text>
        <Text className="text-label-xs text-text-subtle">
          각 날짜에 해당하는 근무 유형을 선택해주세요.
        </Text>
      </View>
      {/* ------------------ */}
      <View className="mt-[20px]">
        <Calendar />
      </View>

      {/* 근무 형태 수정 */}
      <View className="h-[0.5px] bg-divider-gray-light" />

      <View className="flex-col gap-[9px] bg-surface-white p-[11px]">
        <Text className="text-body-xs font-medium text-text-subtle">근무 형태 수정</Text>
        <View className="flex-row gap-[6px]">
          <TimeFrame>주간</TimeFrame>
          <TimeFrame>오후</TimeFrame>

          <TimeFrame>야간</TimeFrame>
          <TimeFrame>휴일</TimeFrame>
        </View>
      </View>
    </View>
  );
};

export default CalendarType;
