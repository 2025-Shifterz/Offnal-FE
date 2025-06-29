// src/di/Dependencies.ts (예시)
//import {TodoLocalSource} from './src/data/sources/TodoLocalSource';
// import {TodoLocalSource} from './src/data/sources/TodoLocalSource';
// import {TodoRepositoryImpl} from './src/data/repositories/TodoRepositoryImpl';
// import {AddTodoUseCase} from './src/domain/useCases/AddTodo';
// import {GetTodosUseCase} from './src/domain/useCases/GetTodos';
//import {ToggleTodoCompletionUseCase} from './src/domain/useCases/todoCompletion';
//import {DeleteTodoUseCase} from './src/domain/useCases/DeleteTodo';

// Singletons (애플리케이션 전반에 걸쳐 하나의 인스턴스만 사용)
const todoLocalSource = new TodoLocalSource();
const todoRepository = new TodoRepositoryImpl(todoLocalSource);

export const addTodoUseCase = new AddTodoUseCase(todoRepository);
export const getTodosUseCase = new GetTodosUseCase(todoRepository);
export const toggleTodoCompletionUseCase = new ToggleTodoCompletionUseCase(
  todoRepository,
);
export const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

// src/app.tsx
import React from 'react';
// import TodoPage from './presentation/screens/TodoPage'; // TodoPage는 위에서 DI를 포함하고 있음
import {
  initDatabase,
  TodoLocalSource,
} from './src/data/sources/TodoLocalSource';
import {useEffect} from 'react';
import TodoPage from './src/presentation/screens/TodoPage';
import {TodoRepositoryImpl} from './src/data/repositories/TodoRepositoryImpl';
import {AddTodoUseCase} from './src/domain/useCases/AddTodo';
import {GetTodosUseCase} from './src/domain/useCases/GetTodos';
import {ToggleTodoCompletionUseCase} from './src/domain/useCases/TodoCompletion';
import {DeleteTodoUseCase} from './src/domain/useCases/DeleteTodo';

const App = () => {
  useEffect(() => {
    // 앱 시작 시 데이터베이스 초기화
    initDatabase().catch(error => {
      console.error('Failed to initialize database on app start:', error);
    });
  }, []);

  return <TodoPage />;
};

export default App;
