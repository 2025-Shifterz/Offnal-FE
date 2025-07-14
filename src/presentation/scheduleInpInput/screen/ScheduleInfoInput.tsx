import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import TimeInput from '../components/TimeInput';
import TeamInput from '../components/TeamInput';
import BottomButton from '../../common/component/BottomButton';
import ScheduleNameInput from '../components/ScheduleNameInput';
import TitleMessage from '../../common/component/TitleMessage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WorkTimeContext } from '../../../context/WorkTimeContext';

type ScheduleInfoInputRouteProp = RouteProp<StackParamList, 'ScheduleInfoInput'>;

const ScheduleInfoInput = () => {
  const route = useRoute<ScheduleInfoInputRouteProp>();
  const { selectedBoxId } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  // 필수 입력 값을 작성해야 넘어가도록
  const [calendarName, setCalendarName] = useState(''); // 근무표 이름
  const [workGroup, setWorkGroup] = useState(''); // 직접 입력 시 팀 이름
  const [workTimes, setWorkTimes] = useState({
    D: { startTime: '08:00', endTime: '16:00' },
    E: { startTime: '16:00', endTime: '00:00' },
    N: { startTime: '00:00', endTime: '08:00' },
  }); // 직접 입력 시 팀 이름

  const [isDirect, setIsDirect] = useState(false); // 직접 입력인지 여부

  const handleNext = () => {
    navigation.navigate('CalendarType', {
      calendarName,
      workGroup,
      workTimes,
    });
  };

  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <TitleMessage title="근무표의 기본 정보를 입력해주세요." />

          <View className="flex gap-[26px]">
            <ScheduleNameInput value={calendarName} onChangeText={setCalendarName} />
            <WorkTimeContext.Provider value={{ workTimes, setWorkTimes }}>
              <TimeInput />
            </WorkTimeContext.Provider>
            <TeamInput
              workGroup={workGroup}
              setWorkGroup={setWorkGroup}
              isDirect={isDirect}
              setIsDirect={setIsDirect}
            />
          </View>

          <BottomButton text="다음" onPress={handleNext} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ScheduleInfoInput;
