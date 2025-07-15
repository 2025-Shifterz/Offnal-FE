import { ScrollView, View } from 'react-native';
import TitleSection from '../components/TitleSection';
import RecommendTodaysMealChip, { MealType } from '../components/RecommendTodaysMealChip';

const RecommnedMealSection = () => {
  return (
    <View className="mb-number-11 flex-col items-start">
      <TitleSection.OnlyTitle title="오늘의 식사 추천" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="mt-number-7 flex-row items-center gap-g-3">
        <RecommendTodaysMealChip
          mealType={MealType.LUNCH}
          slot="점심"
          time="12:30 경"
          mealContent="현미밥, 생선, 나물"
          description="근무 집중력 유지"
        />
        <RecommendTodaysMealChip
          mealType={MealType.LUNCH}
          slot="점심"
          time="12:30 경"
          mealContent="현미밥, 생선, 나물"
          description="근무 집중력 유지"
        />
        <RecommendTodaysMealChip
          mealType={MealType.LUNCH}
          slot="점심"
          time="12:30 경"
          mealContent="현미밥, 생선, 나물"
          description="근무 집중력 유지"
        />
        <RecommendTodaysMealChip
          mealType={MealType.LUNCH}
          slot="점심"
          time="12:30 경"
          mealContent="현미밥, 생선, 나물"
          description="근무 집중력 유지"
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default RecommnedMealSection;
