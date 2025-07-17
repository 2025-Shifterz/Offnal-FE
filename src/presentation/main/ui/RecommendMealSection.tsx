import { ScrollView, View } from 'react-native';
import TitleSection from '../components/TitleSection';
import RecommendTodaysMealChip, { MealType } from '../components/RecommendTodaysMealChip';

interface Meal {
  mealType: string;
  slot: string;
  time: string;
  mealContent: string;
  description: string;
}

interface RecommendMealSectionProps {
  meals: Meal[];
}

const RecommnedMealSection = ({ meals }: RecommendMealSectionProps) => {
  return (
    <View className="mb-number-11 flex-col items-start">
      <TitleSection.OnlyTitle title="오늘의 식사 추천" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="mt-number-7 flex-row items-center gap-g-3">
          {meals && meals.length > 0 ? (
            meals.map((meal: Meal, idx: number) => (
              <RecommendTodaysMealChip
                key={idx}
                mealType={meal.mealType as MealType}
                slot={meal.slot}
                time={meal.time}
                mealContent={meal.mealContent}
                description={meal.description}
              />
            ))
          ) : (
            <View>
              <TitleSection.OnlyTitle title="추천 식사가 없습니다." />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecommnedMealSection;
