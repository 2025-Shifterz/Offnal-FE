import React from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DayBoxHeader from './DayBoxHeader';
import EmptyMessage from './EmptyMessage';

// 하루의 할 일 박스

interface EmptyDayBoxProps {
  text: string;
  todos: { id: number; text: string; completed: boolean }[];
  newTodoText: string;
  setNewTodoText: (text: string) => void;
  handleAddTodo: () => void;
  handleCompleted: (id: number, completed: boolean) => void;
  handleDeleteTodo: (id: number) => void;
  showInput: boolean;
}

const NoteDayBox = ({
  text,
  todos,
  newTodoText,
  setNewTodoText,
  handleAddTodo,
  handleCompleted,
  handleDeleteTodo,
  showInput,
}: EmptyDayBoxProps) => {
  return (
    <View className="overflow-hidden rounded-radius-xl">
      <DayBoxHeader />

      <View className="items-center gap-[19px] bg-surface-white px-[29px] py-[27px]">
        {showInput && (
          <View>
            <TextInput
              value={newTodoText}
              onChangeText={setNewTodoText}
              placeholder="할 일을 입력하세요."
            />
            <TouchableOpacity onPress={handleAddTodo}>
              <Text>확인</Text>
            </TouchableOpacity>
          </View>
        )}

        {todos.length === 0 && !showInput ? (
          <EmptyMessage text={text} iconSize={48} />
        ) : (
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              console.log('todo item:', item);
              return (
                <View className="flex-row items-center justify-between py-2">
                  <TouchableOpacity
                    className="w-[250px]"
                    onPress={() => handleCompleted(item.id, item.completed)}
                  >
                    <Text
                      className={`border ${item.completed ? 'text-gray-400 line-through' : 'text-black'}`}
                    >
                      {item.text}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                    <Text className="text-sm text-red-500">삭제</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default NoteDayBox;
