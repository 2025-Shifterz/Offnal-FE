import { useNavigation } from '@react-navigation/native';
import { Button, ScrollView, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/types';
import CalendarViewer from '../../calenderType/components/calendar/personal/CalendarViewer';
import CalendarBase from '../../calenderType/components/calendar/team/TCalendarBase';
import TCalendarEditor from '../../calenderType/components/calendar/team/TCalendarEditor';
import TCalendarViewer from '../../calenderType/components/calendar/team/TCalendarViewer';
import TeamVersion from '../../../assets/icons/users-profiles-01.svg';
import { useState } from 'react';

const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [isTeamView, setIsTeamView] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface-white px-[16px]">
      <ScrollView>
        {isTeamView ? (
          <TCalendarViewer
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
              console.log('클릭됨');
            }}
          />
        ) : (
          <CalendarViewer
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
            }}
          />
        )}

        <View className="items-center justify-center bg-surface-white">
          <Button title="일정 등록 시작" onPress={() => navigation.navigate('ScheduleRegType')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
