import '../../../../global.css';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeWorkTypeChip, { DayType } from '../components/HomeWorkTypeChip';

import TitleSection from '../components/TitleSection';

import AlramSection from '../ui/AlramSection';
import HealthGuideSection from '../ui/HealthGuideSection';
import RecommnedMealSection from '../ui/RecommendMealSection';

import HealthCard from '../components/HealthCard';

export default function MainScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <SafeAreaView className="w-full flex-1 justify-center bg-black marker:items-center">
        <ScrollView>
          <View className="w-full flex-row items-center justify-center gap-g-2 px-number-8 py-number-8">
            <HomeWorkTypeChip dayType={DayType.PAST} workType="휴일" />
            <HomeWorkTypeChip dayType={DayType.TODAY} workType="야간" />
            <HomeWorkTypeChip dayType={DayType.UPCOMMING} workType="주간" />
          </View>

          <View className="items-top flex-1 justify-start bg-background-gray-subtle1 p-number-8">
            <RecommnedMealSection />
            <HealthGuideSection />
            <AlramSection />

            <TitleSection.WithAddableBtn
              title="건강 카드"
              btnContent="건강 카드 추가"
              onPressIcon={() => {}}
            />

            <View className="w-full flex-row items-center gap-g-3 pb-number-8 pt-number-8">
              <HealthCard.Walk />
              <HealthCard.Weight />
            </View>
            <TitleSection.OnlyTitle title="기록하기" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
