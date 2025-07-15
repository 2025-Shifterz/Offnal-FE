import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import TimeInput from '../components/TimeInput';
import TeamInput from '../components/TeamInput';
import BottomButton from '../../common/component/BottomButton';
import ScheduleNameInput from '../components/ScheduleNameInput';
import TitleMessage from '../../common/component/TitleMessage';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ScheduleInfoInput = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  // 필수 입력 값을 작성해야 넘어가도록
  const [name, setName] = useState(''); // 근무표 이름
  const [teamName, setTeamName] = useState(''); // 직접 입력 시 팀 이름
  const [isDirect, setIsDirect] = useState(false); // 직접 입력인지 여부

  const handleNext = () => {
    const isTeamValid = isDirect ? teamName.trim().length > 0 : true;

    if (!name || !isTeamValid) {
      Alert.alert('입력하세요', '모든 항목을 입력해주세요.');
      return;
    }
    navigation.navigate('CalendarType');
  };

  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <TitleMessage title="근무표의 기본 정보를 입력해주세요." />

          <View className="flex gap-[26px]">
            <ScheduleNameInput value={name} onChangeText={setName} />
            <TimeInput />
            <TeamInput
              value={teamName}
              onChangeName={setTeamName}
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
