import '../../../../global.css';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeWorkTypeChip, { DayType } from '../components/HomeWorkTypeChip';

import AlramSection from '../ui/AlramSection';
import HealthGuideSection from '../ui/HealthGuideSection';
import RecommnedMealSection from '../ui/RecommendMealSection';
import NoteSection from '../ui/NoteSection';
import HealthCardSection from '../ui/HealthCardSection';
import TopCard from '../components/TopCard';

export default function MainScreen() {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1 bg-transparent" edges={['left', 'right']}>
        <ScrollView className="flex-1">
          <TopCard />
          <View className="w-full flex-row items-center justify-center gap-g-2 px-number-8 py-number-8">
            <HomeWorkTypeChip dayType={DayType.PAST} workType="휴일" />
            <HomeWorkTypeChip dayType={DayType.TODAY} workType="야간" />
            <HomeWorkTypeChip dayType={DayType.UPCOMMING} workType="주간" />
          </View>

          <View className="items-top flex-1 justify-start bg-background-gray-subtle1 p-number-8">
            <RecommnedMealSection />
            <HealthGuideSection />
            <AlramSection />
            <HealthCardSection />
            <NoteSection />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
