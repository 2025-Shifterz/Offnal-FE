import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectMonthWithOCRScreen = () => {
  return (
    <View className="flex-1 bg-background-gray-subtle1 px-">
      <SafeAreaView className="flex-1 px-number-8">
        <Text className="text-start text-heading-m font-semibold">
          인식할 근무표를 등록해주세요.
        </Text>
      </SafeAreaView>

    </View>
  );
};

export default SelectMonthWithOCRScreen;
