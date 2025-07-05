import { View } from 'react-native';
import TitleSection from '../components/TitleSection';
import HealthGuideChip, { HealthGuideType } from '../components/HealthGuideChip';

const HealthGuideSection = () => {
  return (
    <View className="flex-col justify-start gap-y-number-7">
      <TitleSection.WithTooltipIcon
        title="오늘의 건강 가이드"
        onPressIcon={() => {
          console.log('Tooltip icon pressed');
        }}
      />
      <View className="w-full flex-row items-center gap-g-3">
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
    </View>
  );
};

export default HealthGuideSection;