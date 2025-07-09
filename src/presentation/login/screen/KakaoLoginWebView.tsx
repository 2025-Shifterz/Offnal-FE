import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/type';

const REDIRECT_URI = `${API_URL}/callback`;

const KakaoLoginWebView = () => {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
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
  }, []);

  // WebView에서 페이지가 로드될 때 호출
  const handleWebViewLoadEnd = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    // 페이지의 URL이 REDIRECT_URI일 때만 처리
    if (nativeEvent.url.startsWith(REDIRECT_URI)) {
      // WebView에서 페이지의 내용을 가져와서 JSON 파싱 시도
      nativeEvent.target.injectJavaScript(`
        window.ReactNativeWebView.postMessage(document.body.innerText);
        true;
      `);
    }
  };

  // WebView에서 메시지 수신 시 호출
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.code === 'LOGIN_SUCCESS') {
        // 로그인 성공 시 다음 화면으로 이동
        navigation.replace('SelectRegMethod');
      } else {
        Alert.alert('로그인 실패', data.message || '알 수 없는 오류');
        navigation.goBack();
      }
    } catch (e) {
      // JSON 파싱 실패 시 무시
    }
  };

  if (!loginUrl) {
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
        onLoadEnd={handleWebViewLoadEnd}
        onMessage={handleWebViewMessage}
        startInLoadingState
        javaScriptEnabled
        className="flex-1"
      />
    </SafeAreaView>
  );
};

export default KakaoLoginWebView;
