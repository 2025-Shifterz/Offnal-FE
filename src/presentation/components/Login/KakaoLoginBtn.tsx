import axios from 'axios';
import { API_URL } from '@env';
import { useState, useEffect } from 'react';

import { Text, TouchableOpacity, Dimensions, Linking, Alert } from 'react-native';
import KakaoLogo from '../../../assets/icons/kakao_logo.svg';

const KaKaoLoginBtn = () => {
  const [kakaoUrl, setKakaoUrl] = useState('');

  const handleKakaoLogin = async () => {
    try {
      const response = await axios.get(`${API_URL}/login/page`);
      const { location } = response.data;
      setKakaoUrl(response.data);
      if (location) {
        Linking.openURL(location); // 카카오 인증 페이지로 이동
      } else {
        Alert.alert('오류', '카카오 로그인 URL을 받아오지 못했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '카카오 로그인 요청에 실패했습니다.');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleKakaoLogin}
      className="mx-number-12 mb-number-8 h-12 w-[300px] flex-row items-center justify-center rounded-radius-m1 bg-kakao-bg pl-[14px] pr-[14px]"
    >
      <KakaoLogo />
      <Text className="px-[86px] font-pretendard text-heading-xxs font-semibold tracking-letter-spacing-0 text-kakao-text">
        카카오 로그인
      </Text>
    </TouchableOpacity>
  );
};
export default KaKaoLoginBtn;
