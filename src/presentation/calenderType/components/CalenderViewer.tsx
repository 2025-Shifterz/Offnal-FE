import CustomMonthPicker from './CustomMonthPicker';

import CalendarBoxBase, { DayTexts } from './CalendarBoxBase';
import { useEffect, useState } from 'react';
import baseApi from '../../../remote/api/baseApi';
import { View } from 'react-native';

const Response = {
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

const CalendarViewer = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(new Date());
  const [selected, setSelected] = useState('');
  const [dayTexts, setDayTexts] = useState<DayTexts>({});

  const formatGETData = (responseData: (typeof Response)['data'], selectedMonthYear: Date) => {
    const year = selectedMonthYear.getFullYear();
    const month = String(selectedMonthYear.getMonth() + 1).padStart(2, '0');
    const result: DayTexts = {};
    responseData.forEach(({ day, workTypeName }) => {
      const dayStr = String(day).padStart(2, '0');

      const fullDate = `${year}-${month}-${dayStr}`;
      result[fullDate] = workTypeName;
    });
    console.log(result);
    return result;
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const year = selectedMonthYear.getFullYear();
        const month = selectedMonthYear.getMonth() + 1;
        const url = `/works/calendar?year=${year}&month=${month}`;
        console.log('요청 URL:', url);

        const res = await baseApi.get(`/works/calendar?year=${year}&month=${month}`);

        // 여기만 res.data로 바꾸면 됨
        setDayTexts(formatGETData(Response.data, selectedMonthYear));
        console.log('반환 값: ', res.data);

        console.log('근무표 정보 가져오기 성공');
      } catch (error) {
        console.error('근무표 정보 가져오기 실패', error);
      }
    };

    fetch();
  }, [selectedMonthYear]);

  return (
    <View className="flex-1 bg-surface-white">
      <CustomMonthPicker selectedDate={selectedMonthYear} onChange={setSelectedMonthYear} />
      <CalendarBoxBase
        selectedMonthYear={selectedMonthYear}
        setSelectedMonthYear={setSelectedMonthYear}
        selected={selected}
        setSelected={setSelected}
        dayTexts={dayTexts}
        setDayTexts={setDayTexts}
        isCalendarView
      />
    </View>
  );
};
export default CalendarViewer;
