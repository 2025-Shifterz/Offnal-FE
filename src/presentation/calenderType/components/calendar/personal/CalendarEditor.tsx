import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import CalendarBase from './../personal/CalendarBase';
import TypeSelect from './TypeSelect';
import dayjs from 'dayjs';
import { TimeFrameChildren } from '../../TimeFrame';
import baseApi from '../../../../../remote/api/baseApi';

interface CalendarEditorProps {
  calendarName: string;
  workGroup: string;
  workTimes: {
    [key: string]: {
      startTime: string;
      endTime: string;
    };
  };
}

export interface CalendarEditorRef {
  postData: () => void;
}

const CalendarEditor: ForwardRefRenderFunction<CalendarEditorRef, CalendarEditorProps> = (
  { calendarName, workGroup, workTimes },
  ref
) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [calendarData, setCalendarData] = useState<Record<string, TimeFrameChildren>>({});
  const [currentDate, setCurrentDate] = useState(dayjs());

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

  // 부모에서 호출할 수 있게 내보낸다.
  useImperativeHandle(ref, () => ({
    postData: () => {
      const shifts: Record<string, string> = {};

      // TimeFrameChildren -> 문자열 코드로 변환.
      const convertToCode = (type: TimeFrameChildren): string => {
        switch (type) {
          case '주간':
            return 'D';
          case '오후':
            return 'E';
          case '야간':
            return 'N';
          case '휴일':
            return '-';
          default:
            return '';
        }
      };

      const calendarMap: Record<
        string,
        { year: string; month: string; shifts: Record<string, string> }
      > = {};

      Object.entries(calendarData).forEach(([dateStr, type]) => {
        const date = dayjs(dateStr);
        const year = String(date.year());
        const month = String(date.month() + 1); // 0-indexed → 1-indexed
        const day = String(date.date());

        const key = `${year}-${month}`;

        if (!calendarMap[key]) {
          calendarMap[key] = {
            year,
            month,
            shifts: {},
          };
        }

        calendarMap[key].shifts[day] = convertToCode(type);
      });
      const calendars = Object.values(calendarMap);

      const rawData = {
        calendarName,
        workGroup,
        workTimes,
        calendars,
      };

      console.log('rawData:', rawData);

      baseApi
        .post('/works/calendar', rawData)
        .then(res => {
          console.log('근무표 저장 성공:', res.data);
        })
        .catch(error => {
          console.log('근무표 저장 실패:', error);
        });
    },
  }));

  return (
    <View>
      <CalendarBase
        currentDate={currentDate}
        onChangeMonth={setCurrentDate}
        selectedDate={selectedDate}
        onDatePress={handleDatePress}
        calendarData={calendarData}
        isViewer={false}
      />
      <TypeSelect onPress={handleTypeSelect} />
    </View>
  );
};

export default forwardRef(CalendarEditor);
