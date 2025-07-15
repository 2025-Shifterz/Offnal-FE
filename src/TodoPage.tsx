// presentation 레이어는 사용자 인터페이스를 담당. domain 레이어의 useCases를 호출하여 비즈니스 로직을 실행하고, 결과를 화면에 표시한다.
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Todo} from '../../../domain/entities/Todo';

import {
  addTodoUseCase,
  deleteTodoUseCase,
  getTodosUseCase,
  todoCompletionUseCase,
} from '../../../di/Dependencies';
import {createTodoTable} from '../../../local/tables/TodoTable';

const TodoPage = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const initializeTodos = async () => {
      try {
        await createTodoTable(); // 데이터베이스 초기화
        const loadedTodos = await getTodosUseCase.execute(); // UseCase 호출
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Failed to initialize DB or load todos:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeTodos();
  }, []);

  // Todo 추가하는 핸들러
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) {
      Alert.alert('알림', '할 일 내용을 압력해주세요');
      return;
    }
    // 새로운 텍스트가 존재하므로 로딩 상태 true
    setLoading(true);
    try {
      await addTodoUseCase.execute(newTodoText);
      setNewTodoText(''); // 초기화
      const updatedTodos = await getTodosUseCase.execute();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error adding todo: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleted = async (id: number, currentCompleted: boolean) => {
    setLoading(true);
    try {
      await todoCompletionUseCase.execute(id, !currentCompleted);
      const updatedTodos = await getTodosUseCase.execute();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error completing todo: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setLoading(true);
    try {
      await deleteTodoUseCase.execute(id);
      const updatedTodos = await getTodosUseCase.execute();
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
                onPress={() => handleCompleted(item.id, item.completed)}
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
