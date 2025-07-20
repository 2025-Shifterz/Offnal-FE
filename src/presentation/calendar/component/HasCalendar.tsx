import { useNavigation } from '@react-navigation/native';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { calendarNavigation } from '../../../navigation/types';
import CalendarViewer from '../../calenderType/components/calendar/personal/CalendarViewer';
import TCalendarViewer from '../../calenderType/components/calendar/team/TCalendarViewer';
import { useState } from 'react';
import PlusIcon from '../../../assets/icons/w-plus.svg';
import BottomSheetWrapper from '../../common/component/BottomSheetWrapper';

interface HasCalendarProps {
  setShowPlus: (value: boolean) => void;
}

const HasCalendar = ({ setShowPlus }: HasCalendarProps) => {
  const navigation = useNavigation<calendarNavigation>();
  const [isTeamView, setIsTeamView] = useState(false);

  return (
    <View className="h-full flex-1 px-[16px]">
      <ScrollView className="h-full flex-1">
        {/* 팀 캘린더인지 */}
        {isTeamView ? (
          <TCalendarViewer
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
              console.log('클릭됨');
            }}
            onPressEditIcon={() => {
              navigation.navigate('OnboardingSchedules', { screen: 'InfoEdit' });
            }}
          />
        ) : (
          <CalendarViewer
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
            }}
            onPressEditIcon={() => {
              navigation.navigate('OnboardingSchedules', { screen: 'InfoEdit' });
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
      {/* { + } 버튼 동작 화면 */}
      <TouchableOpacity
        onPress={() => {
          setShowPlus(true);
        }}
        className="absolute bottom-[13px] right-[13px] h-[40px] w-[40px] items-center justify-center rounded-radius-max bg-surface-inverse"
      >
        <PlusIcon />
      </TouchableOpacity>
      <Text>여기에 바텀시트</Text>
      <BottomSheetWrapper>
        <View>
          <Text>fff</Text>
        </View>
      </BottomSheetWrapper>
    </View>
  );
};

export default HasCalendar;
