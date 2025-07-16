import React, { useState } from 'react';
import { View } from 'react-native';
import CalendarBase from './../personal/CalendarBase';
import TypeSelect from './TypeSelect';
import dayjs from 'dayjs';
import { TimeFrameChildren } from '../../TimeFrame';

const CalendarEditor = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [calendarData, setCalendarData] = useState<Record<string, TimeFrameChildren>>({});

  // 날짜 선택
  const handleDatePress = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  // 근무 형태 추가
  const handleTypeSelect = (type: TimeFrameChildren) => {
    if (!selectedDate) return;
    const key = selectedDate.format('YYYY-MM-DD');

    setCalendarData(prev => {
      // 이미 근무 형태가 있으면 또 클릭하면 삭제
      if (prev[key] === type) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return {
        ...prev,
        [key]: type, // 근무 형태 추가
      };
    });
  };

  return (
    <View>
      <CalendarBase
        selectedDate={selectedDate}
        onDatePress={handleDatePress}
        calendarData={calendarData}
        isViewer={false}
      />
      <TypeSelect onPress={handleTypeSelect} />
    </View>
  );
};

export default CalendarEditor;
