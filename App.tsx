import './global.css';
<<<<<<< HEAD
import React from 'react';
import { Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoPage from './src/presentation/screens/TodoPage';
import ScheduleRegType from './src/presentation/screens/ScheduleRegType';
=======
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colorScheme} from 'nativewind';
import {useColorScheme} from 'react-native';
>>>>>>> 4e12a19458ba79a732a16a999045bcefef441e40

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
<<<<<<< HEAD
        <ScheduleRegType />
=======
        <Text className="bg-lime-500 font-pretendard text-heading-xl text-success-80 dark:bg-slate-500 dark:text-dark-action-primary">
          Hello, Nativewind!
        </Text>
        <Text className="bg-black font-pretendard text-heading-xl text-warning-60">
          Welcome to Nativewind!
        </Text>
>>>>>>> 4e12a19458ba79a732a16a999045bcefef441e40
      </SafeAreaView>
    </View>
  );
}
