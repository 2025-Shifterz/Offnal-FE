import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import BottomButton from '../../common/component/BottomButton';
import TitleMessage from '../../common/component/TitleMessage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/types';
import CalendarEditor from '../components/calendar/personal/CalendarEditor';
import TCalendarEditor from '../components/calendar/team/TCalendarEditor';

const CalendarType = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <ScrollView className="mb-[100px] w-full flex-1">
          <TitleMessage
            title="달력에 근무 형태를 입력해주세요."
            subTitle="각 날짜에 해당하는 근무 유형을 선택해주세요."
          />
          <View className="mt-[20px]">
            <TCalendarEditor />
          </View>
        </ScrollView>
        <View>
          <BottomButton text="다음" onPress={() => navigation.navigate('CompleteCreate')} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CalendarType;
