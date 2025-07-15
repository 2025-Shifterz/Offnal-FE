import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import BottomButton from '../../common/component/BottomButton';
import CalendarBox from '../components/CalendarBox';
import TitleMessage from '../../common/component/TitleMessage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/types';

const CalendarType = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [isDone, setIsDone] = useState(false); // 근무형태가 입력되었는지 여부

  // 입력이 하나라도 되어야 넘어가도록
  const handleNext = () => {
    if (!isDone) {
      Alert.alert('입력하세요', '근무 형태를 입력해주세요.');
      return;
    }
    navigation.navigate('CompleteCreate');
  };
  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <TitleMessage
            title="달력에 근무 형태를 입력해주세요."
            subTitle="각 날짜에 해당하는 근무 유형을 선택해주세요."
          />
          <View className="mt-[20px]">
            <CalendarBox setIsDone={setIsDone} />
          </View>
          <BottomButton text="다음" onPress={handleNext} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CalendarType;
