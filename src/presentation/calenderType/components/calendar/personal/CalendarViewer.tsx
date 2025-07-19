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
