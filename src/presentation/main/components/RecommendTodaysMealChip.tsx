import { View } from 'react-native';
import BowlIcon from '../../../assets/icons/ic_bowl_28.svg';
import EggIcon from '../../../assets/icons/ic_egg_28.svg';
import FriedEggIcon from '../../../assets/icons/ic_fried_egg_28.svg';
import LunchBoxIcon from '../../../assets/icons/ic_lunch_box_28.svg';
import MoonIcon from '../../../assets/icons/ic_moon_28.svg';
import PhoIcon from '../../../assets/icons/ic_pho_28.svg';
import RiceIcon from '../../../assets/icons/ic_rice_28.svg';
import SweetPotatoIcon from '../../../assets/icons/ic_sweet_potato_28.svg';
import { Text } from 'react-native';

enum MealType {
  PRE_WORK_SNACK = 'PRE_WORK_SNACK',
  IN_WORK_SNACK = 'IN_WORK_SNACK',
  POST_WORK_LIGHT_MEAL = 'POST',
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

interface RecommendTodaysMealProps {
  mealType: MealType;
  slot: string;
  time: string;
  mealContent: string;
  description: string;
}

const RecommendTodaysMealChip: React.FC<RecommendTodaysMealProps> = ({
  mealType,
  slot,
  time,
  mealContent,
  description,
}) => {
  const MealIconComponent = () => {
    switch (mealType) {
      case MealType.BREAKFAST:
        return <EggIcon />;
      case MealType.PRE_WORK_SNACK:
        return <SweetPotatoIcon />;
      case MealType.IN_WORK_SNACK:
        return <MoonIcon />;
      case MealType.POST_WORK_LIGHT_MEAL:
        return <PhoIcon />;
      case MealType.LUNCH:
        return <LunchBoxIcon />;
      case MealType.DINNER:
        return <RiceIcon />;
    }
  };

  return (
    <View className="flex-col items-start justify-center rounded-radius-s bg-surface-white px-number-6 py-number-5 shadow-shadow-blur-3">
      <View className="mb-number-6 flex-row items-center justify-center gap-g-3">
        <MealIconComponent />
        <View className="flex-col items-start justify-center">
          <Text className="font-pretendard text-body-xxs font-semibold text-text-subtle">{slot}</Text>
          <Text className="font-pretendard text-body-xxs font-medium text-text-subtle">
            {time}
          </Text>
        </View>
      </View>
      <Text className="font-pretendard text-body-xxs font-medium text-text-subtle">
        {description}
      </Text>
      <Text className="pt-number-2 font-pretendard text-heading-xxxs font-semibold text-text-basic">
        {mealContent}
      </Text>
    </View>
  );
};

export { MealType };
export default RecommendTodaysMealChip;
