import React from 'react';
import { Text, View } from 'react-native';

// 타입정의
interface TitleMessageProps {
  title: string;
  subTitle?: string;
}

const TitleMessage = ({ title, subTitle }: TitleMessageProps) => {
  return (
    <View className="mt-[5px] flex-col gap-[12px]">
      <Text className="text-heading-m font-semibold leading-[1.4] text-text-bolder">{title}</Text>
      {subTitle && <Text className="text-label-xs text-text-subtle">{subTitle}</Text>}
    </View>
  );
};

export default TitleMessage;
