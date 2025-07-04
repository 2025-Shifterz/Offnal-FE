/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

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
    <View>
      {/* ▼ 상단 드롭다운 버튼 형태 */}
      <TouchableOpacity
        className="w-[140px] flex-row items-center gap-2 border bg-white p-2"
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1E1E1E' }}>
          {formatMonthText(selectedDate)}
        </Text>
        {/* /<Icon name="chevron-down-outline" size={18} color="#333" style={{ marginLeft: 8 }} /> */}
        <Text>🔽</Text>
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
