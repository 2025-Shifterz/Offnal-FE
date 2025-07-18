import { View, Text, Alert, ScrollView } from 'react-native';
import CalendarEditor, {
  CalendarEditorRef,
} from '../../../calenderType/components/calendar/personal/CalendarEditor';
import { useRef } from 'react';
import { onboardingNavigation, OnboardingStackParamList } from '../../../../navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createMonthlyShiftsMap } from '../../../../data/mapper/Mapper';
import BottomButton from '../../../common/component/BottomButton';

import { workCalendarRepository } from '../../../../di/Dependencies';
import { NewCalendar } from '../../../../data/model/Calendar';
import TCalendarEditor from '../../../calenderType/components/calendar/team/TCalendarEditor';

type ScheduleTypeRouteProp = RouteProp<OnboardingStackParamList, 'EditCompleteCreateScheduleOCR'>;

const EditCompleteCreateScheduleOCRScreen = () => {
  const route = useRoute<ScheduleTypeRouteProp>();
  const navigation = useNavigation<onboardingNavigation>();
  const { selectedBoxId, calendarName, workGroup, workTimes, ocrResult, year, month } =
    route.params;

  const map = createMonthlyShiftsMap(ocrResult);

  console.log('selectedBoxId:', selectedBoxId);
  console.log('calendarName:', calendarName);
  console.log('workGroup:', workGroup);
  console.log('workTimes:', workTimes);
  console.log('year:', year);
  console.log('month:', month);
  console.log('ocrResult:', ocrResult);

  console.log('SHIFTMAP:', map);

  const handleNext = () => {
    try {
      const newCalendar: NewCalendar = {
        name: calendarName,
        group: workGroup,
        schedules: [],
        shiftTimes: new Map(),
      };

      workCalendarRepository.createWorkCalendar(newCalendar);

      navigation.navigate('CompleteCreate');
    } catch (error) {
      Alert.alert('오류', '근무표 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const calendarEditorRef = useRef<CalendarEditorRef>(null);

  return (
    <View className="flex-1 bg-background-gray-subtle1 px-number-8">
      <ScrollView>
        <Text className="mt-[5px] text-heading-m font-semibold text-text-subtle">
          AI 근무표 인식이 완료되었어요
        </Text>
        <Text className="text-lable-xs pt-number-7 font-medium text-text-subtle">
          정확히 인식되지 않은 부분을 수정해 주세요
        </Text>
        <View className="mt-[20px]">
          {selectedBoxId === 1 ? (
            <TCalendarEditor
              calendarName={calendarName}
              workGroup={workGroup}
              workTimes={workTimes}
            />
          ) : (
            <CalendarEditor
              ref={calendarEditorRef}
              calendarName={calendarName}
              workGroup={workGroup}
              workTimes={workTimes}
            />
          )}
        </View>
      </ScrollView>

      <View>
        <BottomButton text="다음" onPress={handleNext} />
      </View>
    </View>
  );
};

export default EditCompleteCreateScheduleOCRScreen;
