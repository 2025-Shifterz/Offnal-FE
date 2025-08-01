import { View, Text, TouchableOpacity, Image } from 'react-native';

type ProfileCardProps = {
    name: string,
    onPressEditProfile: () => void
}

const ProfileCard = ({name, onPressEditProfile}: ProfileCardProps) => {
  return (
    <View className="mb-4 flex-row items-center rounded-xl bg-white p-4 shadow-sm">
      <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-surface-gray-subtle2">
        <Image source={require('../../../assets/images/default_profile.png')} className="w-full h-full rounded-full" resizeMode="cover" />
      </View>
      <Text className="flex-1 font-pretendard text-body-s font-medium text-text-basic">
        {name}
      </Text>
      <TouchableOpacity onPress={ onPressEditProfile }>
        <Text className="text-body-xxs font-pretendard text-text-disabled">프로필 수정</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;