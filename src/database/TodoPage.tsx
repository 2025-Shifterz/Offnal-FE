// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TextInput,
//   Alert,
// } from 'react-native';
// import {addTodo, getTodos, toggleTodoCompleted, deleteTodo} from './Todo.tsx';
// import {initDatabase} from './sqlite.tsx';

// const TodoPage = () => {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newTodoText, setNewTodoText] = useState('');

//   useEffect(() => {
//     const initializeAndLoadTodos = async () => {
//       try {
//         await initDatabase(); // 데이터베이스 초기화 (테이블 생성 등)
//         const loadedTodos = await getTodos(); // 기존 할 일 불러오기
//         setTodos(loadedTodos);
//       } catch (error) {
//         console.error('Failed to initialize DB or load todos:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAndLoadTodos();
//   }, []);

//   const handleAddTodo = async () => {
//     // 입력된 텍스트가 비어 있거나 공백만 있는 경우 추가하지 않습니다.
//     if (!newTodoText.trim()) {
//       Alert.alert('알림', '할 일 내용을 입력해주세요.');
//       return;
//     }
//     setLoading(true);
//     try {
//       // const newTodoText = `My New Todo ${todos.length + 1}`;
//       await addTodo(newTodoText); // DB에 새로운 할 일 추가
//       setNewTodoText(''); // TextInput 값 초기화
//       const updatedTodos = await getTodos();
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error adding todo:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleCompleted = async (id, currentCompleted) => {
//     setLoading(true);
//     try {
//       await toggleTodoCompleted(id, !currentCompleted);
//       const updatedTodos = await getTodos();
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error toggling todo:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteTodo = async id => {
//     setLoading(true);
//     try {
//       await deleteTodo(id);
//       const updatedTodos = await getTodos();
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading Todos...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Todo List</Text>
//       <TextInput
//         style={styles.todoTextInput}
//         placeholder="새로운 할 일을 입력하세요..."
//         value={newTodoText}
//         onChangeText={setNewTodoText}
//         //returnKeyType="done" // 키보드에 "완료" 버튼 표시
//         //onSubmitEditing={handleAddTodo} // 키보드 "완료" 버튼 클릭 시 할 일 추가
//       />
//       <Button title="Add New Todo" onPress={handleAddTodo} />
//       <FlatList
//         data={todos}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({item}) => (
//           <View style={styles.todoItem}>
//             <Text
//               style={[styles.todoText, item.completed && styles.completedText]}>
//               {item.text}
//             </Text>
//             <View style={styles.flexing}>
//               <Button
//                 title={item.completed ? 'Uncomplete' : 'Complete'}
//                 onPress={() => handleToggleCompleted(item.id, item.completed)}
//               />
//               <Button
//                 title="Delete"
//                 onPress={() => handleDeleteTodo(item.id)}
//                 color="red"
//               />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   todoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     marginVertical: 8,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   todoText: {
//     fontSize: 18,
//     flexShrink: 1, // 텍스트가 너무 길어질 때 줄바꿈
//   },
//   completedText: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
//   todoTextInput: {
//     backgroundColor: 'white',

//     height: 50,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     fontSize: 17,
//   },
//   flexing: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
// });

// export default TodoPage;
