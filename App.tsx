import './global.css';
import React, { useEffect } from 'react';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';
import MainScreen from './src/presentation/main/screen/MainScreen';

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <MainScreen/>
  )
}
