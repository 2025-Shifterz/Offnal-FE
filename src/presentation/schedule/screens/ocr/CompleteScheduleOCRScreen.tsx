import { View, Text, Alert } from 'react-native';
import { CalendarEditorRef } from '../../../calenderType/components/calendar/personal/CalendarEditor';
import { useRef } from 'react';
import { onboardingNavigation, OnboardingStackParamList } from '../../../../navigation/types';

const EditCompleteCreateScheduleOCRScreen = () => {
  const calendarEditorRef = useRef<CalendarEditorRef>(null);

  return (
    <View className="flex-1 bg-background-gray-subtle1 px-number-8">
      <Text className="mt-[5px] text-heading-m font-semibold text-text-subtle">
        AI 근무표 인식이 완료되었어요
      </Text>
      <Text className="text-lable-xs pt-number-7 font-medium text-text-subtle">
        정확히 인식되지 않은 부분을 수정해 주세요
      </Text>

    </View>
  );
};

export default EditCompleteCreateScheduleOCRScreen;
