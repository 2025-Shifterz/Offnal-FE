import React from 'react';
import { View } from 'react-native';
import TCalendarBase from './TCalendarBase';

// 예시 데이터
const calendarData = {
  '2025-07-01': '주간',
  '2025-07-02': '오후',
  '2025-07-05': '야간',
  '2025-07-06': '휴일',
  '2025-07-10': '주간',
} as const;

const TCalendarViewer = () => {
  return (
    <View>
      <TCalendarBase calendarData={calendarData} isViewer />;
    </View>
  );
};

export default TCalendarViewer;
