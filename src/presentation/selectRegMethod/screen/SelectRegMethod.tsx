import { Text, View } from 'react-native';

const ScheduleRegRegisterMethod = () => {
  return (
    <View className="h-full w-full flex-1 items-center justify-center bg-background-gray-subtle1">
      <View className="bg-red-300">
        <Text className="text-center font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-white">
          근무표 등록 방법 1
        </Text>
        <Text className="text-center font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-white">
          근무표 등록 방법 2
        </Text>
        <Text className="text-center font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-white">
          근무표 등록 방법 3
        </Text>
      </View>
    </View>
  );
};

export default ScheduleRegRegisterMethod;
