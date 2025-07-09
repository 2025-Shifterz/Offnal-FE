import './global.css';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';
import ScheduleInfoInput from './src/presentation/scheduleInpInput/screen/ScheduleInfoInput';
import ScheduleRegType from './src/presentation/scheduleRegType/screen/ScheduleRegType';
import CalendarType from './src/presentation/calenderType/screen/CalendarType';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompleteCreate from './src/presentation/completeCreate/screen/CompleteCreate';
import CustomBackButton from './src/presentation/common/component/CustomBackButton';
import StepBar from './src/presentation/common/component/StepBar';

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#F4F5F6' },
          headerLeft: () => <CustomBackButton />,
          headerTitleAlign: 'center',
        }}
      >
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
  );
}
