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

// 나는 할 일 추가 기능을 수행할 건데, 데이터를 저장하고 불러오는 일은 TodoRepository 한테 시킬거야.
export class AddTodoUseCase {
  // 생성자가 TodoRepository를 요구함
  // import 했기 때문에 모든 게 연결되었다고 생각하면 안된다!
  // 해당 클래스의 인스턴스를 자동으로 생성하고 필요한 의존성을 채워주지는 않는다.
  // new와 생성자 매개변수(리포지토리)로 이 설계도에 따라 실제 건물(인스턴스)을 짓는 과정이다.
  constructor(private todoRepository: TodoRepository) {}

  async execute(text: string): Promise<number> {
    const newTodo: Todo = {id: 0, text, completed: false}; // ID는 저장 시 DB에서 할당
    return await this.todoRepository.addTodo(newTodo);
  }
}
