import {Todo} from '../entities/Todo';
import {TodoRepository} from '../repositories/TodoRepository';

export class GetTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepository.getTodos();
  }
}
