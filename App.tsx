import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {initDatabase} from './src/database/sqlite'; // 실제 파일 경로로 수정
import {addTodo, getTodos, toggleTodoCompleted, deleteTodo} from './src/Todo';
//import {initDatabase} from './src/database/sqlite';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAndLoadTodos = async () => {
      try {
        await initDatabase(); // 데이터베이스 초기화 (테이블 생성 등)
        const loadedTodos = await getTodos(); // 기존 할 일 불러오기
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
    setLoading(true);
    try {
      const newTodoText = `My New Todo ${todos.length + 1}`;
      await addTodo(newTodoText);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompleted = async (id, currentCompleted) => {
    setLoading(true);
    try {
      await toggleTodoCompleted(id, !currentCompleted);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async id => {
    setLoading(true);
    try {
      await deleteTodo(id);
      const updatedTodos = await getTodos();
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
    flexShrink: 1, // 텍스트가 너무 길어질 때 줄바꿈
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default App;
