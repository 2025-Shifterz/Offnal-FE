import { useEffect } from 'react';
import { Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';

// import AppLogo from '../../assets/icons/app_logo.svg'; // 사용 예정(아마 사용 안할듯)
// import LottieSplash from '../../assets/lottie/splash.json'; // 사용 예정

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await EncryptedStorage.getItem('accessToken');
        const targetRoute = token ? 'Tabs' : 'LoginScreens';

        navigation.reset({
          index: 0,
          routes: [{ name: targetRoute }],
        });
      } catch (error) {
        console.error('Token 확인 중 오류 발생:', error);
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-background-gray-subtle1">
      <View className="bg-red-300">
        {/* <AppLogo /> */}
        <Text className="text-center font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-white">
          스플래시 스크린
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
