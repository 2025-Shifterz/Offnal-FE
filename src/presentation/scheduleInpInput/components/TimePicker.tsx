/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import ArrowUp from '../../../assets/icons/arrow-up.svg';
import ArrowDown from '../../../assets/icons/arrow-down.svg';

const sharedPlaceholderStyle =
  'rounded-radius-s w-[84px] border border-background-gray-subtle1 p-[8px] text-label-xs text-text-disabled';

const pickerTextStyle = 'text-text-basic text-body-s font-[500px]';

const TimePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전'); // 오전/오후

  return (
    <View>
      <Text className={sharedPlaceholderStyle} onPress={() => setShowPicker(true)}>
        {`${period} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
      </Text>

      {showPicker && (
        <View
          className="absolute z-10 w-[124px] flex-row items-center gap-3 rounded-radius-s bg-surface-white px-[10px] py-[6px]"
          style={{
            shadowColor: 'rgba(191, 191, 191, 0.25)',
            shadowOpacity: 1,
            shadowRadius: 20,
            elevation: 4, // 안드로이드용
          }}
        >
          <>
            {/* 오전 / 오후 */}
            <View className="items-center">
              {/* 이모지는 나중에 수정할 예정입니다. */}
              <Text onPress={() => setPeriod(period === '오전' ? '오후' : '오전')}>🔄</Text>
              <Text className={pickerTextStyle}>{period}</Text>
            </View>

            {/* 시 */}
            <View className="items-center">
              <ArrowUp onPress={() => setHour(prev => (prev % 12) + 1)} />
              <Text className={pickerTextStyle}>{hour.toString().padStart(2, '0')}</Text>
              <ArrowDown onPress={() => setHour(prev => ((prev - 2 + 12) % 12) + 1)} />
            </View>

            <Text>:</Text>

            {/* 분 */}
            <View className="items-center">
              <ArrowUp onPress={() => setMinute(prev => (prev + 1) % 60)} />
              <Text className={pickerTextStyle}>{minute.toString().padStart(2, '0')}</Text>
              <ArrowDown onPress={() => setMinute(prev => (prev - 1 + 60) % 60)} />
            </View>

            {/* 완료  */}
            <Button title="완료" onPress={() => setShowPicker(false)} />
          </>
        </View>
      )}
    </View>
  );
};

export default TimePicker;
