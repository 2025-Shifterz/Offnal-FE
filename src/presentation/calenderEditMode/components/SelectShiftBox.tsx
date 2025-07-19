import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TimeFrame, { TimeFrameChildren } from '../../calenderType/components/TimeFrame';
import { twMerge } from 'tailwind-merge';

interface SelectShiftBoxProps {
  boxId: number;
  typeText: TimeFrameChildren;
  isSelected: boolean;
  onSelect: () => void;
  handleTypeSelect: () => void;
}

const SelectShiftBox = ({
  typeText,
  isSelected,
  onSelect,
  handleTypeSelect,
}: SelectShiftBoxProps) => {
  const selectedDivStyle = isSelected ? 'border-border-primary bg-surface-primary-light' : '';
  const selectedTextStyle = isSelected ? 'text-text-primary' : '';

  return (
    <TouchableOpacity
      onPress={() => {
        onSelect();
        handleTypeSelect();
      }}
      className={twMerge(
        'flex-row items-center justify-between rounded-radius-l border-[0.5px] border-border-gray-light px-p-6 py-p-4',
        selectedDivStyle
      )}
    >
      <View className="gap-[3px]">
        <Text
          className={twMerge('text-heading-xxxs font-semibold text-text-basic', selectedTextStyle)}
        >
          {typeText}
        </Text>
        <Text className={twMerge('text-label-xs text-text-disabled', selectedTextStyle)}>
          08:00~17:00
        </Text>
      </View>
      <TimeFrame text={typeText} />
    </TouchableOpacity>
  );
};

export default SelectShiftBox;
