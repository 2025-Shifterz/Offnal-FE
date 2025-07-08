import React, { useState } from 'react';
import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TimeInput from '../components/TimeInput';
import TeamInput from '../components/TeamInput';
import BottomButton from '../../common/component/BottomButton';
import ScheduleNameInput from '../components/ScheduleNameInput';
import TitleMessage from '../../common/component/TitleMessage';
import { useNavigation } from '@react-navigation/native';

const ScheduleInfoInput = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <TitleMessage title="근무표의 기본 정보를 입력해주세요." />

          <View className="flex gap-[26px]">
            <ScheduleNameInput />
            <TimeInput />
            <TeamInput />
          </View>

          <BottomButton
            text="다음"
            onPress={() => {
              navigation.navigate('CalendarType');
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ScheduleInfoInput;
