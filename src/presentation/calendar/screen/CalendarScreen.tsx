import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="flex items-center justify-center">
        <Button title="일정 등록 시작" onPress={() => navigation.navigate('ScheduleRegType')} />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
