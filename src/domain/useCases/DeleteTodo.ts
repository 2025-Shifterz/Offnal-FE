/*
const deleteTodo = async id => {
  const db = await initDatabase();
  try {
    await db.executeSql('DELETE FROM todos WHERE id = ?', [id]);
    console.log(`Todo with ID ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
*/
import {TodoRepository} from '../repositories/TodoRepository';

export class DeleteTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number): Promise<void> {
    await this.todoRepository.deleteTodo(id);
  }
}
