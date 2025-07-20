import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import OneAddButton from '../components/OneAddButton';
import EmptyPage from '../components/EmptyPage';
import { Todo, TodoType } from '../../../domain/entities/Todo';
import { createTodoTable } from '../../../local/tables/TodoTable';
import {
  addTodoUseCase,
  deleteTodoUseCase,
  getTodosUseCase,
  todoCompletionUseCase,
} from '../../../di/Dependencies';
import NoteDayBox from '../components/NoteDayBox';
import { useNavigation } from '@react-navigation/native';
import { mainNavigation } from '../../../navigation/types';

interface NoteScreenProps {
  type: TodoType;
  text: string;
}

const NoteScreen = ({ type, text }: NoteScreenProps) => {
  // Todo 상태
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showInput, setShowInput] = useState(false);

  const isEmptyTodo = false;
  const navigation = useNavigation<mainNavigation>();

  // 데이터베이스 초기화
  useEffect(() => {
    console.log('NoteScreen type prop:', type);

    const initializeTodos = async () => {
      try {
        await createTodoTable(); // 데이터베이스 초기화
        const loadedTodos = await getTodosUseCase.execute(type); // UseCase 호출
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Failed to initialize DB or load todos:', error);
      }
    };

    initializeTodos();
  }, [type]);

  // Todo를 추가하는 함수
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) {
      Alert.alert('알림', '할 일 내용을 압력해주세요');
      return;
    }
    try {
      await addTodoUseCase.execute(newTodoText, type);
      setNewTodoText(''); // 초기화
      const updatedTodos = await getTodosUseCase.execute(type);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  // 할 일 완료
  const handleCompleted = async (id: number, currentCompleted: boolean) => {
    try {
      await todoCompletionUseCase.execute(id, !currentCompleted, type);
      const updatedTodos = await getTodosUseCase.execute(type);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error completing todo: ', error);
    }
  };

  // 할 일 삭제
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoUseCase.execute(id, type);
      const updatedTodos = await getTodosUseCase.execute(type);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAdd = () => {
    navigation.navigate('DayBoxScreen', {
      text: text,
      type: type,
      todos: todos,
      newTodoText: newTodoText,
      setNewTodoText: setNewTodoText,
      handleAddTodo: handleAddTodo,
      handleCompleted: handleCompleted,
      handleDeleteTodo: handleDeleteTodo,
      showInput: showInput,
    });
  };

  return (
    <View className="w-full flex-1 bg-background-gray-subtle1 px-[16px]">
      <EmptyPage handleAdd={handleAdd} text={text} />
      {/* {!isEmptyTodo && (
        <View>
          <NoteDayBox
            text={text}
            type={type}
            todos={todos}
            newTodoText={newTodoText}
            setNewTodoText={setNewTodoText}
            handleAddTodo={handleAddTodo}
            handleCompleted={handleCompleted}
            handleDeleteTodo={handleDeleteTodo}
            showInput={showInput}
          />
          <OneAddButton addOneTodo={() => setShowInput(true)} text={text} />
        </View>
      )} */}
    </View>
  );
};

export default NoteScreen;
