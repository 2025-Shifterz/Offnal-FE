/* eslint-disable react-hooks/exhaustive-deps */
// 근무표 조회 & 저장 동시에 되는 캘린더
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarBase from '../../calenderType/components/calendar/personal/CalendarBase';
import dayjs from 'dayjs';
import { TimeFrameChildren } from '../../calenderType/components/TimeFrame';
import baseApi from '../../../remote/api/baseApi';
import { formatGetData } from '../../common/utils/calendar/formatGetData';

interface CalendarInteractiveProps {
  isEditScreen: boolean;
  currentDate: dayjs.Dayjs;
  setCurrentDate: (date: dayjs.Dayjs) => void;
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  calendarData: Record<string, TimeFrameChildren>;
  setCalendarData: (data: Record<string, TimeFrameChildren>) => void;
}

const rawData = {
  code: 'WORK_DAY_FETCHED',
  message: '근무일 조회에 성공했습니다.',
  data: [
    {
      day: '1',
      workTypeName: '오후',
    },
    {
      day: '2',
      workTypeName: '오후',
    },
    {
      day: '3',
      workTypeName: '야간',
    },
    {
      day: '4',
      workTypeName: '휴일',
    },
  ],
};

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

  useEffect(() => {
    const fetchData = async () => {
      //   const rawData = await baseApi.get(`/works/calendar?year=${year}&month=${month}`);
      const formatted = formatGetData(rawData.data, year, month);
      setCalendarData(formatted);
    };
    fetchData();
  }, [year, month]);

  return (
    <View>
      <CalendarBase
        currentDate={currentDate}
        onChangeMonth={setCurrentDate}
        selectedDate={selectedDate}
        onDatePress={setSelectedDate}
        calendarData={calendarData}
        isViewer={false}
        isEditScreen={isEditScreen}
      />
    </View>
  );
};

export default CalendarInteractive;
