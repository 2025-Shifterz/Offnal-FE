import './global.css';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';
import ScheduleRegType from './src/presentation/screens/ScheduleRegType';
import ScheduleInfoInput from './src/presentation/screens/ScheduleInfoInput';
import CalendarType from './src/presentation/screens/CalendarType';

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <View className="flex-1 justify-center bg-background-gray-subtle1 px-[16px]">
      {/* bg-slate-300 삭제 예정 */}

      <SafeAreaView className="flex-1">
        {/* <ScheduleRegType /> */}
        <ScheduleInfoInput />
        {/* <CalendarType /> */}
      </SafeAreaView>
    </View>
  );
}
