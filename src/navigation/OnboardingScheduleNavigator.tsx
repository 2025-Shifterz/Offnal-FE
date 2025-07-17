import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomBackButton from '../presentation/common/component/CustomBackButton';
import ScheduleRegType from '../presentation/scheduleRegType/screen/ScheduleRegType';
import ScheduleInfoInput from '../presentation/scheduleInpInput/screen/ScheduleInfoInput';
import CalendarType from '../presentation/calenderType/screen/CalendarType';
import CompleteCreate from '../presentation/completeCreate/screen/CompleteCreate';
import StepBar from '../presentation/common/component/StepBar';

const Stack = createNativeStackNavigator();

// + 온보딩 화면들
const OnBoardingScheduleNavigator = () => {
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
};

export default OnBoardingScheduleNavigator;
