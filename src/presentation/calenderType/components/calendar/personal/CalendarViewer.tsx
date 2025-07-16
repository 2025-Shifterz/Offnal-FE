import React from 'react';
import CalendarBase from './../personal/CalendarBase';
import { View } from 'react-native';

// 예시 데이터
const calendarData = {
  '2025-07-01': '주간',
  '2025-07-02': '오후',
  '2025-07-05': '야간',
  '2025-07-06': '휴일',
  '2025-07-10': '주간',
} as const;

interface CalendarViewerProps {
  onPressTeamIcon: () => void;
}

const CalendarViewer = ({ onPressTeamIcon }: CalendarViewerProps) => {
  return (
    <View>
      <CalendarBase onPressTeamIcon={onPressTeamIcon} calendarData={calendarData} isViewer />
    </View>
  );
};

export default CalendarViewer;
