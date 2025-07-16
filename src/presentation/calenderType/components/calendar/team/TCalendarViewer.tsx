import React from 'react';
import { View } from 'react-native';
import TCalendarBase from './TCalendarBase';

// 예시 데이터
const calendarData = {
  '2025-07-15': {
    '1조': '주간',
    '2조': '야간',
    '3조': '오후',
    '4조': '휴일',
  },
  '2025-07-16': {
    '1조': '오후',
    '2조': '오후',
    '3조': '주간',
  },
  '2025-07-17': {
    '2조': '야간',
    '4조': '주간',
  },
  '2025-07-18': {
    '1조': '주간',
  },
  '2025-07-19': {
    '3조': '휴일',
    '4조': '야간',
  },
} as const;

const TCalendarViewer = ({ onPressTeamIcon }) => {
  return (
    <View>
      <TCalendarBase onPressTeamIcon={onPressTeamIcon} calendarData={calendarData} isViewer />
    </View>
  );
};

export default TCalendarViewer;
