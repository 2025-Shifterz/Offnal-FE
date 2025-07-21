import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { WorkTimeProvider } from './src/context/WorkTimeContext';

function App(): React.JSX.Element {
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
