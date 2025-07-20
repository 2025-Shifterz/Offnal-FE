import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PlusIcon from '../../../assets/icons/w-plus.svg';

interface NewAddButtonProps {
  handleAdd: () => void;
  text: string;
}

const NewAddButton = ({ handleAdd, text }: NewAddButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleAdd}
      className="h-[40px] flex-row items-center justify-center gap-[5px] rounded-radius-m1 bg-surface-primary px-[10px] py-[8px]"
    >
      <PlusIcon />
      <Text className="items-cente text-body-m font-medium leading-h-3 text-text-inverse-static">{`새 ${text} 추가하기`}</Text>
    </TouchableOpacity>
  );
};

export default NewAddButton;
