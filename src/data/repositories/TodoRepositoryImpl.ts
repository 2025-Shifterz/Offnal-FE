// domain 레이어의 TodoRepository 인터페이스를 구현. 이 구현체는 sources (SQLite)를 사용하여 실제 데이터베이스 작업을 수행한다.
// sources 에서 구현한 함수를 가져와서 사용함.
// 데이터의 저장/조회 방법에 대한 구현이 이루어진다.

import {Todo} from '../../domain/entities/Todo';
import {TodoRepository} from '../../domain/repositories/TodoRepository';
import {TodoLocalSource} from '../sources/TodoLocalSource';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private localSource: TodoLocalSource) {}

  async addTodo(todo: Omit<Todo, 'id'>): Promise<number> {
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
