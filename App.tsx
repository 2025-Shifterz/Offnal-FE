import './global.css';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';
import ScheduleInfoInput from './src/presentation/scheduleInpInput/screen/ScheduleInfoInput';
import ScheduleRegType from './src/presentation/scheduleRegType/screen/ScheduleRegType';
import CalendarType from './src/presentation/calenderType/screen/CalendarType';

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <View className="flex-1">
      {/* <ScheduleRegType /> */}
      {/* <ScheduleInfoInput /> */}
      <CalendarType />
    </View>
  );
}
