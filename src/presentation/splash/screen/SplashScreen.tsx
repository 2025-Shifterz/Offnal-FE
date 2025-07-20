import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAnimationFinish = async () => {
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

  const gradientColors = [
    'rgba(92, 192, 205, 0.1)',
    'rgba(217, 217, 217, 0)',
    'rgba(238, 232, 172, 0.78)',
    'rgba(238, 232, 172, 1)',
  ];

  const gradientLocations = [0, 0.5, 0.76, 1];

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center bg-[#5cc0cd]">
        <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}
          style={styles.gradient}
        />
        <LottieView
          source={require('../../../assets/lottie/SplashScreen.json')}
          autoPlay
          loop={false}
          style={{ width: 200, height: 173 }}
          resizeMode="contain"
          onAnimationFinish={handleAnimationFinish}
        />

        <Text className="mt-[18px] text-center text-heading-xs text-white">
          더 나은 오프날을 위한{'\n'}종합 교대근무 루틴 매니저
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // StyleSheet.absoluteFill을 사용하면 부모 View를 가득 채우는 스타일이 적용됩니다.
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default SplashScreen;
