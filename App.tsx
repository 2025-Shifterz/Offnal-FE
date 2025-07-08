import './global.css';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';

// 임시 화면 확인을 위한 코드
import LoginScreen from './src/presentation/screens/LoginScreen';
import OnboardingScreen from './src/presentation/screens/OnboardingScreen';

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <LoginScreen />
      {/* <OnboardingScreen /> */}
    </SafeAreaView>
  );
}
