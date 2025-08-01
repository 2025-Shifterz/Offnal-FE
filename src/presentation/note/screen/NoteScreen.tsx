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
import { Dayjs } from 'dayjs';

interface NoteScreenProps {
  type: TodoType;
  text: string;
}

const NoteScreen = ({ type, text }: NoteScreenProps) => {
  // note가 비어있는지 여부
  const [isEmpty, setIsEmpty] = useState(true);
  const handleAdd = () => {
    setIsEmpty(false);
  };

  // Todo 상태
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    console.log('NoteScreen type prop:', type);

    const initializeTodos = async () => {
      try {
        // await createTodoTable(); // 데이터베이스 초기화는 App.tsx에서.
        const loadedTodos = await getTodosUseCase.execute(type); // UseCase 호출
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };

    initializeTodos();
  }, [type]);

  // Todo를 추가하는 함수
  const handleAddTodo = async (date: Dayjs) => {
    if (!newTodoText.trim()) {
      Alert.alert('알림', '할 일 내용을 압력해주세요');
      return;
    }
    try {
      const isoDate = date.toISOString(); // 혹은 `format('YYYY-MM-DD')`도 가능

      await addTodoUseCase.execute(newTodoText, type, isoDate);
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

  // todos가 하나라도 있으면 <EmptyPage>는 무시한다.
  useEffect(() => {
    setIsEmpty(todos.length === 0);
  }, [todos]);

  return (
    <View className="w-full flex-1 bg-background-gray-subtle1 px-[16px]">
      {isEmpty && <EmptyPage text={text} handleAdd={handleAdd} />}
      {!isEmpty && (
        <View>
          <NoteDayBox
            text={text}
            type={type}
            todos={todos}
            newTodoText={newTodoText}
            setNewTodoText={setNewTodoText} // get todos
            handleAddTodo={handleAddTodo}
            handleCompleted={handleCompleted}
            handleDeleteTodo={handleDeleteTodo}
            showInput={showInput}
          />
          <OneAddButton addOneTodo={() => setShowInput(true)} text={text} />
        </View>
      )}
    </View>
  );
};

export default NoteScreen;
