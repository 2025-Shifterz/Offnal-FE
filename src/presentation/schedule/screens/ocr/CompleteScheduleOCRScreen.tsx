import { View, Text, Alert, ScrollView } from 'react-native';
import CalendarEditor, {
  CalendarEditorRef,
} from '../../../calenderType/components/calendar/personal/CalendarEditor';
import { useRef } from 'react';
import { onboardingNavigation, OnboardingStackParamList } from '../../../../navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createMonthlyShiftsMap, toShiftType } from '../../../../data/mapper/Mapper';
import BottomButton from '../../../common/component/BottomButton';

import { workCalendarRepository } from '../../../../di/Dependencies';
import { MonthlySchedule, NewCalendar, ShiftType } from '../../../../data/model/Calendar';
import TCalendarEditor from '../../../calenderType/components/calendar/team/TCalendarEditor';

type ScheduleTypeRouteProp = RouteProp<OnboardingStackParamList, 'EditCompleteCreateScheduleOCR'>;

const EditCompleteCreateScheduleOCRScreen = () => {
  const route = useRoute<ScheduleTypeRouteProp>();
  const navigation = useNavigation<onboardingNavigation>();
  const { selectedBoxId, calendarName, workGroup, workTimes, ocrResult, year, month } =
    route.params;

  const map = createMonthlyShiftsMap(ocrResult);

  // 만약 내 근무표만 인 경우
  const myWorkSheet = (() => {
    if (selectedBoxId === 2 && ocrResult && Array.isArray(ocrResult)) {
      const foundSheet = ocrResult.find(([workGroupNumber]) => {
        const cleanWorkGroup = workGroup.replace('조', '');
        return workGroupNumber === cleanWorkGroup;
      });
      return foundSheet; // 찾은 시트 또는 undefined 반환
    }
    return undefined;
  })();

  const handleNext = () => {
    try {
      const shiftTimesMap = new Map<ShiftType, { startTime: string; endTime: string }>();

      Object.entries(workTimes).forEach(([type, time]) => {
        const shiftType = toShiftType(type); 
        if (shiftType) {
          shiftTimesMap.set(shiftType, time);
        }
      });

      const monthlySchedules: MonthlySchedule[] = [];

      if (ocrResult && Array.isArray(ocrResult)) {
        if (selectedBoxId === 2) {
          if (myWorkSheet && myWorkSheet.length === 2) {
            const [, shiftsByDay]: [string, Record<string, string>] = myWorkSheet;
            const shiftsMap = new Map<number, ShiftType>();

            Object.entries(shiftsByDay).forEach(([dayStr, ocrShiftType]) => {
              const day = parseInt(dayStr, 10);
              const shift = toShiftType(ocrShiftType);
              if (!isNaN(day) && shift) {
                shiftsMap.set(day, shift);
              }
            });

            console.log(`내 근무표 (${workGroup}) 스케줄 생성:`, shiftsMap);

            monthlySchedules.push({
              year,
              month,
              shifts: shiftsMap,
            });
            console.log(`내 근무표 (${workGroup}) 스케줄 생성:`, monthlySchedules);
          } else {
            Alert.alert(
              '오류',
              `선택된 조 (${workGroup})의 근무표 데이터를 OCR 결과에서 찾을 수 없습니다.`
            );
            return;
          }
        }
      }

       console.log(`내 근무표 (${workGroup}) 스케줄:`, monthlySchedules);

      const newCalendar: NewCalendar = {
        name: calendarName,
        group: workGroup,
        shiftTimes: shiftTimesMap,
        schedules: monthlySchedules,
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
