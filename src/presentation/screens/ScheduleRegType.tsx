import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import SelectScheduleBox from '../components/ScheduleRegType/SelectScheduleBox';
import BottomButton from '../components/ScheduleRegType/BottomButton';

const ScheduleRegType = () => {
  const [selectedBoxId, setSelectedBoxId] = useState<number>(1);

  // 이 함수는 클릭된 박스의 id를 받아서 상태를 업데이트.
  const handleBoxClick = (id: number) => {
    setSelectedBoxId(id);
    console.log(`Selected Box ID: ${id}`);
  };

  return (
    <View className="w-full flex-1 pt-[14px]">
      <View className="flex flex-col gap-[12px]">
        <Text className="text-heading-m font-semibold leading-[1.4] text-text-bolder">
          근무표 등록 방식을 선택해주세요.
        </Text>

        <Text className="text-label-xs text-text-subtle">
          전체 근무표를 등록해 여러 조의 스케쥴을 확인하거나,{'\n'}내 근무조만 등록해 간편하게
          일상을 관리할 수 있어요.
        </Text>
      </View>
      <View className="mt-[26px] flex flex-row gap-3">
        <SelectScheduleBox
          id={1}
          onPress={handleBoxClick}
          isSelected={selectedBoxId === 1}
          title="전체 근무표 등록"
          subTitle={`여러 조의 스케줄이 담긴\n근무표를 등록할 수 있어요`}
        />
        <SelectScheduleBox
          id={2}
          onPress={handleBoxClick}
          isSelected={selectedBoxId === 2}
          title="내 근무표만 등록"
          subTitle={`내가 속한 조의 스케줄만\n간편하게 등록해요`}
        />
      </View>

      <BottomButton />
    </View>
  );
};

export default ScheduleRegType;
