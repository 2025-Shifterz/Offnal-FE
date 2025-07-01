import React from 'react';
import { Text, TextInput, View } from 'react-native';
import TeamItem from './TeamItem';

const TeamInput = () => {
  return (
    <View className="mt-[20px] flex gap-[9px]">
      <Text className="text-heading-xxxs font-semibold text-text-subtle">근무조 입력</Text>
      <View className="flex gap-4 rounded-lg bg-white px-[16px] py-[14px]">
        <View className="flex gap-[16px]">
          <View className="flex-row gap-[8px]">
            <TeamItem />
            <TeamItem />
            <TeamItem />
            <TeamItem />
            <TeamItem />
          </View>

          <View className="flex-row gap-[8px]">
            <TeamItem />
            <TeamItem />
            <TeamItem />
            <TeamItem />
            <TeamItem />
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          {/* 직접 입력 */}
          <View className="rounded-radius-max border border-border-primary bg-surface-primary-light-2 px-[14px] py-[8px]">
            <Text className="text-label-xs text-text-primary">직접 입력</Text>
          </View>
          {/* A조 ~~ */}
          <View className="flex gap-1 px-[14px] py-[8px]">
            <View className="flex-row items-center justify-between">
              <TextInput
                placeholder="A조"
                className="text-label-xs placeholder:text-text-disabled"
              />
              <Text className="text-label-xxs text-text-disabled">0/8</Text>
            </View>

            <View className="h-[0.5px] w-[185px] bg-border-gray-light" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TeamInput;
