import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import CalendarEditor from '../../calenderType/components/calendar/personal/CalendarEditor';
import CalendarBase from '../../calenderType/components/calendar/personal/CalendarBase';
import dayjs from 'dayjs';
import { TimeFrameChildren } from '../../calenderType/components/TimeFrame';
import EditScreenHeader from '../components/EditScreenHeader';
import CalendarViewer from '../../calenderType/components/calendar/personal/CalendarViewer';
import SuccessIcon from '../../../assets/icons/g-success.svg';
import BottomSheet from '../components/BottomSheet';

const CalendarEditScreen = () => {
  const [calendarData, setCalendarData] = useState<Record<string, TimeFrameChildren>>({});
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 바텀 시트 보여주기
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  return (
    <SafeAreaView className="flex-1">
      {/* 헤더 */}
      <View className="w-full gap-[5px] bg-surface-information-subtle px-p-6 py-[14px]">
        <View className="flex-row justify-between">
          <Text className="text-heading-xs font-semibold text-text-information">
            근무표 수정 모드
          </Text>
          <EditScreenHeader />
        </View>
        <Text className="text-body-xs font-medium text-text-subtle">
          날짜를 탭하여 근무 형태를 변경하세요.
        </Text>
      </View>

      {/* 캘린더 */}
      <View className="mx-[16px] mt-[10px] overflow-hidden rounded-radius-xl border border-[3px] border-surface-information-subtle">
        <CalendarViewer isEditScreen={true} />
      </View>

      {/* 모든 수정 완료 버튼 */}
      <TouchableOpacity
        onPress={() => {
          setShowBottomSheet(true);
        }}
        className="absolute bottom-[13px] right-[13px] h-[40px] w-[40px] items-center justify-center rounded-radius-max bg-success-40"
      >
        <SuccessIcon />
      </TouchableOpacity>
      {showBottomSheet && <BottomSheet />}
    </SafeAreaView>
  );
};

export default CalendarEditScreen;
