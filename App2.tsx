import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CalendarEditScreen from './src/presentation/calenderEdit/screen/CalendarEditScreen';
import MainScreen from './src/presentation/main/screen/MainScreen';
import MyInfoScreen from './src/presentation/myInfo/screen/MyInfoScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalendarScreen from './src/presentation/calendar/screen/CalendarScreen';
import TodoScreen from './src/presentation/note/screen/TodoScreen';
import MemoScreen from './src/presentation/note/screen/MemoScreen';
import ScheduleRegType from './src/presentation/scheduleRegType/screen/ScheduleRegType';
import ScheduleInfoInput from './src/presentation/scheduleInpInput/screen/ScheduleInfoInput';
import CalendarType from './src/presentation/calenderType/screen/CalendarType';
import CompleteCreate from './src/presentation/completeCreate/screen/CompleteCreate';
import StepBar from './src/presentation/common/component/StepBar';
import BottomNavigationBar from './src/presentation/main/components/BottomNavigationBar';
import CustomBackButton from './src/presentation/common/component/CustomBackButton';
import UpdateMyInfoScreen from './src/presentation/myInfo/screen/UpdateMyInfoScreen';
import Login from './src/presentation/login/screen/Login';
import KakaoLoginWebView from './src/presentation/login/screen/KakaoLoginWebView';
import PrivacyPolicy from './src/presentation/policy/screen/PrivacyPolicy';
import ServiceTerm from './src/presentation/policy/screen/ServiceTerm';
import ScheduleRegRegisterMethod from './src/presentation/selectRegMethod/screen/SelectRegMethod';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabsNavigator() {
  return (
    <BottomNavigationBar>
      <Tab.Screen name="Home" component={MainNavigator} />
      <Tab.Screen name="Calendar" component={CalendarNavigator} />
      <Tab.Screen name="MyInfo" component={MyInfoNavigator} />
    </BottomNavigationBar>
  );
}

// 탭1. 메인 탭에 사용되는 스택 네비게이터
function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#F4F5F6' },
        headerLeft: () => <CustomBackButton />,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Todo" options={{ title: '할 일' }} component={TodoScreen} />
      <Stack.Screen name="Memo" options={{ title: '메모' }} component={MemoScreen} />
    </Stack.Navigator>
  );
}

// 탭2. 캘린더 탭에 사용되는 스택 네비게이터
function CalendarNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditCalendar" component={CalendarEditScreen} />
    </Stack.Navigator>
  );
}

// 탭3. 내정보 탭에 사용되는 스택 네비게이터
function MyInfoNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyInfoScreen" component={MyInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="UpdateMyInfoScreen"
        component={UpdateMyInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// + 로그인 화면들
function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SelectRegMethod" component={ScheduleRegRegisterMethod} />
      <Stack.Screen name="KakaoWebView" component={KakaoLoginWebView} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ServiceTerm" component={ServiceTerm} />
    </Stack.Navigator>
  );
}

// + 온보딩 화면들
function OnBoardingScheduleNavigator() {
  return (
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
  );
}

const App2 = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Tabs" component={TabsNavigator} />
          <RootStack.Screen name="OnboardingSchedules" component={OnBoardingScheduleNavigator} />
          <RootStack.Screen name="LoginScreens" component={LoginNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App2;
