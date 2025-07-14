import React, { useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import BottomButton from '../../common/component/BottomButton';
import TitleMessage from '../../common/component/TitleMessage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/types';
import CalendarEditor, { CalendarEditorRef } from '../components/CalenderEditor';

const CalendarType = () => {
  const route = useRoute(); // routes.params 접근
  const { calendarName, workGroup, workTimes } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const editorRef = useRef<CalendarEditorRef>(null);

  const handleNext = async () => {
    try {
      // 자식 컴포넌트의 함수 실행
      await editorRef.current?.postData(); // post 요청
      navigation.navigate('CompleteCreate');
      console.log('try 실행됨');
    } catch (error) {
      console.log('근무표 저장 실패', error);
    }
  };

  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <TitleMessage
            title="달력에 근무 형태를 입력해주세요."
            subTitle="각 날짜에 해당하는 근무 유형을 선택해주세요."
          />
          <View className="mt-[20px]">
            <CalendarEditor
              ref={editorRef}
              calendarName={calendarName}
              workGroup={workGroup}
              workTimes={workTimes}
            />
          </View>
          <BottomButton text="다음" onPress={handleNext} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CalendarType;
