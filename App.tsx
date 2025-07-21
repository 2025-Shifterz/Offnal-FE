import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { createTodoTable } from './src/local/tables/TodoTable';

const App = () => {
  // Todo 테이블 생성
  useEffect(() => {
    const initializeDB = async () => {
      try {
        await createTodoTable(); // 앱 시작 시 테이블 생성
        console.log('Todo table created!');
      } catch (error) {
        console.error('Error creating todo table:', error);
      }
    };

    initializeDB();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
