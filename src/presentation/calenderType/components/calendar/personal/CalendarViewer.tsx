import React, { useEffect, useState } from 'react';
import CalendarBase from './../personal/CalendarBase';
import { Text, View } from 'react-native';
import dayjs from 'dayjs';

import { workDaysToMap } from '../../../../common/utils/calendar/workDaysToMap';
import { workCalendarRepository } from '../../../../../di/Dependencies';
import { ShiftType } from '../../../../../data/model/Calendar';

interface CalendarViewerProps {
  onPressTeamIcon?: () => void;
  onPressEditIcon?: () => void;
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (date: dayjs.Dayjs | null) => void;
  onDateSelected?: (date: dayjs.Dayjs) => void; // ✅ 콜백 추가
}

const CalendarViewer = ({
  onPressTeamIcon,
  onPressEditIcon,
  selectedDate,
  setSelectedDate,
  onDateSelected,
}: CalendarViewerProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarData, setCalendarData] = useState<Map<string, ShiftType>>(new Map());

  // const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const year = currentDate.year();
  const month = currentDate.month() + 1;

  // 근무표 조회 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await workCalendarRepository.getWorkCalendar(year, month);
        const mapData = workDaysToMap(response, year, month);
        setCalendarData(mapData);
        console.log('근무표 조회 성공:', response);
      } catch (error) {
        console.log('근무표 조회 실패:', error);
      }
    };
    fetchData();
  }, [year, month]);

  console.log('calendarData instanceof Map', calendarData instanceof Map);

  // ----------

  // 날짜 선택
  const handleDatePress = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    console.log('selectedDate:', selectedDate);
    onDateSelected?.(date); // ✅ 날짜 선택 시 콜백 실행
  };

  return (
    <View>
      <CalendarBase
        selectedDate={selectedDate}
        onDatePress={handleDatePress}
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
