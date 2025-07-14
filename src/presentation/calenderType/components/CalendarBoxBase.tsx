/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarDayColor from './CalendarDayColor';
import TimeFrame, { TimeFrameChildren } from './TimeFrame';
import DashedLine from '../../../assets/icons/dashLine.svg';
import TypeSelect from './TypeSelect';
import { configureCalendarLocale } from '../configs/calenderLocale';

// 달력 한글로 설정하기
configureCalendarLocale();

export interface DayTexts {
  [key: string]: string; // '키 : 값' 형태
}

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = '01'; // 항상 해당 달의 1일로
  return `${year}-${month}-${day}`;
};

interface CalendarBoxProps {
  selectedMonthYear: Date;
  setSelectedMonthYear: (d: Date) => void;
  selected: string;
  setSelected: (s: string) => void;
  dayTexts: DayTexts;
  setDayTexts: React.Dispatch<React.SetStateAction<DayTexts>>;
  isCalendarView?: boolean;
}

const CalendarBoxBase = ({
  selectedMonthYear,
  setSelectedMonthYear,
  selected,
  setSelected,
  dayTexts,
  setDayTexts,
  isCalendarView,
}: CalendarBoxProps) => {
  // 근무 형태 입력하는 기능
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

  // minDate와 maxDate 계산 - 한달 전과 한달 후까지만 이동 가능
  const baseDate = new Date(); // 오늘 날짜 기준
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();

  // baseDate 기준으로 계산된 고정 범위 _ 한달전, 한달후
  const minDate = new Date(baseYear, baseMonth - 1, 1).toISOString().split('T')[0];
  const maxDate = new Date(baseYear, baseMonth + 1, 31).toISOString().split('T')[0];

  // 월 이동 핸들러
  const handleArrowPress = (direction: 'left' | 'right', updateCalendar: () => void) => {
    let newMonthDate: Date;

    if (direction === 'left') {
      newMonthDate = new Date(selectedMonthYear.getFullYear(), selectedMonthYear.getMonth() - 1, 1);
    } else {
      newMonthDate = new Date(selectedMonthYear.getFullYear(), selectedMonthYear.getMonth() + 1, 1);
    }

    const newDateStr = newMonthDate.toISOString().split('T')[0];

    if (newDateStr >= minDate && newDateStr <= maxDate) {
      setSelectedMonthYear(newMonthDate);
      updateCalendar();
    } else {
      Alert.alert('알림', '더 이상 이전/다음 달로 이동할 수 없습니다.');
    }
  };

  return (
    <View className="w-full">
      {/* <CustomMonthPicker selectedDate={selectedDate} onChange={date => setSelectedDate(date)} /> */}

      <Calendar
        monthFormat="yyyy년 MM월"
        hideArrows={isCalendarView}
        key={formatDateToYYYYMMDD(selectedMonthYear)} // 강제 리렌더링
        current={formatDateToYYYYMMDD(selectedMonthYear)} // UTC 문제 해결
        hideExtraDays={true}
        minDate={minDate}
        maxDate={maxDate}
        onPressArrowLeft={subtractMonth => handleArrowPress('left', subtractMonth)}
        onPressArrowRight={addMonth => handleArrowPress('right', addMonth)}
        dayComponent={({ date }) => {
          if (!date) return null;
          const extraText = dayTexts[date.dateString]; // 해당 날짜에 대한 근무 형태 텍스트 (예: 오후)

          return (
            <TouchableOpacity
              className={`flex-col items-center gap-[3px] ${isCalendarView ? 'h-[90px]' : 'h-[50px]'}`}
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
            ...(isCalendarView && {
              'stylesheet.calendar.header': {
                header: {
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  padding: 0,
                },
              },
            }),

            // day title - 월, 화, 수 ..
            textDayHeaderFontSize: 11,
            textSectionTitleColor: '#B1B8BE',
            // month title
            monthTextColor: '#1E2124',
            textMonthFontWeight: 600,
            // 화살표 색상
            arrowColor: '#CDD1D5',
          } as any
        }
      />
      {!isCalendarView && (
        <>
          <View className="flex-row overflow-hidden bg-white pt-3">
            <DashedLine />
            <DashedLine />
          </View>
          <TypeSelect onPress={handleTypeSelect} />
        </>
      )}
    </View>
  );
};

export default CalendarBoxBase;
