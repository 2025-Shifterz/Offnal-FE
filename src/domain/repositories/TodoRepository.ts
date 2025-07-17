// Repository 인터페이스 정의,
// 실제 구현은 data 레이어에서 이루어진다.
import { Todo, TodoType } from '../entities/Todo';

export interface TodoRepository {
  addTodo(todo: Omit<Todo, 'id'>): Promise<number>;
  getTodos(type: TodoType): Promise<Todo[]>;
  todoCompleted(id: number, completed: boolean, type: TodoType): Promise<void>;
  deleteTodo(id: number, type: TodoType): Promise<void>;
}
