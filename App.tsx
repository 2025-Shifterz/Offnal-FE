import './global.css';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';

import BottomNavigationBar, { Tab } from './src/presentation/main/components/BottomNavigationBar';

import { enableScreens } from 'react-native-screens';
import RegisterScheduleScreen from './src/presentation/onboarding/screen/RegisterScheduleScreen';
enableScreens();
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompleteCreate from './src/presentation/completeCreate/screen/CompleteCreate';
import CustomBackButton from './src/presentation/common/component/CustomBackButton';
import StepBar from './src/presentation/common/component/StepBar';
import TodoScreen from './src/presentation/note/screen/TodoScreen';
import MemoScreen from './src/presentation/note/screen/MemoScreen';
import MainScreen from './src/presentation/main/screen/MainScreen';
import CalendarScreen from './src/presentation/calendar/screen/CalendarScreen';
import MyInfoScreen from './src/presentation/myInfo/screen/MyInfoScreen';
import ScheduleRegType from './src/presentation/scheduleRegType/screen/ScheduleRegType';
import ScheduleInfoInput from './src/presentation/scheduleInpInput/screen/ScheduleInfoInput';
import CalendarType from './src/presentation/calenderType/screen/CalendarType';
import CalendarEditScreen from './src/presentation/calenderEdit/screen/CalendarEditScreen';

const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <BottomNavigationBar>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="MyInfo" component={MyInfoScreen} />
    </BottomNavigationBar>
  );
}

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
    }
  }, [scheme]);

  return (
    <SafeAreaProvider>
      {/* <AppNavigator /> */}
      {/* <RegisterScheduleScreen/> */}

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#F4F5F6' },
            headerLeft: () => <CustomBackButton />,
            headerTitleAlign: 'center',
          }}
        >
          {/* 탭 네비게이션은 루트에서 보여줍니다 */}
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />

          <Stack.Screen name="Todo" options={{ title: '할 일' }} component={TodoScreen} />
          <Stack.Screen name="Memo" options={{ title: '메모' }} component={MemoScreen} />
          <Stack.Screen name="EditCalendar" component={CalendarEditScreen} />

          {/* 스택으로 push 되는 화면들 */}
          <Stack.Screen
            name="ScheduleRegType"
            component={ScheduleRegType}
            options={{ headerTitle: () => <StepBar currentStep={0} totalSteps={4} /> }}
          />
          <Stack.Screen
            name="ScheduleInfoInput"
            component={ScheduleInfoInput}
            options={{ headerTitle: () => <StepBar currentStep={1} totalSteps={4} /> }}
          />
          <Stack.Screen
            name="CalendarType"
            component={CalendarType}
            options={{ headerTitle: () => <StepBar currentStep={2} totalSteps={4} /> }}
          />
          <Stack.Screen
            name="CompleteCreate"
            component={CompleteCreate}
            options={{ headerTitle: () => <StepBar currentStep={3} totalSteps={4} /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
