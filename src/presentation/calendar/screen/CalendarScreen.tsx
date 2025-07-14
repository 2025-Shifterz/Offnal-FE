import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarViewer from '../../calenderType/components/CalenderViewer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/types';

const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <SafeAreaView>
      <View className="flex items-center justify-center">
        <Button title="일정 등록 시작" onPress={() => navigation.navigate('ScheduleRegType')} />
      </View>
      <CalendarViewer />
    </SafeAreaView>
  );
};

export default CalendarScreen;
