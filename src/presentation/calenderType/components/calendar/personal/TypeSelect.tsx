import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomDashedLine from '../../DashedLine';
import TimeFrame, { TimeFrameChildren } from '../../TimeFrame';

interface TypeSelectProps {
  onPress: (type: TimeFrameChildren) => void;
}

const types: TimeFrameChildren[] = ['주간', '오후', '야간', '휴일'];

// onPress('주간')을 호출하면 handleTypeSelect('주간')을 실행하게 된다.
const TypeSelect = ({ onPress }: TypeSelectProps) => {
  return (
    <>
      <CustomDashedLine />
      <TouchableOpacity className="flex-col gap-[9px] rounded-b-radius-m2 bg-surface-white p-[11px]">
        <Text className="text-body-xs font-semibold text-text-subtle">근무 형태 입력</Text>
        <View className="flex-row gap-[6px]">
          {types.map(type => (
            <TimeFrame key={type} text={type} onPress={() => onPress(type)} />
          ))}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TypeSelect;
