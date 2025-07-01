import { Text, TouchableOpacity } from 'react-native';
// import KakaoLogo from '../../../assets/images/kakao_log.svg';

const KaKaoLoginBtn = () => {
  return (
    <TouchableOpacity className="mb-[16.25px] ml-[30px] mr-[30px] h-[45px] w-[299.9999px] items-center justify-center rounded-radius-xl bg-kakao-bg">
      <Text className="pl-[86px] pr-[86px] font-pretendard text-heading-xxs font-bold tracking-letter-spacing-0 text-kakao-text">
        {/* <KakaoLogo width={18} height={18} /> */}
        카카오 로그인
      </Text>
    </TouchableOpacity>
  );
};
export default KaKaoLoginBtn;
