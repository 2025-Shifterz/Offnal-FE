/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarDayColor from './CalendarDayColor';
import MonthSelector from './MonthSelector';
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

// 날짜별 추가 텍스트를 위한 타입 정의
interface DayTexts {
  [key: string]: string; // '키 : 값' 형태
}

// 초기 날짜별 근무 형태 데이터
const initialDayTexts: DayTexts = {
  // 키 : 날짜 문자열 (YYYY-MM-DD)
  // 값 : 근무 형태 (주간, 오후, 야간, 휴일 등)
  '2025-07-01': '주간',
  '2025-07-02': '야간',
  '2025-07-03': '휴일',
  '2025-07-07': '오후', // 오늘 날짜 (2025년 7월 7일) 데이터 포함
  '2025-07-17': '휴일',
  '2025-07-20': '오후',
  '2025-07-21': '휴일',
  '2025-07-25': '오후',
};

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = '01'; // 항상 해당 달의 1일로
  return `${year}-${month}-${day}`;
};

const CalendarBox = () => {
  const [selected, setSelected] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayTexts, setDayTexts] = useState<DayTexts>(initialDayTexts); // 날짜별 근무 형태 데이터

  return (
    <View className="w-full">
      <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Calendar
        hideArrows={true}
        // monthFormat="yyyy년 MM월"
        key={formatDateToYYYYMMDD(selectedDate)} // 강제 리렌더링
        current={formatDateToYYYYMMDD(selectedDate)} // UTC 문제 해결
        // onDayPress, markedDate 불필요
        hideExtraDays={true}
        // eslint-disable-next-line react/no-unstable-nested-components
        dayComponent={({ date }) => {
          if (!date) return null;

          const extraText = dayTexts[date.dateString]; // 해당 날짜에 대한 근무 형태 텍스트 (예: 오후)

          return (
            <TouchableOpacity
              className="h-[50px] flex-col items-center gap-[3px]"
              onPress={() => {
                setSelected(date.dateString);
              }}
            >
              <CalendarDayColor date={date} selected={selected === date.dateString} />
              {extraText && <TimeFrame text={extraText as '주간' | '오후' | '야간' | '휴일'} />}
            </TouchableOpacity>
          );
        }}
        theme={
          {
            // 년도/ 월 헤더 숨기기: 헤더 마진/패딩 제거
            'stylesheet.calendar.header': {
              header: {
                height: 0,
                marginTop: 0,
                marginBottom: 0,
                padding: 0,
              },
            },
            // day title - 월, 화, 수 ..
            textDayHeaderFontSize: 11,
            textSectionTitleColor: '#B1B8BE',
            // month title
            textMonthFontSize: 0, // 숨기기
            monthTextColor: '#1E2124',
            textMonthFontWeight: 600,
            // arrow
            arrowColor: '#CDD1D5',
          } as any
        }
      />
      {/* ---- 근무 형태 수정 ----------- */}
      <View className="h-[0.5px] border-dashed bg-divider-gray-light" />

      <View className="flex-col gap-[9px] rounded-b-radius-m2 bg-surface-white p-[11px]">
        <Text className="text-body-xs font-medium text-text-subtle">근무 형태 입력</Text>
        <View className="flex-row gap-[6px]">
          <TimeFrame text="주간" />
          <TimeFrame text="오후" />
          <TimeFrame text="야간" />
          <TimeFrame text="휴일" />
        </View>
      </View>
    </View>
  );
};

export default CalendarBox;
