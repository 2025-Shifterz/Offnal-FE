import {Todo} from '../entities/Todo';
import {TodoRepository} from '../repositories/TodoRepository';
/*
const addTodo = async text => {
  const db = await initDatabase(); // 데이터베이스 초기화 및 가져오기
  try {
    const [result] = await db.executeSql(
      'INSERT INTO todos (text, completed) VALUES (?, ?)',
      [text, 0], // 새로운 할 일은 기본적으로 미완료 상태 (0)
    );
    console.log(`Todo "${text}" added with ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};
*/

export class AddTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(text: string): Promise<number> {
    const newTodo: Todo = {id: 0, text, completed: false}; // ID는 저장 시 DB에서 할당
    return await this.todoRepository.addTodo(newTodo);
  }
}
