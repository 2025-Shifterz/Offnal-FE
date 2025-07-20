import '../../../../global.css';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeWorkTypeChip, { DayType } from '../components/HomeWorkTypeChip';
import AlramSection from '../ui/AlramSection';
import HealthGuideSection from '../ui/HealthGuideSection';
import RecommnedMealSection from '../ui/RecommendMealSection';
import NoteSection from '../ui/NoteSection';
import HealthCardSection from '../ui/HealthCardSection';
import TopCard from '../components/TopCard';

import { homeRepository } from '../../../di/Dependencies';
import { HomeResponse } from '../../../remote/response/homeResponse';

export default function MainScreen() {
  const [homeData, setHomeData] = useState<HomeResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await homeRepository.getHome();
        setHomeData(data);
      } catch (error) {
        console.error('홈 데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  const translateWorkType = (type?: string): string => {
    if (!type) return '미등록';
    switch (type) {
      case 'DAY':
        return '주간';
      case 'EVENING':
        return '오후';
      case 'NIGHT':
        return '야간';
      case 'OFF':
        return '휴일';
      default:
        return '미등록';
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text style={{ color: 'white' }}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1 bg-transparent" edges={['left', 'right']}>
        <ScrollView className="flex-1">
          <TopCard />
          <View className="w-full flex-row items-center justify-center gap-g-2 px-number-8 py-number-8">
            <HomeWorkTypeChip
              dayType={DayType.PAST}
              workType={
                homeData && homeData.yesterdayType
                  ? translateWorkType(homeData.yesterdayType)
                  : '미등록'
              }
            />
            <HomeWorkTypeChip
              dayType={DayType.TODAY}
              workType={
                homeData && homeData.todayType ? translateWorkType(homeData.todayType) : '미등록'
              }
            />
            <HomeWorkTypeChip
              dayType={DayType.UPCOMMING}
              workType={
                homeData && homeData.tomorrowType
                  ? translateWorkType(homeData.tomorrowType)
                  : '미등록'
              }
            />
          </View>

          <View className="items-top flex-1 justify-start bg-background-gray-subtle1 p-number-8">
            <RecommnedMealSection meals={homeData?.todayRoutine?.meals as any ?? []} />
            <HealthGuideSection health={homeData?.todayRoutine?.health as any ?? null} />
            <AlramSection alarms={[]} />
            <HealthCardSection />
            <NoteSection />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
