import {TodoRepository} from '../repositories/TodoRepository';

export class TodoCompletionUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number, completed: boolean): Promise<void> {
    await this.todoRepository.todoCompleted(id, completed);
  }
}
