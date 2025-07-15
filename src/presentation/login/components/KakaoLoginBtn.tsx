import { Text, TouchableOpacity } from 'react-native';
import KakaoLogo from '../../../assets/icons/kakao_logo.svg';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/type';

const KaKaoLoginBtn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleKakaoLogin = async () => {
    navigation.navigate('KakaoWebView');
  };

  return (
    <TouchableOpacity
      onPress={handleKakaoLogin}
      className="mx-gap-5 w-fill mb-number-8 h-12 flex-row items-center justify-center rounded-radius-m1 bg-kakao-bg pl-[14px] pr-[14px]"
    >
      <KakaoLogo />
      <Text className="px-[86px] font-pretendard text-heading-xxs font-semibold tracking-letter-spacing-0 text-kakao-text">
        카카오 로그인
      </Text>
    </TouchableOpacity>
  );
};
export default KaKaoLoginBtn;
