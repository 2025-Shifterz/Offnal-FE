import './global.css';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colorScheme} from 'nativewind';
import {useColorScheme} from 'react-native';

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('dark');
    }
  }, [scheme]);

  return (
    <View className="flex-1 items-center justify-center bg-white ">
      <SafeAreaView className="flex-1 items-center justify-center bg-white ">
        <Text className="dark:text-dark-action-primary text-success-80 dark:bg-slate-500 text-heading-xl font-pretendard">
          Hello, Nativewind!
        </Text>
        <Text className="text-warning-60 text-heading-xl font-pretendard">
          Welcome to Nativewind!
        </Text>
      </SafeAreaView>
    </View>
  );
}
