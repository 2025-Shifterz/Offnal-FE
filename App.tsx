import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createTodoTable } from './src/local/tables/TodoTable';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { WorkTimeProvider } from './src/context/WorkTimeContext';

function App(): React.JSX.Element {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <WorkTimeProvider>
          <RootNavigator />
        </WorkTimeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
