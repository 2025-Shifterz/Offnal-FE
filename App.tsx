import './global.css';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';

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
        <Text className="bg-lime-500 font-pretendard text-heading-xl text-success-80 dark:bg-slate-500 dark:text-dark-action-primary">
          Hello, Nativewind!
        </Text>
        <Text className="bg-black font-pretendard text-heading-xl text-warning-60">
          Welcome to Nativewind!
        </Text>
      </SafeAreaView>
    </View>
  );
}
