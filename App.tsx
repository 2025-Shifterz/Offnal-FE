import './global.css';
import React, { useEffect } from 'react';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';
import MainScreen from './src/presentation/main/screen/MainScreen';
import CalendarScreen from './src/presentation/calendar/screen/CalendarScreen';
import MyInfoScreen from './src/presentation/myInfo/screen/MyInfoScreen';

import BottomNavigationBar, { Tab } from './src/presentation/main/components/BottomNavigationBar';

import { enableScreens } from 'react-native-screens';
import ImportImage from './src/presentation/onboarding/screen/RegisterWorkSheetWithOCR';
enableScreens();

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
    }
  }, [scheme]);

  return (
    <ImportImage/>
    // <BottomNavigationBar>
    //   <Tab.Screen name="Home" component={MainScreen} />
    //   <Tab.Screen name="Calendar" component={CalendarScreen} />
    //   <Tab.Screen name="MyInfo" component={MyInfoScreen} />
    // </BottomNavigationBar>
  );
}
