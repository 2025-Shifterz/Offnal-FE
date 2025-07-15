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

// function TabNavigator() {
//   return (
//     <BottomNavigationBar>
//       <Tab.Screen name="Home" component={MainScreen} />
//       <Tab.Screen name="Calendar" component={CalendarScreen} />
//       <Tab.Screen name="MyInfo" component={MyInfoScreen} />
//     </BottomNavigationBar>
//   );
// }

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
    }
  }, [scheme]);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    // <RegisterScheduleScreen/>
    
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShadowVisible: false,
    //       headerStyle: { backgroundColor: '#F4F5F6' },
    //       headerLeft: () => <CustomBackButton />,
    //       headerTitleAlign: 'center',
    //     }}
    //   >
    //     {/* 탭 네비게이션은 루트에서 보여줍니다 */}
    //     <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />

    //     {/* 스택으로 push 되는 화면들 */}
    //     <Stack.Screen
    //       name="ScheduleRegType"
    //       component={ScheduleRegType}
    //       options={{ headerTitle: () => <StepBar currentStep={0} totalSteps={4} /> }}
    //     />
    //     <Stack.Screen
    //       name="ScheduleInfoInput"
    //       component={ScheduleInfoInput}
    //       options={{ headerTitle: () => <StepBar currentStep={1} totalSteps={4} /> }}
    //     />
    //     <Stack.Screen
    //       name="CalendarType"
    //       component={CalendarType}
    //       options={{ headerTitle: () => <StepBar currentStep={2} totalSteps={4} /> }}
    //     />
    //     <Stack.Screen
    //       name="CompleteCreate"
    //       component={CompleteCreate}
    //       options={{ headerTitle: () => <StepBar currentStep={3} totalSteps={4} /> }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    </SafeAreaProvider>
  );
}
