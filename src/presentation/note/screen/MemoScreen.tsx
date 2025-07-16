import React, { useState } from 'react';
import { View } from 'react-native';
import EmptyDayBox from '../components/NoteDayBox';
import OneAddButton from '../components/OneAddButton';
import EmptyPage from '../components/EmptyPage';

const MemoScreen = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const handleAdd = () => {
    setIsEmpty(false);
  };

  return (
    <View className="w-full flex-1 bg-background-gray-subtle1 px-[16px]">
      {isEmpty && <EmptyPage text="메모" handleAdd={handleAdd} />}
      {!isEmpty && (
        <View>
          <EmptyDayBox text="메모" />
          <OneAddButton text="메모" />
        </View>
      )}
    </View>
  );
};

export default MemoScreen;
