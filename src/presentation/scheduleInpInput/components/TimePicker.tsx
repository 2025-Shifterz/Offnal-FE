import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const sharedPlaceholderStyle =
  'rounded-radius-s border border-background-gray-subtle1 p-[8px] placeholder:text-label-xs placeholder:text-text-disabled';

const TimePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전'); // 오전/오후

  return (
    <View>
      <Text className={sharedPlaceholderStyle} onPress={() => setShowPicker(true)}>
        {`${period} ${hour.toString().padStart(2, '0')} : ${minute.toString().padStart(2, '0')}`}
      </Text>

      {showPicker && (
        <View className="absolute z-10 w-[124px] flex-row items-center gap-2 border bg-white px-[10px] py-[6px]">
          {/* 오전 / 오후 */}
          <View>
            <Text onPress={() => setPeriod(period === '오전' ? '오후' : '오전')}>바꾸기</Text>
            <Text>{period}</Text>
          </View>

          {/* 시 */}
          <View>
            <Text onPress={() => setHour(prev => (prev % 12) + 1)}>🔼</Text>
            <Text>{hour.toString().padStart(2, '0')}</Text>
            <Text onPress={() => setHour(prev => ((prev - 2 + 12) % 12) + 1)}>🔽</Text>
          </View>

          <Text>:</Text>

          {/* 분 */}
          <View>
            <Text onPress={() => setMinute(prev => (prev + 1) % 60)}>🔼</Text>
            <Text>{minute.toString().padStart(2, '0')}</Text>
            <Text onPress={() => setMinute(prev => (prev - 1 + 60) % 60)}>🔽</Text>
          </View>

          {/* 완료  */}
          <Button title="완료" onPress={() => setShowPicker(false)} />
        </View>
      )}
    </View>
  );
};

export default TimePicker;
