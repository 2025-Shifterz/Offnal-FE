import { View } from 'react-native';
import TitleSection from '../components/TitleSection';
import HealthGuideChip, { HealthGuideType } from '../components/HealthGuideChip';
import { useState } from 'react';
import TooltipBubble from '../components/Tooltip';

interface HealthGuide {
  sleepGuide?: { content?: string; time?: string };
  fastingGuide?: { content?: string; time?: string };
}

interface HealthGuideSectionProps {
  health?: HealthGuide | null;
}

const HealthGuideSection = ({ health }: HealthGuideSectionProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <View className="flex-col justify-start gap-y-number-7">
      <TitleSection.WithTooltipIcon title="오늘의 건강 가이드" onPressIcon={toggleTooltip} />

      {showTooltip && (
        <TooltipBubble
          style={{
            left: '50%',
            transform: [{ translateX: -100 }],
            top: 40,
          }}
        >
          식사 추천은 근무 형태에 맞춤으로 제공됩니다.
        </TooltipBubble>
      )}

      <View className="w-full flex-row items-center gap-g-3">
        <HealthGuideChip
          healthGuideType={HealthGuideType.SLEEP}
          guideContent={health?.sleepGuide?.content ?? ''}
          guideTime={health?.sleepGuide?.time ?? ''}
        />
        <HealthGuideChip
          healthGuideType={HealthGuideType.FASTING_TIME}
          guideContent={health?.fastingGuide?.content ?? ''}
          guideTime={health?.fastingGuide?.time ?? ''}
        />
      </View>
    </View>
  );
};

export default HealthGuideSection;
