import { forwardRef, useImperativeHandle, useState } from 'react';
import CalendarBoxBase, { DayTexts } from './CalendarBoxBase';
import baseApi from '../../../remote/api/baseApi';

const workTypeToShiftCode: Record<'주간' | '오후' | '야간' | '휴일', 'D' | 'E' | 'N' | '-'> = {
  주간: 'D',
  오후: 'E',
  야간: 'N',
  휴일: '-',
};

export interface CalendarEditorRef {
  postData: () => Promise<void>;
}

interface CalendarEditorProps {
  calendarName: string;
  workGroup: string;
  workTimes: {
    D: { startTime: string; endTime: string };
    E: { startTime: string; endTime: string };
    N: { startTime: string; endTime: string };
  };
}

// forwardRef : 부모로부터 받은 ref를 자식 함수형 컴포넌트에서 사용할 수 있게 한다.
const CalendarEditor = forwardRef<CalendarEditorRef, CalendarEditorProps>(
  ({ calendarName, workGroup, workTimes }, ref) => {
    const [selectedMonthYear, setSelectedMonthYear] = useState(new Date());
    const [selected, setSelected] = useState('');
    const [dayTexts, setDayTexts] = useState<DayTexts>({});

    const formatShiftData = (dayTexts: DayTexts) => {
      const shifts: Record<string, string> = {};

      Object.entries(dayTexts).forEach(([dateStr, workType]) => {
        const day = String(Number(dateStr.split('-')[2]));
        const code = workTypeToShiftCode[workType as keyof typeof workTypeToShiftCode];
        shifts[day] = code;
      });

      return shifts;
    };

    const postData = async () => {
      try {
        const year = selectedMonthYear.getFullYear().toString();
        const month = (selectedMonthYear.getMonth() + 1).toString();

        const RequestData = {
          calendarName,
          year,
          month,
          workGroup,
          workTimes,
          shifts: formatShiftData(dayTexts),
        };
        console.log('RequestData', RequestData);

        const res = await baseApi.post('/works/calendar', RequestData);
        console.log('반환 값: ', res);

        console.log('근무표 정보 저장하기 성공');
      } catch (error) {
        console.error('근무표 정보 저장하기 실패', error);
        throw error;
      }
    };

    // 부모 컴포넌트가 자식 컴포넌트의 어떤 내부 함수나 값을 직접 사용할 수 있게 할지 지정
    // 부모가 ref.currunt.postData()로 접근 가능하게 함
    useImperativeHandle(ref, () => ({
      postData,
    }));

    return (
      <CalendarBoxBase
        selectedMonthYear={selectedMonthYear}
        setSelectedMonthYear={setSelectedMonthYear}
        selected={selected}
        setSelected={setSelected}
        dayTexts={dayTexts}
        setDayTexts={setDayTexts}
      />
    );
  }
);
export default CalendarEditor;
