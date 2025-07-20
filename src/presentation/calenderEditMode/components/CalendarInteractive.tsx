/* eslint-disable react-hooks/exhaustive-deps */
// 근무표 조회 & 저장 동시에 되는 캘린더
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarBase from '../../calenderType/components/calendar/personal/CalendarBase';
import dayjs from 'dayjs';
import baseApi from '../../../remote/api/baseApi';
import { workCalendarRepository } from '../../../di/Dependencies';
import { ShiftType } from '../../../data/model/Calendar';

interface CalendarInteractiveProps {
  isEditScreen: boolean;
  currentDate: dayjs.Dayjs;
  setCurrentDate: (date: dayjs.Dayjs) => void;
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  calendarData: Map<number, ShiftType>;
  setCalendarData: (data: Map<number, ShiftType>) => void;
}

const CalendarInteractive = ({
  isEditScreen,
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  calendarData,
  setCalendarData,
}: CalendarInteractiveProps) => {
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  const convertRecordToMap = (record: Record<string, ShiftType>): Map<number, ShiftType> => {
    const entries: [number, ShiftType][] = Object.entries(record).map(([key, value]) => {
      const numericKey = Number(key.replace(/-/g, '')); // '2025-07-01' -> 20250701
      return [numericKey, value];
    });
    return new Map(entries);
  };

  return (
    <View>
      <CalendarBase
        currentDate={currentDate}
        onChangeMonth={setCurrentDate}
        selectedDate={selectedDate}
        onDatePress={setSelectedDate}
        // calendarData={calendarData}
        isViewer={false}
        isEditScreen={isEditScreen}
      />
    </View>
  );
};

export default CalendarInteractive;
