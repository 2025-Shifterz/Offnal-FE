import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import ArrowDown from '../../../assets/icons/arrow-down.svg';

interface MonthSelectorProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const formatMonthText = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
};

const MonthSelector = ({ selectedDate, setSelectedDate }: MonthSelectorProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: string, newDate?: Date) => {
    if (event === 'dateSetAction' && newDate) {
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      setSelectedDate(new Date(year, month, 1));
    }

    // 안드로이드는 Picker가 자동으로 닫힘
    setShowPicker(false);
  };

  return (
    <View className="w-full overflow-hidden rounded-t-radius-m2 bg-white">
      {/* ▼ 상단 드롭다운 버튼 형태 */}
      <TouchableOpacity
        className="w-[140px] flex-row items-center gap-[2px] p-4"
        onPress={() => setShowPicker(true)}
      >
        <Text className="text-heading-xs font-semibold text-text-basic">
          {formatMonthText(selectedDate)}
        </Text>
        <ArrowDown />
      </TouchableOpacity>

      {/* ▼ Month Picker */}
      {showPicker && (
        <Modal transparent visible={showPicker}>
          <MonthPicker onChange={onChange} value={selectedDate} locale="ko" />
        </Modal>
      )}
    </View>
  );
};

export default MonthSelector;
