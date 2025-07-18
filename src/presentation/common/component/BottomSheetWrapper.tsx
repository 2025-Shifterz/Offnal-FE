import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';

type BottomSheetWrapperProps = {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  onChange?: (index: number) => void;
};

const BottomSheetWrapper = forwardRef<BottomSheet, BottomSheetWrapperProps>(
  ({ children, snapPoints = ['25%', 467], onChange }, ref) => {
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <View className="absolute inset-0">
        <GestureHandlerRootView className="flex-1">
          <BottomSheet ref={ref} index={-1} snapPoints={memoSnapPoints} onChange={onChange}>
            <BottomSheetView className="h-full">{children}</BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    );
  }
);

export default BottomSheetWrapper;
