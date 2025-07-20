import { useNavigation } from '@react-navigation/native';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { calendarNavigation } from '../../../navigation/types';
import CalendarViewer from '../../calenderType/components/calendar/personal/CalendarViewer';
import TCalendarViewer from '../../calenderType/components/calendar/team/TCalendarViewer';
import { useEffect, useRef, useState } from 'react';
import PlusIcon from '../../../assets/icons/w-plus.svg';
import BottomSheetWrapper from '../../common/component/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import TimeFrame from '../../calenderType/components/TimeFrame';
import ToDoCard from '../../main/components/ToDoCard';
import MemoCard from '../../main/components/MemoCard';
import { Todo } from '../../../domain/entities/Todo';
import { memoRepository, todoRepository } from '../../../di/Dependencies';

interface HasCalendarProps {
  setShowPlus: (value: boolean) => void;
}

const HasCalendar = ({ setShowPlus }: HasCalendarProps) => {
  const navigation = useNavigation<calendarNavigation>();
  const [isTeamView, setIsTeamView] = useState(false);

  // 노트
  const [memos, setMemo] = useState<Todo[]>();
  const [todos, setTodo] = useState<Todo[]>();
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const memos = await memoRepository.getMemosByDate(dayjs());
        const todos = await todoRepository.getToDosByDate(dayjs());
        setMemo(memos);
        setTodo(todos);
      } catch (error) {
        console.error('노트 데이터 불러오기 실패:', error);
      }
    };
    fetchHome();
  }, []);

  // 선택된 날짜. // 상위에서 받기..
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const formattedDate = selectedDate ? selectedDate.format('DD. dd') : '날짜 없음';

  // 바텀시트 Ref
  const sheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = (date: dayjs.Dayjs) => {
    console.log('바텀시트 열기 함수 실행됨.');
    setSelectedDate(date);
    sheetRef.current?.expand(); // 바텀 시트 열기
  };

  return (
    <View className="h-full flex-1 px-[16px]">
      <ScrollView className="h-full flex-1">
        {/* 팀 캘린더인지 */}
        {isTeamView ? (
          <TCalendarViewer
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
              console.log('클릭됨');
            }}
            onPressEditIcon={() => {
              navigation.navigate('OnboardingSchedules', { screen: 'InfoEdit' });
            }}
          />
        ) : (
          <CalendarViewer
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onDateSelected={openBottomSheet} // ✅ 날짜 선택 시 바텀시트 열기
            onPressTeamIcon={() => {
              setIsTeamView(!isTeamView);
            }}
            onPressEditIcon={() => {
              navigation.navigate('OnboardingSchedules', { screen: 'InfoEdit' });
            }}
          />
        )}

        <View className="items-center justify-center bg-surface-white">
          <Button
            title="일정 등록 시작"
            onPress={() => navigation.navigate('OnboardingSchedules')}
          />
          <Button title="로그인 시작" onPress={() => navigation.navigate('LoginScreens')} />
        </View>
      </ScrollView>
      {/* { + } 버튼 동작 화면 */}
      <TouchableOpacity
        onPress={() => {
          setShowPlus(true);
        }}
        className="absolute bottom-[13px] right-[13px] h-[40px] w-[40px] items-center justify-center rounded-radius-max bg-surface-inverse"
      >
        <PlusIcon />
      </TouchableOpacity>
      <Text>여기에 바텀시트</Text>
      <BottomSheetWrapper ref={sheetRef} handleStyle={{ backgroundColor: '#F4F5F6' }}>
        <View className="flex-1 gap-[11px] bg-surface-gray-subtle1 px-[16px] pt-[12px]">
          <View className="flex-row items-center gap-[8px]">
            <Text className="w-[42px] text-heading-xxs font-semibold text-text-bolder">
              {formattedDate}
            </Text>
            <Text className="text-[10px] font-medium text-text-subtle-inverse">음력 05.03</Text>
            <TimeFrame text="주간" />
          </View>
          <ToDoCard.Container todos={todos ?? []} />
          <View className="mt-[-30px]">
            <MemoCard.Container memos={memos ?? []} />
          </View>
        </View>
      </BottomSheetWrapper>
    </View>
  );
};

export default HasCalendar;
