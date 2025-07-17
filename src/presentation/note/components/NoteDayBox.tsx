import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import DayBoxHeader from './DayBoxHeader';
import EmptyMessage from './EmptyMessage';
import CheckedIcon from '../../../assets/icons/checked.svg';

// 하루의 할 일 박스

interface EmptyDayBoxProps {
  text: string;
  type: string;
  todos: { id: number; text: string; completed: boolean; type: string }[];
  newTodoText: string;
  setNewTodoText: (text: string) => void;
  handleAddTodo: (type: string) => void;
  handleCompleted: (id: number, completed: boolean, type: string) => void;
  handleDeleteTodo: (id: number, type: string) => void;
  showInput: boolean;
}

const NoteDayBox = ({
  text,
  type,
  todos,
  newTodoText,
  setNewTodoText,
  handleAddTodo,
  handleCompleted,
  handleDeleteTodo,
  showInput,
}: EmptyDayBoxProps) => {
  return (
    <View className="w-full rounded-radius-xl">
      <DayBoxHeader />

      <View className="w-full items-center bg-surface-white">
        {todos.length === 0 && !showInput ? (
          <View className="py-[27px]">
            <EmptyMessage text={text} iconSize={48} />
          </View>
        ) : (
          todos.map(item => (
            // 할 일 리스트
            <View
              key={item.id}
              className="w-full flex-row items-center justify-between border-b-[0.3px] border-b-divider-gray-light px-[16px] py-p-3"
            >
              <TouchableOpacity onPress={() => handleCompleted(item.id, item.completed, item.type)}>
                {item.completed ? (
                  <CheckedIcon />
                ) : (
                  <View className="h-[13px] w-[13px] rounded-[2px] bg-[#cdd1d5]" />
                )}
              </TouchableOpacity>

              <View className="ml-[10px] flex-1">
                <Text>{item.text}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDeleteTodo(item.id, item.type)}>
                <Text className="text-sm text-red-500">삭제</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {showInput && (
          <View className="w-full gap-[5px] px-[16px] py-p-3">
            <View className="h-[40px] flex-row items-center justify-between">
              <TextInput
                value={newTodoText}
                onChangeText={setNewTodoText}
                placeholder={`${text} 입력`}
                className=""
              />
              <TouchableOpacity onPress={() => handleAddTodo(type)}>
                <Text className="text-sm">확인</Text>
              </TouchableOpacity>
            </View>
            <View className="h-[1px] bg-border-gray-light" />
          </View>
        )}
      </View>
    </View>
  );
};

export default NoteDayBox;
