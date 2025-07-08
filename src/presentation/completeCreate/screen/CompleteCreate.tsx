import React, { useState } from 'react';
import { Button, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import BottomButton from '../../common/component/BottomButton';
import TitleMessage from '../../common/component/TitleMessage';
import { useNavigation } from '@react-navigation/native';

const CompleteCreate = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-background-gray-subtle1 px-[16px]">
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <TitleMessage
            title="근무표 생성이 완료되었어요."
            subTitle="근무표가 반영된 건강 정보를 홈 화면에서 확인할 수 있어요."
          />
          <BottomButton text="완료" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CompleteCreate;
