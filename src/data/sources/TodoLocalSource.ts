// 데이터 소스에 직접 접근하는 로직을 포함한다. 여기서는 SQLite 관련 코드가 들어간다.
// source 는 실제 데이터 저장 기술과 직접 통신하여 데이터를 읽고 쓴다.
import SQLite from 'react-native-sqlite-storage';
import {Todo} from '../../domain/entities/Todo';

SQLite.enablePromise(true);

let dbInstance: SQLite.SQLiteDatabase | null = null;

// 데이터베이스를 열고 인스턴스를 반환하는 함수
const openDB = async (): Promise<SQLite.SQLiteDatabase> => {
  // 데이터베이스를 한 번만 열고 재사용하기
  if (dbInstance) {
    return dbInstance;
  }

  const db = await SQLite.openDatabase({
    name: 'myDatabase.db', // 생성될 파일 이름
    location: 'default', // 저장 위치 (Android/iOS 모두 알아서 처리)
  });

  console.log('DB opened!');
  dbInstance = db;
  return db;
};

// 데이터베이스 테이블을 초기화하는 함수 (앱 시작 시 한 번만 호출된다.)
const initDatabase = async () => {
  const db = await openDB(); // dbInstance를 통해 기존 연결을 재사용한다.

  // 트랜잭션 시작
  await db.transaction(async tx => {
    // todos 테이블 생성 쿼리
    // id: 고유 식별자 (자동 증가)
    // text: 할 일 내용
    // completed: 완료 여부 (0: 미완료, 1: 완료)
    await tx.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0
      );`,
      [],
    );

    console.log('Table "todos" created or already exists.');
  });
  return db;
};

export {initDatabase}; // 초기화 함수 내보내기

export class TodoLocalSource {
  // addTodo, getTodos, todoCompleted, deleteTodo 함수 구현하기

  // todo 추가하기
  async addTodo(todo: Omit<Todo, 'id'>): Promise<number> {
    const db = await initDatabase(); // 데이터베이스 초기화 및 가져오기
    try {
      const [result] = await db.executeSql(
        'INSERT INTO todos (text, completed) VALUES (?, ?)',
        [todo.text, todo.completed], // 새로운 할 일은 기본적으로 미완료 상태 (0)
      );
      console.log(`Todo "${todo.text}" added with ID: ${result.insertId}`);
      return result.insertId;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  // 모든 todos 가져오기
  getTodos = async (): Promise<Todo[]> => {
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

  // todo 완료 상태 바꾸기
  async todoCompleted(id: number, completed: boolean): Promise<void> {
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
  }

  // todo 삭제하기
  async deleteTodo(id: number): Promise<void> {
    const db = await initDatabase();
    try {
      await db.executeSql('DELETE FROM todos WHERE id = ?', [id]);
      console.log(`Todo with ID ${id} deleted.`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}
