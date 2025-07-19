import React, { useEffect, useState } from 'react';
import CalendarBase from './../personal/CalendarBase';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { workDaysToMap } from '../../../../common/utils/calendar/workDaysToMap';
import { workCalendarRepository } from '../../../../../di/Dependencies';
import { ShiftType } from '../../../../../data/model/Calendar';

interface CalendarViewerProps {
  onPressTeamIcon?: () => void;
  onPressEditIcon?: () => void;
}

const convertRecordToMap = (record: Record<string, ShiftType>): Map<number, ShiftType> => {
  const entries: [number, ShiftType][] = Object.entries(record).map(([dateStr, shift]) => {
    // 날짜 문자열 'YYYY-MM-DD' → 숫자 20250718 변환
    const numericKey = Number(dateStr.replace(/-/g, ''));
    return [numericKey, shift];
  });
  return new Map(entries);
};

const CalendarViewer = ({ onPressTeamIcon, onPressEditIcon }: CalendarViewerProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarData, setCalendarData] = useState<Map<string, ShiftType>>(new Map());

  const year = currentDate.year();
  const month = currentDate.month() + 1;

  // 근무표 조회 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await workCalendarRepository.getWorkCalendar(year, month);
        const formatted = workDaysToMap(response, year, month);
        setCalendarData(formatted);
        console.log('근무표 조회 성공:', response);
      } catch (error) {
        console.log('근무표 조회 실패:', error);
      }
    };
    fetchData();
  }, [year, month]);

  console.log('calendarData instanceof Map', calendarData instanceof Map);

  return (
    <View>
      <CalendarBase
        currentDate={currentDate}
        onChangeMonth={setCurrentDate}
        calendarData={calendarData}
        onPressTeamIcon={onPressTeamIcon}
        onPressEditIcon={onPressEditIcon}
        isViewer
      />
    </View>
  );
};

export default CalendarViewer;
