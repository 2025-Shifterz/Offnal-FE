import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import TeamItem from './TeamItem';

const TeamInput = () => {
  const [teamName, setTeamName] = useState('');
  const [selectedBoxId, setSelectedBoxId] = useState(0);

  const handleId = (id: number) => {
    setSelectedBoxId(id);
  };

  return (
    <View className="flex gap-[9px]">
      <Text className="text-heading-xxxs font-semibold text-text-subtle">근무조 입력</Text>
      <View className="flex h-[102px] gap-4 rounded-lg bg-white px-[15px] py-[11px]">
        <View className="flex-row gap-[8px]">
          <TeamItem onPress={handleId} isSelected={selectedBoxId === 1} id={1} text="1조" />
          <TeamItem onPress={handleId} isSelected={selectedBoxId === 2} id={2} text="2조" />
          <TeamItem onPress={handleId} isSelected={selectedBoxId === 3} id={3} text="3조" />
          <TeamItem onPress={handleId} isSelected={selectedBoxId === 4} id={4} text="4조" />
        </View>

        <View className="h-[32px] flex-row items-center justify-between">
          {/* 직접 입력 */}
          <View className="rounded-radius-max border-[0.5px] border-border-primary bg-surface-primary-light-2 px-[14px] py-[8px]">
            <Text className="text-label-xs text-text-primary">직접 입력</Text>
          </View>
          {/* A조 ~~ */}
          <View className="flex-1 gap-1 px-[14px] py-[8px]">
            <View className="flex-row items-center gap-2">
              <TextInput
                maxLength={8}
                value={teamName}
                placeholder="A조"
                onChangeText={newText => setTeamName(newText)}
                className="flex-1 text-label-xs placeholder:text-text-disabled"
              />
              <Text className="text-right text-label-xxs text-text-disabled">
                <Text className="text-text-primary">{teamName.length}</Text>
                <Text>/8</Text>
              </Text>
            </View>
            <View className="h-[0.5px] bg-border-gray-light" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TeamInput;
