import { Text, View } from 'react-native';
import AppLogo from '../../assets/icons/app_logo.svg';

const onboardingScreen = () => {
  return (
    <View className="h-full w-full flex-1 items-center justify-center bg-background-gray-subtle1">
      <View className="bg-red-300">
        <AppLogo />
        <Text className="text-center font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-white">
          스플래시 스크린
        </Text>
      </View>
    </View>
  );
};

export default onboardingScreen;
