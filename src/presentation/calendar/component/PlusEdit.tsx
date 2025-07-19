import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CancelIcon from '../../../assets/icons/w-cancel.svg';
import CameraIcon from '../../../assets/icons/pr-cam.svg';
import PencilIcon from '../../../assets/icons/pr-pencil.svg';
import { useNavigation } from '@react-navigation/native';
import { calendarNavigation } from '../../../navigation/types';
import { Animated } from 'react-native';

// 컴포넌트
type TextButtonProps = {
  text: string;
  onNavPress: () => void;
};
const TextButton = ({ text, onNavPress }: TextButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onNavPress}
      className="rounded-radius-max bg-surface-white px-[9px] py-[6px]"
    >
      <Text className="text-heading-xxxxs font-medium">{text}</Text>
    </TouchableOpacity>
  );
};

// 전체 화면
type PlusEditProps = {
  setShowPlus: (show: boolean) => void;
};

const PlusEdit = ({ setShowPlus }: PlusEditProps) => {
  const navigation = useNavigation<calendarNavigation>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 페이드 인 애니메이션
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100, // 0.25초
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="absolute z-10 h-full w-full flex-1 bg-background-dim"
    >
      <View className="absolute bottom-[13px] right-[13px] w-[189px] flex-col items-end gap-[13px]">
        <View className="flex-row items-center gap-[10px]">
          <TextButton onNavPress={() => {}} text="사진찍어 AI로 근무표 등록" />
          <CameraIcon />
        </View>

        <View className="flex-row items-center gap-[10px]">
          <TouchableOpacity>
            <TextButton
              onNavPress={() => navigation.navigate('EditCalendar')}
              text="근무표 추가 입력 및 수정"
            />
          </TouchableOpacity>
          <PencilIcon />
        </View>

        <View className="w-full items-end">
          <TouchableOpacity
            onPress={() => setShowPlus(false)}
            className="h-[40px] w-[40px] items-center justify-center rounded-radius-max bg-surface-primary"
          >
            <CancelIcon />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default PlusEdit;
