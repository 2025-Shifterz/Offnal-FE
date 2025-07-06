import { View, Text } from 'react-native';

import TitleSection from './TitleSection';
import NoteIcon from '../../../assets/icons/ic_note_24.svg';

const Container = () => {
  return (
    <View className="my-number-8 flex-col justify-start gap-y-number-7 rounded-lg bg-background-white p-number-6">
      <View className="mb-number-3 flex-row items-center justify-start">
        <NoteIcon />
        <TitleSection.WithAddableBtn title="메모" btnContent="메모 추가" onPressIcon={() => {}} />
      </View>
      <Nothing />
    </View>
  );
};

const Nothing = () => {
  return (
    <View className="flex-col items-center justify-center rounded-lg bg-background-gray-subtle1 py-number-9">
      <Text className="font-pretendard text-body-xxs font-medium text-text-disabled">
        아직 등록된 메모가 없습니다.
      </Text>
      <Text className="font-pretendard text-body-xxs font-medium text-text-disabled">
        메모를 등록해주세요.
      </Text>
    </View>
  );
};

export default { Nothing, Container };
