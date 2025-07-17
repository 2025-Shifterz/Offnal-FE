import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomBackButton from '../presentation/common/component/CustomBackButton';
import ScheduleRegType from '../presentation/schedule/screens/RegTypeByScheduleScreen';
import ScheduleInfoInput from '../presentation/schedule/screens/InputScheduleInfoScheduleScreen';

import CompleteCreateScheduleScreen from '../presentation/schedule/screens/CreateCompleteScheduleScreen';
import StepBar from '../presentation/common/component/StepBar';


import SelectMonthWithOCRScreen from '../presentation/schedule/screens/ocr/SelectMonthWithOCRScreen';
import SelectInputScheduleWithOCRTypeScreen from '../presentation/schedule/screens/ocr/SelectInputScheduleWithOCRTypeScreen';
import CompleteCreateScheduleOCRScreen from '../presentation/schedule/screens/ocr/CompleteScheduleOCRScreen';

const Stack = createNativeStackNavigator();

// + 온보딩 화면들
const OnBoardingScheduleWithOCRNavigator = () => {
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
        name="SelectMonthWithOCR"
        component={SelectMonthWithOCRScreen}
        options={{ headerTitle: () => <StepBar currentStep={2} totalSteps={6} /> }}
      />

      <Stack.Screen
        name="SelectInputScheduleWithOCRType"
        component={SelectInputScheduleWithOCRTypeScreen}
        options={{ headerTitle: () => <StepBar currentStep={3} totalSteps={6} /> }}
      />


      <Stack.Screen
        name="CompleteCreateScheduleOCR"
        component={CompleteCreateScheduleOCRScreen}
        options={{ headerTitle: () => <StepBar currentStep={3} totalSteps={6} /> }}
      />

      <Stack.Screen
        name="CompleteCreate"
        component={CompleteCreateScheduleScreen}
        options={{ headerTitle: () => <StepBar currentStep={5} totalSteps={6} /> }}
      />
    </Stack.Navigator>
  );
};

export default OnBoardingScheduleWithOCRNavigator;
