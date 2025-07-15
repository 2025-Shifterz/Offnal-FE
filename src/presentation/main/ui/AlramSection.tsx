import { View } from 'react-native';

import TitleSection from '../components/TitleSection';
import AlramCard from '../components/AlramCard';

const AlramSection = () => {
  return (
    <View className="flex-col justify-start gap-y-number-7 my-number-8">
      <TitleSection.WithAddableBtn 
        title="자동알람" 
        btnContent="알람 추가" 
        onPressIcon={() => {}}
        />
      <AlramCard.NothingRegistered />
    </View>
  );
};

export default AlramSection