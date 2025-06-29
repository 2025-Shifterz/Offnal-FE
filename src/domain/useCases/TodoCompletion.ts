/*
const toggleTodoCompleted = async (id, completed) => {
  const db = await initDatabase();
  try {
    await db.executeSql(
      'UPDATE todos SET completed = ? WHERE id = ?',
      [completed ? 1 : 0, id], // true면 1, false면 0으로 저장
    );
    console.log(`Todo with ID ${id} updated to completed: ${completed}`);
  } catch (error) {
    console.error('Error toggling todo completion:', error);
    throw error;
  }
};
*/

import {TodoRepository} from '../repositories/TodoRepository';

export class TodoCompletionUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number, completed: boolean): Promise<void> {
    await this.todoRepository.todoCompleted(id, completed);
  }
}
