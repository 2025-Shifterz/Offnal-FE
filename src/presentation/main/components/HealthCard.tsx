import { View, Text } from 'react-native';
import SneakersIcon from '../../../assets/icons/ic_sneakers_24.svg';
import WeightIcon from '../../../assets/icons/ic_weight_24.svg';

interface HealthCardProps {}

const Walk = () => {
  const weeklySteps = [
    3000, // Day 1
    4500, // Day 2
    2000, // Day 3
    6000, // Day 4
    7421, // Day 5 (Today's value could be the last one, or you can pass it separately)
    1500, // Day 6
    500, // Day 7
  ];

  const maxSteps = Math.max(...weeklySteps);
  const safeMaxSteps = maxSteps === 0 ? 1 : maxSteps;

  return (
    <View className="flex-1 items-start justify-center rounded-lg bg-surface-white px-number-6 py-number-8">
      <View className="mb-number-3 flex-row items-center justify-center">
        <SneakersIcon />
        <Text className="ps-number-3 font-pretendard text-heading-xxxs font-semibold text-text-subtle">
          걸음 수
        </Text>
      </View>

      <Text className="font-pretendard text-heading-s font-semibold text-text-bolder">
        7,421 걸음
      </Text>
      <View className="mb-number-8 flex-row items-center justify-center">
        <Text className="font-pretendard text-label-xxs font-normal text-text-subtle">
          어제 보다
        </Text>
        <Text className="ms-number-2 font-pretendard text-label-xxs font-normal text-text-information">
          ▲ 7,706
        </Text>
      </View>
      <View className="h-number-16 max-w-[88px] flex-row items-end justify-around">
        {weeklySteps.map((steps, index) => (
          <View key={index} className="mx-number-3 flex-1 justify-end rounded-full bg-background-gray-subtle2">
            <View
              className="w-full rounded-full bg-text-primary"
              style={{ height: `${(steps / safeMaxSteps) * 80 + 5}%` }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const Weight = () => {
  return (
    <View className="flex-1 items-start justify-center rounded-lg bg-surface-white px-number-6 py-number-8">
      <View className="mb-number-3 flex-row items-center justify-center">
        <WeightIcon />
        <Text className="ps-number-3 font-pretendard text-heading-xxxs font-semibold text-text-subtle">
          몸무게 기록
        </Text>
      </View>

      <Text>50kg</Text>
    </View>
  );
};

export default { Walk, Weight };
