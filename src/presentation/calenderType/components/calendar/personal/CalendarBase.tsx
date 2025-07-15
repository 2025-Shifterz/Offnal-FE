/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
// 캘린더 기본 UI
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TimeFrame, { TimeFrameChildren } from '../../TimeFrame';
import CalendarEditorHeader from '../header/CalendarEditorHeader';
import CalendarViewerHeader from '../header/CalendarViewerHeader';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const textInformation = '#096AB3';
const textDanger = '#BD2C0F';

interface CalendarBaseProps {
  selectedDate?: dayjs.Dayjs | null;
  onDatePress?: (date: dayjs.Dayjs) => void;
  calendarData: Record<string, TimeFrameChildren>;
  isViewer: boolean;
}

const CalendarBase = ({ selectedDate, onDatePress, calendarData, isViewer }: CalendarBaseProps) => {
  // 현재 날짜 (기본값은 오늘 날짜)
  const [currentDate, setCurrentDate] = useState(dayjs());
  console.log(currentDate);
  const startOfMonth = currentDate.startOf('month'); // 2025-07-01
  // const endOfMonth = currentDate.endOf('month'); // 2025-07-31
  const startDay = startOfMonth.day(); // 그 달의 1일의 요일 -> 달력에서 1일은 어느 칸에 둘지
  const daysInMonth = currentDate.daysInMonth(); // 그 달이 며칠까지 있는지 계산.

  const handlePrevMonth = () => {
    setCurrentDate(prev => prev.subtract(1, 'month'));
  };
  const handleNextMonth = () => {
    setCurrentDate(prev => prev.add(1, 'month'));
  };

  // 날짜 박스 렌더링 함수
  const renderDays = () => {
    const days = []; // 날짜 배열
    // 1일이 시작하기 전까지 '공백' 칸 채우기
    for (let i = 0; i < startDay; i++) {
      days.push(<View style={styles.dayBox} key={`empty-${i}`} />);
    }
    // 1일부처 마지막 날짜까지 반복해서 박스 생성
    for (let i = 1; i <= daysInMonth; i++) {
      const date = startOfMonth.date(i);
      const weekDay = date.day(); // 각 날짜 (i일)의 요일
      const isToday = dayjs().isSame(date, 'day'); // 오늘인지.
      const isSelected = selectedDate ? selectedDate.isSame(date, 'day') : false; // 선택된 날짜인지

      let textColor = '#000';
      if (weekDay === 0) textColor = textDanger;
      else if (weekDay === 6) textColor = textInformation;

      const time = calendarData?.[date.format('YYYY-MM-DD')];
      days.push(
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onDatePress && onDatePress(date)}
          style={styles.dayBox}
          key={`day-${i}`}
        >
          <View className="flex gap-[3px]">
            <View
              className={`h-[30px] w-[30px] items-center justify-center rounded-radius-max ${isToday ? 'bg-surface-gray-subtle1' : ''} ${isSelected ? 'bg-border-primary' : ''}`}
            >
              <Text
                className={`text-heading-xxxs text-text-danger`}
                style={[{ color: textColor }, isSelected && { color: 'white' }]}
              >
                {i}
              </Text>
            </View>
            <View className="h-[30px]">{time && <TimeFrame text={time} />}</View>
          </View>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View className="rounded-t-radius-m2 bg-surface-white">
      {/* 헤더 */}
      {isViewer ? (
        <CalendarViewerHeader
          selectedDate={currentDate.toDate()}
          onChange={newDate => setCurrentDate(dayjs(newDate))}
        />
      ) : (
        <CalendarEditorHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      )}

      {/* 일 월 화 수 .. */}
      <View className="mt-2 h-[30px] flex-row items-center justify-between">
        {daysOfWeek.map((day, index) => (
          <Text
            className="text-body-xxs text-text-disabled"
            key={index}
            style={[
              styles.weekDayText,
              index === 0 && { color: textDanger },
              index === 6 && { color: textInformation },
            ]}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* 1, 2, 3 ... */}
      <View className="flex-row flex-wrap pb-[10px]">{renderDays()}</View>
    </View>
  );
};

export default CalendarBase;

const styles = StyleSheet.create({
  dayBox: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginVertical: 9,
    width: `${100 / 7}%`,
  },
  weekDayText: {
    fontWeight: '600',
    textAlign: 'center',
    width: `${100 / 7}%`,
  },
});
