import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../presentation/calendar/screen/CalendarScreen';
import CalendarEditScreen from '../presentation/calenderEdit/screen/CalendarEditScreen';

// 탭2. 캘린더 탭에 사용되는 스택 네비게이터
const Stack = createNativeStackNavigator();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditCalendar" component={CalendarEditScreen} />
    </Stack.Navigator>
  );
};
export default CalendarNavigator;
