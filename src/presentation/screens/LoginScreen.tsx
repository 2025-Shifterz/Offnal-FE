import { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { API_URL } from '@env';

import { Text, View, Dimensions, Linking, Alert } from 'react-native';
import KaKaoLoginBtn from '../components/Login/KakaoLoginBtn';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LoginScreen = () => {
  const [slideTime, setSlideTime] = useState(3); // 초기 슬라이딩 시간 3초

  useEffect(() => {
    const autoTimer = setTimeout(() => setSlideTime(5), 3000); // 3초 후에 slideTime을 5초로 바꾸고
    return () => clearTimeout(autoTimer);
  }, []);

  useEffect(() => {
    const handleUrl = async ({ url }: { url: string }) => {
      const parsed = new URL(url);
      const code = parsed.searchParams.get('code');
      if (code) {
        try {
          await axios.get(`${API_URL}/callback`, {
            params: { code },
          });
        } catch (err) {
          Alert.alert('콜백 에러', '인가 코드 전달 실패');
        }
      }
    };

    const listener = Linking.addEventListener('url', handleUrl);

    return () => {
      listener.remove();
    };
  }, []);

  const onboardings = [
    {
      keyword: '근무 인식 & 루틴 자동화',
      title: '교대 근무표를 등록하면\n하루 루틴 자동 생성',
      subtitle: '교대 근무 패턴에 맞춘 수면•식사•운동 추천까지 한 번에',
    },
    {
      keyword: 'AI 근무표 인식',
      title: '사진 찍으면 AI가\n복잡한 근무표 자동 등록',
      subtitle: '교대근무 일정과 메모, 할 일을 한 눈에 보이게',
    },
    {
      keyword: '팀 기반 관리 및 공유',
      title: '팀원들과 근무 일정도\n소통도 함께',
      subtitle: '교대근무 일정을 팀에서 쉽게 공유하고 조율',
    },
  ];

  return (
    <View className="w-full flex-1 bg-background-gray-subtle1">
      <Swiper
        autoplay
        showsPagination={false}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT * 0.6}
        autoplayTimeout={slideTime}
      >
        {onboardings.map((onboarding, index) => (
          <View
            key={index}
            className="flex-1 items-center justify-center"
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
              {/* LottieView로 넣을 예정(따로 만들어서 컴포넌트 하나로 넣는게 좋을듯) */}
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
