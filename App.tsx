import './global.css';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colorScheme} from 'nativewind';
import {useColorScheme} from 'react-native';
import HomeWorkTypeChip, { DayType } from './src/presentation/main/components/HomeWorkTypeChip';

export default function App() {
  const scheme = useColorScheme(); // 'light' or 'dark'

  useEffect(() => {
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.set('light');
      // light를 dark로 바꿔보면 dark모드일 때 화면 확인할 수 있습니다.(임시 코드)
    }
  }, [scheme]);

  return (
    <View className="flex-1 items-center justify-center">
      <SafeAreaView className="flex-1 w-full marker:items-center justify-center">
        <View className="flex-row w-full items-centerjustify-center pt-number-8 pb-number-8 ps-number-8 pe-number-8 space-x-number-2 bg-black">
          <HomeWorkTypeChip dayType={DayType.PAST} workType="휴일" />
          <HomeWorkTypeChip dayType={DayType.TODAY} workType="야간" />
          <HomeWorkTypeChip dayType={DayType.UPCOMMING} workType="주간" />
        </View>

        <View className="flex-col items-top justify-start bg-backgraund-gray-subtle1 rounded-radius-s p-number-8 w-full">
          <Text className="text-heading-xxs font-pretendard text-black">
            오늘의 식사 추천
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
