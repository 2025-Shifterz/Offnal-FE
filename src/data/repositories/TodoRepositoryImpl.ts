// data layer
// data 레이어는 domain 레이어에서 정의한 repository 인터페이스를 실제로 구현한다. 이 레이어는 외부 데이터 소스(여기서는 SQLite)와의 통신을 담당한다.
// 데이터의 저장/조회 방법에 대한 구현이 이루어진다.

import {Todo} from '../../domain/entities/Todo';
import {TodoRepository} from '../../domain/repositories/TodoRepository';
import {TodoLocalSource} from '../sources/TodoLocalSource';

// domain 레이어의 TodoRepository 인터페이스를 구현. 이 구현체는 sources (SQLite)를 사용하여 실제 데이터베이스 작업을 수행한다.

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private localSource: TodoLocalSource) {}

  async addTodo(todo: Omit<Todo, 'id'>): Promise<number> {
    // sources 에서 구현한 함수를 가져와서 사용한다.
    return await this.localSource.addTodo(todo);
  }

  async getTodos(): Promise<Todo[]> {
    return await this.localSource.getTodos();
  }

  async todoCompleted(id: number, completed: boolean): Promise<void> {
    return await this.localSource.todoCompleted(id, completed);
  }

  async deleteTodo(id: number): Promise<void> {
    return await this.localSource.deleteTodo(id);
  }
}
