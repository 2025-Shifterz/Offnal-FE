import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AddIcon from '../../../assets/icons/todo-add.svg';

interface AddButtonProps {
  text: string;
  addOneTodo: () => void;
}

const OneAddButton = ({ text, addOneTodo }: AddButtonProps) => {
  return (
    <View className="mt-[8px] items-center">
      <TouchableOpacity
        onPress={addOneTodo}
        className="w-[93px] flex-row items-center justify-center gap-[5px] rounded-radius-max bg-surface-white py-[8px]"
      >
        <AddIcon />
        <Text className="text-body-xs font-[500] text-text-disabled-on">{`${text} 추가`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OneAddButton;
