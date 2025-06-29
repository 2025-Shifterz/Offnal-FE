// Repository 인터페이스 정의,
// 실제 구현은 data 레이더에서 이루어진다.
import {Todo} from '../entities/Todo';

export interface TodoRepository {
  addTodo(todo: Omit<Todo, 'id'>): Promise<number>;
  // Omit<Todo, 'id'>
  // {
  //   text: string;
  //   completed: boolean;
  // }
  // id는 자동으로 생성되어서 사용자가 입력할 필요가 없다는 뜻이다.

  // Promise<number> : 비동기 처리의 결과를 숫자로 리턴한다는 의미이다.
  getTodos(): Promise<Todo[]>;
  toggleTodoCompleted(id: number, completed: boolean): Promise<void>;
  deleteTodo(id: number): Promise<void>;
}
