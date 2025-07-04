import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarDayColor from './CalendarDayColor';
import TimeFrame from './TimeFrame';
import MonthSelector from './MonthSelector';

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

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = '01'; // 항상 해당 달의 1일로
  return `${year}-${month}-${day}`;
};

const CalendarBox = () => {
  const [selected, setSelected] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View>
      <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Calendar
        monthFormat="yyyy년 MM월"
        key={formatDateToYYYYMMDD(selectedDate)} // 강제 리렌더링
        current={formatDateToYYYYMMDD(selectedDate)} // UTC 문제 해결
        // onDayPress, markedDate 불필요
        hideExtraDays={true}
        // eslint-disable-next-line react/no-unstable-nested-components
        dayComponent={({ date }) => {
          if (!date) return null;
          console.log('selected:', selected);
          console.log('dataString: ', date.dateString);

          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(date.dateString);
              }}
            >
              <CalendarDayColor date={date} selected={selected === date.dateString} />
            </TouchableOpacity>
          );
        }}
        theme={{
          // day title - 월, 화, 수 ..
          textDayHeaderFontSize: 11,
          textSectionTitleColor: '#B1B8BE',
          // days - dayComponent의 스타일로 대체됨

          // month title
          textMonthFontSize: 17,
          monthTextColor: '#1E2124',
          textMonthFontWeight: 600,

          // arrow
          arrowColor: '#CDD1D5',
        }}
      />
      {/* ---- 근무 형태 수정 ----------- */}
      {/* <View className="h-[0.5px] bg-divider-gray-light" />

      <View className="flex-col gap-[9px] bg-surface-white p-[11px]">
        <Text className="text-body-xs font-medium text-text-subtle">근무 형태 수정</Text>
        <View className="flex-row gap-[6px]">
          <TimeFrame>주간</TimeFrame>
          <TimeFrame>오후</TimeFrame>

          <TimeFrame>야간</TimeFrame>
          <TimeFrame>휴일</TimeFrame>
        </View>
      </View>
      */}
    </View>
  );
};

export default CalendarBox;
