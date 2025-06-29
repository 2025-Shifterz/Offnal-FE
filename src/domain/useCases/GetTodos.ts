/*
const getTodos = async () => {
  const db = await initDatabase();
  try {
    const [result] = await db.executeSql('SELECT * FROM todos');
    const todos = [];
    for (let i = 0; i < result.rows.length; i++) {
      todos.push(result.rows.item(i));
    }
    console.log('All todos:', todos);
    return todos;
  } catch (error) {
    console.error('Error getting todos:', error);
    throw error;
  }
};
*/
import {Todo} from '../entities/Todo';
import {TodoRepository} from '../repositories/TodoRepository';

export class GetTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepository.getTodos();
  }
}
