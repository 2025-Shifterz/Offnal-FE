import './global.css';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';

import { enableScreens } from 'react-native-screens';
import MyInfoScreen from './src/presentation/myInfo/screen/MyInfoScreen';
import PrivacyPolicesScreen from './src/presentation/myInfo/screen/PrivacyPolicesScreen';
import TermsOfUseScreen from './src/presentation/myInfo/screen/TermsOfUseScreen';
import UpdateMyInfoScreen from './src/presentation/myInfo/screen/UpdateMyInfoScreen';

enableScreens();


export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
    }
  }, [scheme]);

  return (
    <SafeAreaProvider>
      <MyInfoScreen/>
      {/* <TermsOfUseScreen/> */}
      {/* <PrivacyPolicesScreen/> */}
      {/* <UpdateMyInfoScreen/> */}
    </SafeAreaProvider>
  );
}
