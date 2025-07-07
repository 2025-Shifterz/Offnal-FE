import React from 'react';
import { Text, View } from 'react-native';

const TeamItem = ({ children }: { children: string }) => {
  return (
    <View className="rounded-radius-max border border-border-gray-light px-[14px] py-[8px]">
      <Text className="text-label-xs text-text-disabled">{children}</Text>
    </View>
  );
};

export default TeamItem;
