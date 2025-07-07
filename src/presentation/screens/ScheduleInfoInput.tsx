import React from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomButton from '../components/ScheduleRegType/BottomButton';
import TimeInput from '../components/ScheduleInfoInput/TimeInput';
import TeamInput from '../components/ScheduleInfoInput/TeamInput';

const ScheduleInfoInput = () => {
  return (
    <View className="w-full flex-1 pt-[14px]">
      <Text className="text-heading-m font-semibold leading-[1.4] text-text-bolder">
        근무표의 기본 정보를 입력해주세요.
      </Text>

      {/* ------------------ */}

      <View className="flex gap-[26px]">
        {/* 근무표 이름 */}
        <View className="mt-[20px] flex gap-[9px]">
          <Text className="text-heading-xxxs font-semibold text-text-subtle">근무표 이름</Text>
          <View className="flex-row justify-between rounded-lg bg-white px-[16px] py-[14px]">
            <TextInput
              placeholder="연세병원 근무표"
              className="text-label-xs placeholder:text-text-disabled"
            />
            <Text className="text-label-xxs">
              <Text className="text-text-primary">8</Text>
              <Text className="text-text-disabled">/10</Text>
            </Text>
          </View>
        </View>

        {/* 근무 시간 입력 */}
        <TimeInput />

        {/* 근무조 입력 */}
        <TeamInput />
      </View>

      <BottomButton />
    </View>
  );
};

export default ScheduleInfoInput;
