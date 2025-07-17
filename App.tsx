import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import SelectInputScheduleWithOCRTypeScreen from './src/presentation/schedule/screens/ocr/SelectInputScheduleWithOCRTypeScreen';
import OnBoardingScheduleWithOCRNavigator from './src/navigation/OnbordingScheduleWithOCRNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App2 = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      < OnBoardingScheduleWithOCRNavigator/>

      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App2;
