import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

// 데이터베이스를 열고 인스턴스를 반환하는 함수
const openDB = async () => {
  const db = await SQLite.openDatabase({
    name: 'myDatabase.db', // 생성될 파일 이름
    location: 'default', // 저장 위치 (Android/iOS 모두 알아서 처리)
  });

  console.log('DB opened!');
  return db;
};

// 데이터베이스 테이블을 초기화하는 함수
const initDatabase = async () => {
  const db = await openDB(); // 데이터베이스 열기

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
