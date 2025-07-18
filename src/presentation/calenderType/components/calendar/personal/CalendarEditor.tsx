import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import CalendarBase from './../personal/CalendarBase';
import TypeSelect from './TypeSelect';
import dayjs from 'dayjs';
import baseApi from '../../../../../remote/api/baseApi';
import { ShiftType } from '../../../../../data/model/Calendar';
import { workCalendarRepository } from '../../../../../di/Dependencies';

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
  const [calendarData, setCalendarData] = useState<Map<string, ShiftType>>(new Map());
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 날짜 선택
  const handleDatePress = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  // 근무 형태 추가
  const handleTypeSelect = (type: ShiftType) => {
    if (!selectedDate) return;
    const key = selectedDate.format('YYYY-MM-DD');

    setCalendarData(prev => {
      // 이미 근무 형태가 있으면 또 클릭하면 삭제
      const updated = new Map(prev);
      if (updated.get(key) === type) {
        updated.delete(key);
        console.log(`Deleted shift for ${key}`);
      } else {
        updated.set(key, type);
        console.log(`Set shift ${type} for ${key}`);
      }
      console.log('Updated calendarData:', updated);
      console.log('Updated calendarData (Map):', updated);
      console.log('Updated calendarData entries:', Array.from(updated.entries()));
      console.log('CalendarEditor render calendarData:', Array.from(calendarData.entries()));

      return updated;
    });

    console.log('selectedDate:', selectedDate);
    console.log('calendarData:', calendarData);
  };

  // 부모에서 호출할 수 있게 내보낸다.
  useImperativeHandle(ref, () => ({
    postData: async () => {
      try {
        const calendarMap: Record<
          string,
          { year: number; month: number; shifts: Record<string, string> }
        > = {};

        const convertToCode = (type: ShiftType): string => {
          switch (type) {
            case ShiftType.DAY:
              return 'D';
            case ShiftType.EVENING:
              return 'E';
            case ShiftType.NIGHT:
              return 'N';
            case ShiftType.OFF:
              return '-';
            default:
              return '';
          }
        };

        Object.entries(calendarData).forEach(([dateStr, type]) => {
          const date = dayjs(dateStr);
          const year = date.year();
          const month = date.month() + 1;
          const day = date.date(); // 숫자 그대로

          const key = `${year}-${month}`;
          if (!calendarMap[key]) {
            calendarMap[key] = {
              year,
              month,
              shifts: {},
            };
          }

          calendarMap[key].shifts[String(day)] = convertToCode(type);
        });

        const convertFromCode = (code: string): ShiftType => {
          switch (code) {
            case 'D':
              return ShiftType.DAY;
            case 'E':
              return ShiftType.EVENING;
            case 'N':
              return ShiftType.NIGHT;
            case '-':
              return ShiftType.OFF;
            default:
              return ShiftType.UNKNOWN;
          }
        };

        for (const { year, month, shifts } of Object.values(calendarMap)) {
          const map = new Map<number, ShiftType>();

          Object.entries(shifts).forEach(([dayStr, code]) => {
            const day = Number(dayStr);
            const shiftType = convertFromCode(code);
            map.set(day, shiftType);
          });

          // ✅ 최종적으로 Map<number, ShiftType> 전달
          await workCalendarRepository.updateWorkCalendar(year, month, map);
        }

        console.log('근무표 저장 성공');
      } catch (error) {
        console.error('근무표 저장 실패:', error);
        throw error;
      }
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
