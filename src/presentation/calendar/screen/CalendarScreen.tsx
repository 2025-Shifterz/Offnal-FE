import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import NoCalendar from '../component/NoCalendar';
import HasCalendar from '../component/HasCalendar';
import { View } from 'react-native';
import PlusEdit from '../component/PlusEdit';

const CalendarScreen = () => {
  const [noCalendar, setNoCalendar] = useState(false); // 있다고 가정
  const [showPlus, setShowPlus] = useState(false);

  return (
    <View className="flex-1">
      {noCalendar && <NoCalendar />}
      <SafeAreaView edges={['top']} className="relative h-full flex-1 bg-surface-white">
        {/* 등록된 캘린더가 있고, 팀 캘린더인지 */}
        <HasCalendar setShowPlus={setShowPlus} setNoCalendar={setNoCalendar} />
      </SafeAreaView>
      {showPlus && <PlusEdit setShowPlus={setShowPlus} />}
    </View>
  );
};

export default CalendarScreen;
