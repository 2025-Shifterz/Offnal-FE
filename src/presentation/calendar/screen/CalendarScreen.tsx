import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import NoCalendar from '../component/NoCalendar';
import HasCalendar from '../component/HasCalendar';
import { View } from 'react-native';
import PlusEdit from '../component/PlusEdit';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CalendarScreenStackParamList } from '../../../navigation/types';

const CalendarScreen = () => {
  const route = useRoute<RouteProp<CalendarScreenStackParamList, 'CalendarScreen'>>();

  const noCalendar = route.params?.noCalendar ?? false;
  const [showPlus, setShowPlus] = useState(false);

  return (
    <View className="flex-1">
      {noCalendar && <NoCalendar />}
      <SafeAreaView edges={['top']} className="relative h-full flex-1 bg-surface-white">
        {/* 등록된 캘린더가 있고, 팀 캘린더인지 */}
        <HasCalendar setShowPlus={setShowPlus} />
      </SafeAreaView>
      {showPlus && <PlusEdit setShowPlus={setShowPlus} />}
    </View>
  );
};

export default CalendarScreen;
