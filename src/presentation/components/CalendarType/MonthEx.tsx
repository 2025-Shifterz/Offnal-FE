/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

// 공부를 위한 예제코드입니다. 프로젝트에서 쓰이지 않는 컴포넌트입니다.

const MonthEx = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onValueChange = (event: string, newDate: Date) => {
    if (event === 'dateSetAction' && newDate) {
      setDate(newDate);
    }
    setShow(false);
  };

  return (
    <View className="w-full flex-1">
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Month Year Picker Example</Text>

      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        선택된 날짜: {date.getFullYear()}년 {date.getMonth() + 1}월
      </Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{ padding: 10, backgroundColor: '#2ECADC', borderRadius: 8 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>월 선택하기</Text>
      </TouchableOpacity>

      {show && (
        <View className="flex-1 items-center">
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date(2020, 0)} // 2020년 1월부터 가능
            maximumDate={new Date(2025, 11)} // 2025년 12월까지 가능
            locale="ko"
          />
        </View>
      )}
    </View>
  );
};

export default MonthEx;
