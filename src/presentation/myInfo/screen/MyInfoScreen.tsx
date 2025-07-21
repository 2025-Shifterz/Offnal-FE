import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopAppBar from '../components/TopAppBar';
import ProfileCard from '../components/ProfileCard';
import { useNavigation } from '@react-navigation/native';

const MyInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-background-gray-subtle1">
      <SafeAreaView className="flex-1">
        <TopAppBar title="내 정보" enableNavigationBtn={false} />
        <ScrollView className="flex-1 px-number-8">
          <ProfileCard
            name="김건우"
            onPressEditProfile={() => {
              navigation.navigate('UpdateMyInfoScreen');
            }}
          />

          <View className="mb-4 rounded-xl bg-white px-number-8 py-number-3 shadow-sm">
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xxs text-text-subtle">이용 안내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xs text-text-basic">공지사항</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xs text-text-basic">현재 버전</Text>
              <Text className="font-pretendard text-body-xxs text-text-disabled">1.0.0</Text>
            </View>
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xs text-text-basic">평가 및 피드백</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4 rounded-xl bg-white px-number-8 py-number-3 shadow-sm">
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xxs text-text-subtle">운영 방침</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-between py-number-6"
              onPress={() => {}}
            >
              <Text className="font-pretendard text-body-xs text-text-basic">이용약관</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-between py-number-6"
              onPress={() => {}}
            >
              <Text className="font-pretendard text-body-xs text-text-basic">
                개인정보 처리 방침
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4 rounded-xl bg-white px-number-8 py-number-3 shadow-sm">
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xxs text-text-subtle">기타</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xs text-text-basic">회원 탈퇴</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-number-6">
              <Text className="font-pretendard text-body-xs text-text-basic">로그아웃</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MyInfoScreen;
