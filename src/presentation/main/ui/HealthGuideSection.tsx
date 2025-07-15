import { View } from 'react-native';
import TitleSection from '../components/TitleSection';
import HealthGuideChip, { HealthGuideType } from '../components/HealthGuideChip';
import { useState } from 'react';
import TooltipBubble from '../components/Tooltip';

const HealthGuideSection = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <View className="flex-col justify-start gap-y-number-7">
      <TitleSection.WithTooltipIcon
        title="오늘의 건강 가이드"
        onPressIcon={toggleTooltip}
      />

      {showTooltip && (
        <TooltipBubble
          style={{
            // 툴팁의 위치 조정
            // 정보 아이콘 바로 아래에 위치하도록 조정합니다.
            // px-number-8은 32px (좌우 패딩)로 가정.
            // 툴팁의 가로 중앙을 정보 아이콘의 중앙에 맞춥니다.
            left: '50%', // 부모 뷰의 중앙으로 일단 이동
            transform: [{ translateX: -100 }], // 툴팁 너비의 절반과 정보 아이콘의 폭을 고려하여 조정
            // 툴팁의 세로 위치 조정
            top: 40, // TitleSection의 높이 + 약간의 마진 아래에 오도록 (조정 필요)
          }}>
            식사 추천은 근무 형태에 맞춤으로 제공됩니다.
        </TooltipBubble>
      )}

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