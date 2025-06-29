// Repository 인터페이스 정의,
// 실제 구현은 data 레이더에서 이루어진다.
import {Todo} from '../entities/Todo';

export interface TodoRepository {
  addTodo(todo: Omit<Todo, 'id'>): Promise<number>;
  getTodos(): Promise<Todo[]>;
  todoCompleted(id: number, completed: boolean): Promise<void>;
  deleteTodo(id: number): Promise<void>;
}
