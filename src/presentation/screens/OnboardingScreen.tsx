import { Text, View } from 'react-native';
import AppLogo from '../../assets/icons/app_logo.svg';

const onboardingScreen = () => {
  return (
    <View className="h-full w-full flex-1 items-center justify-center bg-background-gray-subtle1">
      <View className="bg-red-300">
        <AppLogo />
        <Text className="text-center font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-white">
          더 나은 오프날을 위한{'\n'}종합 교대근무 루틴 매니저
        </Text>
      </View>
    </View>
  );
};

export default onboardingScreen;
