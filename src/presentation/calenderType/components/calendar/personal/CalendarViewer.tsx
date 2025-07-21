import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarBase from './../personal/CalendarBase';
import dayjs from 'dayjs';
import { workCalendarRepository } from '../../../../../di/Dependencies';
import { ShiftType } from '../../../../../data/model/Calendar';
import { workDaysToMap } from '../../../../common/utils/calendar/workDaysToMap';
import { calendarNavigation } from '../../../../../navigation/types';

interface CalendarViewerProps {
  onPressTeamIcon: () => void;
  onPressEditIcon: () => void;
}

const CalendarViewer = ({ onPressTeamIcon, onPressEditIcon }: CalendarViewerProps) => {
  const navigation = useNavigation<calendarNavigation>();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarData, setCalendarData] = useState<Map<string, ShiftType>>(new Map());
  const isFocused = useIsFocused(); // 화면 포커스 여부 확인

  const year = currentDate.year();
  const month = currentDate.month() + 1;

  // 근무표 조회 API (화면이 포커스될 때마다 다시 호출)
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
    if (isFocused) {
      fetchData();
    }
  }, [year, month, isFocused]); // isFocused를 dependency array에 추가

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
