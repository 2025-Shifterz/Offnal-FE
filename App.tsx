import './global.css';
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
    }
  }, [scheme]);

  return <AppNavigator />;
}
