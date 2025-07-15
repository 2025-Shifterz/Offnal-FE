import React, { useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ArrowDown from '../../../assets/icons/arrow-down.svg';

interface MonthPickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

// 달, 월 범위 배열 설정
const currentYear = new Date().getFullYear();
const MONTH = Array.from({ length: 12 }, (_, i) => i + 1); // 1~12 월
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear + i); // 현재 년도 ~ + 50년

const CustomMonthPicker = ({ selectedDate, onChange }: MonthPickerProps) => {
  const [visible, setVisible] = useState(false);
  const [tempYear, setTempYear] = useState(selectedDate.getFullYear());
  const [tempMonth, setTempMonth] = useState(selectedDate.getMonth() + 1);

  const handleConfirm = () => {
    setVisible(false);
    onChange(new Date(tempYear, tempMonth - 1));
  };

  return (
    <View className="rounded-t-radius-m2 bg-white">
      <TouchableOpacity
        className="w-[130px] flex-row items-center justify-center gap-[2px] p-[6px]"
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text className="text-heading-xs font-semibold text-text-basic">{`${tempYear}년 ${tempMonth}월`}</Text>
        <ArrowDown />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          onChange(new Date(tempYear, tempMonth - 1));
          setVisible(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            handleConfirm();
          }}
        >
          <View className="flex-1 items-center justify-center bg-black/20">
            <View
              onStartShouldSetResponder={() => true}
              className="h-[100px] w-[160px] rounded-md bg-surface-white p-[11px]"
            >
              <View className="flex-row gap-10">
                <FlatList
                  data={YEARS}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={true}
                  renderItem={({ item }) => {
                    const isSelected = item === tempYear;
                    return (
                      <TouchableOpacity onPress={() => setTempYear(item)}>
                        <Text className={isSelected ? 'bg-[#cecece]' : ''}>{item}년</Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                <FlatList
                  data={MONTH}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={true}
                  renderItem={({ item }) => {
                    const isSelected = item === tempMonth;
                    return (
                      <TouchableOpacity onPress={() => setTempMonth(item)}>
                        <Text className={isSelected ? 'bg-[#cecece]' : ''}>{item}월</Text>
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

export default CustomMonthPicker;
