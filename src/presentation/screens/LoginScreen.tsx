// import {useState} from 'react';
// import axios from 'axios';
// import {API_URL} from '@env';

import { Text, View } from 'react-native';
import KaKaoLoginBtn from '../components/Login/KakaoLoginBtn';

const LoginScreen = () => {
  //   const apiUrl = import.meta.env.API_URL;
  //   const [kakaoUrl, setKakaoUrl] = useState('');

  //   const handleKakaoLogin = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/login/page`);
  //       setKakaoUrl(response);
  //     } catch (error) {}
  //   };

  return (
    <View className="flex-1 items-center justify-center bg-background-gray-subtle1">
      <Text className="mb-[16.25px] ml-[120px] mr-[120px] mt-[70.5px] h-fit w-fit gap-number-6 rounded-radius-m1 border-border-width-static-regular border-border-gray-light bg-surface-white p-p-3 text-center font-pretendard text-body-xxs text-text-subtle">
        근무 인식 & 루틴 자동화
      </Text>
      <Text className="mb-[5.25px] h-fit w-fit text-center font-pretendard text-heading-s font-semibold tracking-letter-spacing-0">
        교대 근무표를 등록하면{'\n'}하루 루틴 자동 생성
      </Text>
      <Text className="mb-[47px] h-fit w-fit text-center font-pretendard text-body-xs font-medium tracking-letter-spacing-0 text-text-subtle">
        교대 근무 패턴에 맞춘 수면•식사•운동 추천까지 한 번에
      </Text>

      {/* 임시 코드(Lottie 들어갈 자리) */}
      <View className="mb-[94.5px] h-[277.5px] w-[309px] rounded-radius-l bg-surface-white shadow-shadow-y-4 shadow-alpha-shadow2">
        <Text className="ml-[20.97px] mt-[17px] font-pretendard">LOTTIE</Text>
      </View>
      {/* 임시 코드 */}

      <KaKaoLoginBtn />

      <Text className="mb-[3.75px] font-pretendard text-label-xs font-regular tracking-letter-spacing-0 text-text-subtle">
        이용약관 확인하기
      </Text>
      <Text className="font-pretendard text-label-xs font-regular tracking-letter-spacing-0 text-text-subtle">
        개인정보처리방침 확인하기
      </Text>
    </View>
  );
};
export default LoginScreen;
