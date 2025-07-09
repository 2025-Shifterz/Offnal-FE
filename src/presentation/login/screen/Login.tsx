import axios from 'axios';
import { API_URL } from '@env';
import { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { Text, View, Dimensions, Linking, Alert } from 'react-native';

import KaKaoLoginBtn from '../components/KakaoLoginBtn';
import { onboardingList } from '../constants/onboarding';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/type';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [slideTime, setSlideTime] = useState(5); // 초기 슬라이딩 시간 3초

  return (
    <View className="w-full flex-1 bg-background-gray-subtle1">
      <Swiper
        autoplay
        showsPagination={false}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT * 0.7}
        autoplayTimeout={slideTime}
      >
        {onboardingList.map((onboarding, index) => (
          <View
            key={index}
            className="mt-number-18 flex-1 items-center"
            style={{ width: SCREEN_WIDTH }}
          >
            <Text className="mb-number-8 mt-number-18 h-fit w-fit gap-number-6 rounded-radius-m1 border-border-width-static-regular border-border-gray-light bg-surface-white p-p-3 text-center font-pretendard text-body-xxs font-medium leading-[1.2] text-text-subtle">
              {onboarding.keyword}
            </Text>
            <Text className="mb-number-4 h-fit w-fit text-center font-pretendard text-heading-s font-semibold leading-[1.2] tracking-letter-spacing-0">
              {onboarding.title}
            </Text>
            <Text className="mb-number-16 h-fit w-fit text-center font-pretendard text-body-xs font-medium leading-[1.2] tracking-letter-spacing-0 text-text-subtle">
              {onboarding.subtitle}
            </Text>

            {/* 임시 코드(Lottie 들어갈 자리) */}
            <View className="h-[180px] w-[180px] rounded-radius-l bg-surface-white shadow-shadow-y-4 shadow-alpha-shadow2">
              <Text className="font-pretendard">LOTTIE</Text>
              {/* LottieView로 넣을 예정(따로 만들어서 컴포넌트 하나로 넣을 예정) */}
            </View>
          </View>
        ))}
      </Swiper>

      <View className="flex items-center justify-center">
        <KaKaoLoginBtn />

        {/* 아래도 터치 가능하게 */}
        <Text className="pb-number-3 font-pretendard text-label-xs font-regular leading-[1.2] tracking-letter-spacing-0 text-text-subtle">
          이용약관 확인하기
        </Text>
        <Text className="pb-number-10 font-pretendard text-label-xs font-regular leading-[1.2] tracking-letter-spacing-0 text-text-subtle">
          개인정보처리방침 확인하기
        </Text>
      </View>
    </View>
  );
};
export default LoginScreen;
