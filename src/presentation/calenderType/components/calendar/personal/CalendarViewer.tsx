import React, { useEffect, useState } from 'react';
import CalendarBase from './../personal/CalendarBase';
import { View } from 'react-native';
import baseApi from '../../../../../remote/api/baseApi';
import dayjs from 'dayjs';

import { TimeFrameChildren } from '../../TimeFrame';
import { formatGetData } from '../../../../common/utils/calendar/formatGetData';

// 서버에서 반환된 예시 raw 데이터
const rawData2 = {
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

// formatted 된 예시 데이터
const mockCalendarData = {
  '2025-07-01': '주간',
  '2025-07-02': '오후',
  '2025-07-05': '야간',
  '2025-07-06': '휴일',
  '2025-07-10': '주간',
} as const;

interface CalendarViewerProps {
  onPressTeamIcon?: () => void;
  onPressEditIcon?: () => void;
}

const CalendarViewer = ({ onPressTeamIcon, onPressEditIcon }: CalendarViewerProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarData, setCalendarData] = useState<Record<string, TimeFrameChildren>>({});

  const year = currentDate.year();
  const month = currentDate.month() + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await baseApi.get(`/works/calendar?year=${year}&month=${month}`);
        const formatted = formatGetData(rawData2.data, year, month);
        setCalendarData(formatted);
        // console.log('근무표 조회 성공:', response);
      } catch (error) {
        console.log('근무표 조회 실패:', error);
      }
    };
    fetchData();
  }, [year, month]);

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
