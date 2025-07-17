import { View } from 'react-native';
import TitleSection from '../components/TitleSection';
import ToDoCard from '../components/ToDoCard';
import MemoCard from '../components/MemoCard';

const NoteSection = () => {
  return (
    <View className="flex-col justify-start gap-y-number-7">
      <TitleSection.OnlyTitle title="기록하기" />
      <ToDoCard.Container />
      <MemoCard.Container />
    </View>
  );
};

export default NoteSection;
