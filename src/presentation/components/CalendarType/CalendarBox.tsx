import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import TimeFrame from './TimeFrame';

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

// 만약 실제로 점을 원한다면 dotColor를 사용하세요:
const myMarkedDatesWithDots = {
  '2025-07-10': { selected: true, disableTouchEvent: true, dotColor: 'blue' },
  '2025-07-15': { marked: true, selected: true, disableTouchEvent: false, dotColor: 'red' },
  '2025-07-20': { marked: true, dotColor: 'green' }, // 단순히 점만 표시하는 예시 (선택되지 않아도 됨)
};

const CalendarBox = () => {
  const [selected, setSelected] = useState('');

  return (
    <View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
            dotColor: 'orange',
          },
          '2025-07-09': { marked: true, dotColor: 'red' },
          '2025-07-10': { marked: true, dotColor: 'green' },
        }}
      />
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

export default CalendarBox;
