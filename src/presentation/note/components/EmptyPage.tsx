import React from 'react';
import { Text, View } from 'react-native';
import NewAddButton from './NewAddButton';
import EmptyMessage from './EmptyMessage';

interface EmptyTodoProps {
  handleAdd: () => void;
  text: string;
}

const EmptyPage = ({ handleAdd, text }: EmptyTodoProps) => {
  return (
    <View className="flex-1 items-center justify-center gap-[41px]">
      <EmptyMessage iconSize={96} text={text} divStyle="gap-[41px]" textStyle="text-body-m" />
      <NewAddButton text={text} handleAdd={handleAdd} />
    </View>
  );
};

export default EmptyPage;
