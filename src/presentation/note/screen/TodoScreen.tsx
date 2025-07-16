import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import OneAddButton from '../components/OneAddButton';
import EmptyPage from '../components/EmptyPage';
import { Todo } from '../../../domain/entities/Todo';
import { createTodoTable } from '../../../local/tables/TodoTable';
import {
  addTodoUseCase,
  deleteTodoUseCase,
  getTodosUseCase,
  todoCompletionUseCase,
} from '../../../di/Dependencies';
import NoteDayBox from '../components/NoteDayBox';

const TodoScreen = () => {
  // note가 비어있는지 여부
  const [isEmpty, setIsEmpty] = useState(true);
  const handleAdd = () => {
    setIsEmpty(false);
  };

  // Todo 상태
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showInput, setShowInput] = useState(false);

  // 데이터베이스 초기화
  useEffect(() => {
    const initializeTodos = async () => {
      try {
        await createTodoTable(); // 데이터베이스 초기화
        const loadedTodos = await getTodosUseCase.execute(); // UseCase 호출
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Failed to initialize DB or load todos:', error);
      }
    };

    initializeTodos();
  }, []);

  // Todo를 추가하는 함수
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) {
      Alert.alert('알림', '할 일 내용을 압력해주세요');
      return;
    }
    try {
      await addTodoUseCase.execute(newTodoText);
      setNewTodoText(''); // 초기화
      const updatedTodos = await getTodosUseCase.execute();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  // 할 일 완료
  const handleCompleted = async (id: number, currentCompleted: boolean) => {
    try {
      await todoCompletionUseCase.execute(id, !currentCompleted);
      const updatedTodos = await getTodosUseCase.execute();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error completing todo: ', error);
    }
  };

  // 할 일 삭제
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoUseCase.execute(id);
      const updatedTodos = await getTodosUseCase.execute();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <View className="w-full flex-1 bg-background-gray-subtle1 px-[16px]">
      {isEmpty && <EmptyPage text="할 일" handleAdd={handleAdd} />}
      {!isEmpty && (
        <View>
          <NoteDayBox
            text="할 일"
            todos={todos}
            newTodoText={newTodoText}
            setNewTodoText={setNewTodoText}
            handleAddTodo={handleAddTodo}
            handleCompleted={handleCompleted}
            handleDeleteTodo={handleDeleteTodo}
            showInput={showInput}
          />
          <OneAddButton addOneTodo={() => setShowInput(true)} text="할 일" />
        </View>
      )}
    </View>
  );
};

export default TodoScreen;
