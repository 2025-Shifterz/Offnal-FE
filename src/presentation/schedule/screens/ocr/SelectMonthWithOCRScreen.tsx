import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MonthPicker } from '../../component/MonthPicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { onboardingNavigation, OnboardingStackParamList } from '../../../../navigation/types';

type ScheduleTypeRouteProp = RouteProp<OnboardingStackParamList, 'SelectMonthWithOCR'>;

const SelectMonthWithOCRScreen = () => {
  const route = useRoute<ScheduleTypeRouteProp>();
  const navigation = useNavigation<onboardingNavigation>();

  const { selectedBoxId, calendarName, workGroup, workTimes } = route.params;

  const [date, setDate] = useState<{ year: number; month: number | null }>({
    year: new Date().getFullYear(),
    month: null,
  });

  const handleDateChange = (year: number, month: number | null) => {
    setDate({ year, month });
  };

  const handleNext = () => {
    if (date.month) {
      navigation.navigate('SelectInputScheduleWithOCRType', {
        year: date.year,
        month: date.month,
        selectedBoxId,
        calendarName,
        workGroup,
        workTimes
      });
    } else {
      Alert.alert(
        '월을 선택해주세요',
        '근무 월을 선택하지 않으면 다음 단계로 넘어갈 수 없습니다.',
        [{ text: '확인', onPress: () => {} }]
      );
    }
  };

  return (
    <View className="flex-1 bg-background-gray-subtle1">
      <SafeAreaView className="flex-1 items-center px-number-8">
        <View className="w-full items-start justify-center">
          <Text className="font-pretendard text-heading-m text-text-bolder">
            이미지에 해당하는 근무 월을{'\n'}선택해주세요.
          </Text>
          <Text className="mb-number-9 pt-number-7 font-pretendard text-label-xs text-text-subtle">
            AI 인식을 위해 등록할 이미지가{'\n'}어떤 월의 근무표인지 알려주세요.
          </Text>
        </View>
        <MonthPicker onDateChange={handleDateChange} />

        <View className="absolute bottom-[18px] w-full">
          <TouchableOpacity
            className="flex w-full items-center rounded-lg bg-surface-inverse py-[13px]"
            onPress={handleNext}
          >
            <Text className="text-body text-body-m text-text-bolder-inverse">다음</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SelectMonthWithOCRScreen;
