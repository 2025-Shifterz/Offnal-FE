import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native';
import ArrowDown from '../../../../../assets/icons/arrow-down.svg';

interface CalendarViewerHeaderProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const CalendarViewerHeader = ({ selectedDate, onChange }: CalendarViewerHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const [tempYear, setTempYear] = useState(selectedDate.getFullYear());
  const [tempMonth, setTempMonth] = useState(selectedDate.getMonth() + 1);

  const handleConfirm = () => {
    setVisible(false);
    onChange(new Date(tempYear, tempMonth - 1));
  };

  return (
    <View className="bg-white py-[12px]">
      <TouchableOpacity className="flex-row gap-[4px]" onPress={() => setVisible(true)}>
        <Text className="text-heading-xs font-semibold text-text-basic">
          {tempYear}년 {tempMonth}월
        </Text>
        <ArrowDown />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={handleConfirm}>
          <View className="flex-1 items-center justify-center bg-black/30">
            <View
              onStartShouldSetResponder={() => true}
              className="h-[120px] w-[180px] rounded-md bg-white p-[12px]"
            >
              <View className="flex-row justify-between">
                {/* 년도 리스트 */}
                <FlatList
                  data={years}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={false}
                  style={{ width: '48%' }}
                  renderItem={({ item }) => {
                    const isSelected = item === tempYear;
                    return (
                      <TouchableOpacity onPress={() => setTempYear(item)}>
                        <Text className={`py-1 text-center ${isSelected ? 'bg-gray-200' : ''}`}>
                          {item}년
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                {/* 월 리스트 */}
                <FlatList
                  data={months}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={false}
                  style={{ width: '48%' }}
                  renderItem={({ item }) => {
                    const isSelected = item === tempMonth;
                    return (
                      <TouchableOpacity onPress={() => setTempMonth(item)}>
                        <Text className={`py-1 text-center ${isSelected ? 'bg-gray-200' : ''}`}>
                          {item}월
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CalendarViewerHeader;
