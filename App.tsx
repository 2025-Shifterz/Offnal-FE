import './global.css';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';
import HomeWorkTypeChip, { DayType } from './src/presentation/main/components/HomeWorkTypeChip';
import HealthGuideChip, {
  HealthGuideType,
} from './src/presentation/main/components/HealthGuideChip';

import TitleSection from './src/presentation/main/components/TitleSection';

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
      <SafeAreaView className="w-full flex-1 justify-center marker:items-center bg-black">
        <View className="w-full flex-row items-center justify-center gap-g-2 px-number-8 py-number-8">
          <HomeWorkTypeChip dayType={DayType.PAST} workType="휴일" />
          <HomeWorkTypeChip dayType={DayType.TODAY} workType="야간" />
          <HomeWorkTypeChip dayType={DayType.UPCOMMING} workType="주간" />
        </View>

        <View className="items-top flex-1 justify-start bg-background-gray-subtle1 p-number-8">
          <TitleSection.OnlyTitle title="오늘의 식사 추천" />

          <TitleSection.WithTooltipIcon
            title="오늘의 건강 가이드"
            onPressIcon={() => {
              console.log('Tooltip icon pressed');
            }}
          />
          <View className="w-full flex-row items-center gap-g-3 pb-number-8 pt-number-8">
            <HealthGuideChip
              healthGuideType={HealthGuideType.SLEEP}
              guideContent="출근 전 13시~18시 낮잠 퇴근 후 21시~23시 취침"
              guideTime="오전 7시 - 오전 8시"
            />
            <HealthGuideChip
              healthGuideType={HealthGuideType.FASTING_TIME}
              guideContent="아침은 하루의 시작을 알리는 중요한 식사입니다."
              guideTime="오전 7시 - 오전 8시"
            />
          </View>

          <TitleSection.WithAddableBtn
            title="건강 카드"
            btnContent="건강 카드 추가"
            onPressIcon={() => {}}
          />

          <TitleSection.WithAddableBtn
            title="자동알람"
            btnContent="알람 추가"
            onPressIcon={() => {}}
          />

          <TitleSection.OnlyTitle title="기록하기" />
        </View>
      </SafeAreaView>
    </View>
  );
}
