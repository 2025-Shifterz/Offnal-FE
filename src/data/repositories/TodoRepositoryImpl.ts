// data layer
// data 레이어는 domain 레이어에서 정의한 repository 인터페이스를 실제로 구현한다. 이 레이어는 외부 데이터 소스(여기서는 SQLite)와의 통신을 담당한다.

// domain 레이어의 TodoRepository 인터페이스를 구현. 이 구현체는 sources (SQLite)를 사용하여 실제 데이터베이스 작업을 수행한다.

// 다시 이해하기 !!!!!!!!!!!!!!
import {TodoRepository} from '../../domain/repositories/TodoRepository';
import {Todo} from '../../domain/entities/Todo';
import {TodoLocalSource} from '../sources/TodoLocalSource';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private localSource: TodoLocalSource) {}

  async addTodo(todo: Omit<Todo, 'id'>): Promise<number> {
    return await this.localSource.addTodo(todo);
  }

  async getTodos(): Promise<Todo[]> {
    return await this.localSource.getTodos();
  }

  async toggleTodoCompleted(id: number, completed: boolean): Promise<void> {
    await this.localSource.toggleTodoCompleted(id, completed);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.localSource.deleteTodo(id);
  }
}
