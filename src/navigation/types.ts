import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type onboardingNavigation = NativeStackNavigationProp<OnboardingStackParamList>;
export type loginNavigation = NativeStackNavigationProp<LoginStackParamList>;
export type calendarNavigation = NativeStackNavigationProp<CalendarScreenStackParamList>;
export type mainNavigation = NativeStackNavigationProp<MainStackParamList>;
export type tabNavigation = NativeStackNavigationProp<TabParamList>;

// 로그인
export type LoginStackParamList = {
  Login: undefined;
  SelectRegMethod: undefined;
  KakaoWebView: undefined;
  PrivacyPolicy: undefined;
  ServiceTerm: undefined;
  OnboardingSchedules: undefined;
  OnboardingSchedulesWithOCR: undefined;
  Tabs: undefined;
};

// 온보딩 캘린더
export type OnboardingStackParamList = {
  ScheduleRegType: undefined;
  ScheduleInfoInput: { selectedBoxId: number } | undefined;
  CalendarType: {
    selectedBoxId: number;
    calendarName: string;
    workGroup: string;
    workTimes: {
      D: { startTime: string; endTime: string };
      E: { startTime: string; endTime: string };
      N: { startTime: string; endTime: string };
    };
  };
  SelectMonthWithOCR: {
    selectedBoxId: number;
    calendarName: string;
    workGroup: string;
    workTimes: {
      D: { startTime: string; endTime: string };
      E: { startTime: string; endTime: string };
      N: { startTime: string; endTime: string };
    };
  };
  SelectInputScheduleWithOCRType: {
    selectedBoxId: number;
    calendarName: string;
    workGroup: string;
    workTimes: {
      D: { startTime: string; endTime: string };
      E: { startTime: string; endTime: string };
      N: { startTime: string; endTime: string };
    };
    year: number;
    month: number;
    ocrResult?: any;
  };
  EditCompleteCreateScheduleOCR: {
    selectedBoxId: number;
    calendarName: string;
    workGroup: string;
    workTimes: {
      D: { startTime: string; endTime: string };
      E: { startTime: string; endTime: string };
      N: { startTime: string; endTime: string };
    };
    year: number;
    month: number;
    ocrResult?: any;
  };
  CompleteCreate: undefined;
  InfoEdit: undefined; // 온보딩은 아님
};

// 캘린더 탭의 스크린
export type CalendarScreenStackParamList = {
  CalendarScreen: { noCalendar?: boolean };
  EditCalendar: undefined;
  OnboardingSchedules: NavigatorScreenParams<OnboardingStackParamList> | undefined; // 삭제할거.
  OnboardingSchedulesWithOCR: undefined;
  LoginScreens: NavigatorScreenParams<LoginStackParamList> | undefined; // 로그인 스택네비게이터 내부의 스크린 접근 가능
  Tabs: undefined;
};

// 루트
export type RootStackParamList = {
  SplashScreen: undefined;
  Tabs: NavigatorScreenParams<TabParamList>;
  LoginScreens: undefined;
  OnboardingSchedules: undefined;
  OnboardingSchedulesWithOCR: undefined;
};

// Tabs 네비게이터
export type TabParamList = {
  Home: NavigatorScreenParams<MainStackParamList>;
  Calendar: NavigatorScreenParams<CalendarScreenStackParamList>;
  MyInfo: undefined;
};

// main 네비게이터 - "Home"
export type MainStackParamList = {
  MainScreen: undefined;
  AutoAlarm: undefined;
  Todo: undefined;
  Memo: undefined;
};
