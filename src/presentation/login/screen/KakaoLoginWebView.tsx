import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/type';
// 토큰 저장 필요함
// import AsyncStorage from '@react-native-async-storage/async-storage';

const REDIRECT_URI = `${API_URL}/callback`;

const KakaoLoginWebView = () => {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // API 호출 로딩 상태
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await axios.get(`${API_URL}/login/page`);
        setLoginUrl(response.data.location);
      } catch (error) {
        Alert.alert('에러', '로그인 URL을 가져오는 데 실패했습니다.');
        navigation.goBack();
      }
    };

    fetchLoginUrl();
  }, [navigation]);

  // WebView의 URL이 변경될 때마다 호출되는 함수
  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    // 리다이렉트 URL로 이동했는지 확인
    if (url.startsWith(REDIRECT_URI)) {
      // URL에서 'code' 파라미터 추출하기
      const queryString = url.split('?')[1];
      if (!queryString) return;

      const params = queryString.split('&');
      const codeParam = params.find(param => param.startsWith('code='));

      if (codeParam) {
        // WebView의 로딩을 멈추고, API 호출 시작
        const code = codeParam.split('=')[1];
        setIsLoading(true);
        requestToken(code);
      }
    }
  };

  // 추출한 code로 백엔드에 토큰 요청하는 함수
  const requestToken = async (code: string) => {
    try {
      console.log('인가 코드: ', code);
      const response = await axios.get(`${API_URL}/callback`, {
        params: { code },
      });

      if (response.data.code === 'LOGIN_SUCCESS') {
        // 응답 헤더에서 accessToken과 refreshToken 추출하기
        const accessToken = response.headers['authorization'];
        const refreshToken = response.headers['refresh-token'];

        // 토큰 저장 코드
        // if (accessToken) await AsyncStorage.setItem('accessToken', accessToken);
        // if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);

        // 로그인 성공 시 근무표 등록 방법 선택 화면으로 이동
        navigation.replace('SelectRegMethod');
      } else {
        Alert.alert('로그인 실패', response.data.message || '알 수 없는 오류');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Token request failed:', error);
      if (axios.isAxiosError(error)) {
        const code = error.response?.data?.code;
        const message = error.response?.data?.message;

        // 백엔드 에러 응답 기반 Alert
        if (code === 'INVALID_KAKAO_TOKEN') {
          Alert.alert('로그인 에러', message);
        } else if (code === 'FORBIDDEN') {
          Alert.alert('접근 불가', message);
        } else if (code === 'MEMBER_NOT_FOUND') {
          Alert.alert('회원 정보 없음', message);
        } else if (code === 'MEMBER_SAVE_FAILED') {
          Alert.alert('회원 등록 실패', message);
        } else if (code === 'KAKAO_USERINFO_FETCH_FAILED') {
          Alert.alert('카카오 오류', message);
        } else {
          Alert.alert('로그인 에러', message || '서버 내부 오류가 발생했습니다.');
        }
      } else {
        Alert.alert('네트워크 오류', '네트워크 연결을 확인해주세요.');
      }
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로그인 URL을 받아오기 전 또는 토큰 요청 중일 때 로딩 표시
  if (!loginUrl || isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <WebView
        source={{ uri: loginUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState
        javaScriptEnabled
        className="flex-1"
      />
    </SafeAreaView>
  );
};

export default KakaoLoginWebView;
