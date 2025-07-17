import { useNavigation } from '@react-navigation/native';
import { Button, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calendarNavigation } from '../../../navigation/types';
import CalendarViewer from '../../calenderType/components/calendar/personal/CalendarViewer';
import TCalendarViewer from '../../calenderType/components/calendar/team/TCalendarViewer';
import { useState } from 'react';

const CalendarScreen = () => {
  const navigation = useNavigation<calendarNavigation>();
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
            onPressEditIcon={() => {
              navigation.navigate('EditCalendar');
            }}
          />
        ) : (
          <CalendarViewer
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
            }}
            onPressEditIcon={() => {
              navigation.navigate('EditCalendar');
            }}
          />
        )}

        <View className="items-center justify-center bg-surface-white">
          <Button
            title="일정 등록 시작"
            onPress={() => navigation.navigate('OnboardingSchedules')}
          />
          <Button title="로그인 시작" onPress={() => navigation.navigate('LoginScreens')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
