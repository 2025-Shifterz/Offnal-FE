import { Text, View } from 'react-native';
import Camera from '../../../assets/icons/camera.svg';
import CalendarYellow from '../../../assets/icons/calendar_yellow.svg';
import CalendarBlue from '../../../assets/icons/calendar_blue.svg';
import RegMethod from '../components/RegMethod';
import { useNavigation } from '@react-navigation/native';
import { loginNavigation } from '../../../navigation/types';

const ScheduleRegRegisterMethod = () => {
  const navigation = useNavigation<loginNavigation>();

  return (
    <View className="h-full w-full flex-1 items-center px-p-6">
      <View className="bg-background-gray-subtle1">
        <Text className="mt-[57px] font-pretendard text-heading-m font-semibold leading-[1.4] tracking-letter-spacing-0 text-text-bolder">
          오프날에 오신걸 환영해요!{`\n`}근무표를 어떤 방법으로 입력할까요?
        </Text>
        <Text className="mb-number-9 pt-number-7 font-pretendard text-label-xs font-regular leading-[1.2] tracking-letter-spacing-0 text-text-subtle">
          회사 근무표 검색 기능은 추후 추가될 예정이에요.
        </Text>

        <RegMethod
          Icon={Camera}
          title="근무표 사진 찍어서 자동 등록하기"
          subtitle="사진 찍기 또는 앨범에서 선택해 AI로 근무표를 자동 등록해요"
          // TODO: 이동 화면 수정 예정
          onPress={() => navigation.navigate('Login')}
        />

        <RegMethod
          Icon={CalendarYellow}
          title="근무표 새로 만들기"
          subtitle="지금 바로 직접 근무표를 만들고 시작해요"
          // TODO: 이동 화면 수정 예정
          onPress={() => navigation.navigate('OnboardingSchedules')}
        />

        <RegMethod
          Icon={CalendarBlue}
          title="근무표 없이 시작하기"
          subtitle="지금은 근무표 없이 시작하고, 나중에 등록할 수 있어요"
          // TODO: 이동 화면 수정 예정
          onPress={() => navigation.navigate('Login')}
        />

        {/* TODO: "다음" 공통 컴포넌트 추가하기 */}
      </View>
    </View>
  );
};

export default ScheduleRegRegisterMethod;
