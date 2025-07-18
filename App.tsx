import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectMonthWithOCRScreen from './src/presentation/schedule/screens/ocr/SelectMonthWithOCRScreen';
import AppNavigator from './src/navigation/AppNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import OnBoardingScheduleWithOCRNavigator from './src/navigation/OnbordingScheduleWithOCRNavigator';
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createNativeStackNavigator();

const App2 = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App2;
