import { View, Text } from 'react-native';

import TitleSection from './TitleSection';
import CheckListIcon from '../../../assets/icons/ic_checklist_24.svg';
import { useNavigation } from '@react-navigation/native';

const Container = () => {
  const navigation = useNavigation();
  return (
    <View className="my-number-8 flex-col justify-start gap-y-number-7 rounded-lg bg-background-white p-number-6">
      <View className="mb-number-3 flex-row items-center justify-start">
        <CheckListIcon />
        <TitleSection.WithAddableBtn
          title="할 일"
          btnContent="할 일 추가"
          onPressIcon={() => navigation.navigate('Todo')}
        />
      </View>
      <Nothing />
    </View>
  );
};

const Nothing = () => {
  return (
    <View className="flex-col items-center justify-center rounded-lg bg-background-gray-subtle1 py-number-9">
      <Text className="font-pretendard text-body-xxs font-medium text-text-disabled">
        아직 등록된 할일이 없습니다.
      </Text>
      <Text className="font-pretendard text-body-xxs font-medium text-text-disabled">
        근무일정에 따른 할 일 리스트를 만들어보세요.
      </Text>
    </View>
  );
};

export default { Nothing, Container };
