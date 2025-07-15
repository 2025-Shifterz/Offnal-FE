import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/types';
import CalendarViewer from '../../calenderType/components/calendar/personal/CalendarViewer';
import CalendarBase from '../../calenderType/components/calendar/team/TCalendarBase';
import TCalendarEditor from '../../calenderType/components/calendar/team/TCalendarEditor';

const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-surface-white px-[16px]">
      <>
        <CalendarViewer />
        <View className="items-center justify-center bg-surface-white">
          <Button title="일정 등록 시작" onPress={() => navigation.navigate('ScheduleRegType')} />
        </View>
      </>
    </SafeAreaView>
  );
};

export default CalendarScreen;
