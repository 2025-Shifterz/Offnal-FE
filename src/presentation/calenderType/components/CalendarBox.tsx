/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarDayColor from './CalendarDayColor';
import TimeFrame, { TimeFrameChildren } from './TimeFrame';
import DashedLine from '../../../assets/icons/dashLine.svg';
import TypeSelect from './TypeSelect';
import { configureCalendarLocale } from '../configs/calenderLocale';
import CustomMonthPicker from './CustomMonthPicker';

// 달력 한글로 설정하기
configureCalendarLocale();

interface DayTexts {
  [key: string]: string; // '키 : 값' 형태
}

// 초기 날짜별 근무 형태 데이터
const initialDayTexts: DayTexts = {
  // 키는 날짜 문자열 (YYYY-MM-DD)
  // 값는 근무 형태 (주간, 오후, 야간, 휴일 등)
  '2025-07-01': '주간',
  '2025-07-02': '야간',
  '2025-07-03': '휴일',
  '2025-07-07': '오후',
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
  const [selected, setSelected] = useState(''); // 선택된 각각의 날짜 day // '2025-07-10'
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 년월 Date 객체. // 기본값은 현재 날짜: "Thu Jul 10 2025 11:47:00 ~~"
  const [dayTexts, setDayTexts] = useState<DayTexts>(initialDayTexts); // 날짜별 근무 형태 데이터

  // 선택된 날짜에 근무 형태 입력 기능
  // --> 날짜를 선택했고 (selected) && TimeFrame를 누르면(onPress) => 객체에 저장하고 전체 객체를 보여준다.
  const handleTypeSelect = (type: '주간' | '오후' | '야간' | '휴일') => {
    if (!selected) return;

    setDayTexts(prev => {
      // 이미 그 날짜 칸에 있던 타입이면 클릭했을 때 삭제함.
      const current = prev[selected];
      if (current === type) {
        const newDayTexts = { ...prev };
        delete newDayTexts[selected];
        return newDayTexts;
      }
      return {
        ...prev,
        [selected]: type,
      };
    });
  };

  return (
    <View className="w-full">
      <CustomMonthPicker selectedDate={selectedDate} onChange={date => setSelectedDate(date)} />
      <Calendar
        hideArrows={true}
        key={formatDateToYYYYMMDD(selectedDate)} // 강제 리렌더링
        current={formatDateToYYYYMMDD(selectedDate)} // UTC 문제 해결
        hideExtraDays={true}
        dayComponent={({ date }) => {
          if (!date) return null;
          const extraText = dayTexts[date.dateString]; // 해당 날짜에 대한 근무 형태 텍스트 (예: 오후)

          return (
            <TouchableOpacity
              className="h-[50px] flex-col items-center gap-[3px]"
              onPress={() => {
                setSelected(date.dateString); // 선택된 날짜 문자열('2025-07-10')이 저장된다.
              }}
            >
              <CalendarDayColor date={date} selected={selected === date.dateString} />
              {extraText && <TimeFrame text={extraText as TimeFrameChildren} />}
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
            monthTextColor: '#1E2124',
            textMonthFontWeight: 600,
          } as any
        }
      />
      <View className="flex-row overflow-hidden bg-white pt-3">
        <DashedLine />
        <DashedLine />
      </View>
      {/* 근무 형태 입력 */}
      <TypeSelect onPress={handleTypeSelect} />
    </View>
  );
};

export default CalendarBox;
