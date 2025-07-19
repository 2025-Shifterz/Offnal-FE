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
  ({ children, snapPoints = ['25%', '70%'], onChange }, ref) => {
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <View className="absolute inset-0">
        <BottomSheet
          enableContentPanningGesture={false} //  제스처가 캘린더 터치 방해하지 않게
          ref={ref}
          index={-1}
          snapPoints={memoSnapPoints}
          onChange={onChange}
        >
          <BottomSheetView className="h-full">{children}</BottomSheetView>
        </BottomSheet>
      </View>
    );
  }
);

export default BottomSheetWrapper;
