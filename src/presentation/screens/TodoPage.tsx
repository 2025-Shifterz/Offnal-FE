// presentation 레이어는 사용자 인터페이스를 담당. domain 레이어의 useCases를 호출하여 비즈니스 로직을 실행하고, 결과를 화면에 표시한다.

// 다시 이해하기!!!!!!!!!!!!!
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

// DI를 위한 설정
import {TodoRepositoryImpl} from '../../data/repositories/TodoRepositoryImpl';
import {
  TodoLocalSource,
  initDatabase,
} from '../../data/sources/TodoLocalSource';
import {AddTodoUseCase} from '../../domain/useCases/AddTodo';
import {GetTodosUseCase} from '../../domain/useCases/GetTodos';
import {DeleteTodoUseCase} from '../../domain/useCases/DeleteTodo';
import {Todo} from '../../domain/entities/Todo'; // Todo 엔티티 임포트
import {ToggleTodoCompletionUseCase} from '../../domain/useCases/TodoCompletion';

// 의존성 주입 (Dependency Injection)
const todoLocalSource = new TodoLocalSource();
const todoRepository = new TodoRepositoryImpl(todoLocalSource);

const addTodoUseCase = new AddTodoUseCase(todoRepository);
const getTodosUseCase = new GetTodosUseCase(todoRepository);
const toggleTodoCompletionUseCase = new ToggleTodoCompletionUseCase(
  todoRepository,
);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const initializeAndLoadTodos = async () => {
      try {
        await initDatabase(); // 데이터베이스 초기화
        const loadedTodos = await getTodosUseCase.execute(); // UseCase 호출
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Failed to initialize DB or load todos:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAndLoadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) {
      Alert.alert('알림', '할 일 내용을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      await addTodoUseCase.execute(newTodoText); // UseCase 호출
      setNewTodoText('');
      const updatedTodos = await getTodosUseCase.execute(); // UseCase 호출
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompleted = async (
    id: number,
    currentCompleted: boolean,
  ) => {
    setLoading(true);
    try {
      await toggleTodoCompletionUseCase.execute(id, !currentCompleted); // UseCase 호출
      const updatedTodos = await getTodosUseCase.execute(); // UseCase 호출
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setLoading(true);
    try {
      await deleteTodoUseCase.execute(id); // UseCase 호출
      const updatedTodos = await getTodosUseCase.execute(); // UseCase 호출
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Todos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <TextInput
        style={styles.todoTextInput}
        placeholder="새로운 할 일을 입력하세요..."
        value={newTodoText}
        onChangeText={setNewTodoText}
      />
      <Button title="Add New Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <Text
              style={[styles.todoText, item.completed && styles.completedText]}>
              {item.text}
            </Text>
            <View style={styles.flexing}>
              <Button
                title={item.completed ? 'Uncomplete' : 'Complete'}
                onPress={() => handleToggleCompleted(item.id, item.completed)}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteTodo(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todoText: {
    fontSize: 18,
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  todoTextInput: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 17,
  },
  flexing: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default TodoPage;
