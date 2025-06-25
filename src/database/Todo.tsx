import {initDatabase} from './sqlite';

// 할 일 추가
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

// 모든 할 일 조회
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

// 할 일 완료 상태 토글 (업데이트)
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

// 할 일 삭제
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

export {addTodo, getTodos, toggleTodoCompleted, deleteTodo};
