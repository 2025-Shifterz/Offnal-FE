import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

type RegMethodProps = {
  Icon: React.FC<SvgProps>;
  title: string;
  subtitle: string;
  onPress: () => void;
};

const RegMethod = ({ Icon, title, subtitle, onPress }: RegMethodProps) => {
  return (
    <TouchableOpacity
      className="w-fill h-h-9 mb-number-7 flex-row items-center gap-number-6 rounded-radius-m2 bg-surface-white p-p-5"
      onPress={onPress}
    >
      <Icon width={32} height={32} className="mr-number-7" />

      <View className="flex-col">
        <Text className="mb-number-4 font-pretendard text-heading-xxs font-semibold leading-[1.2] tracking-letter-spacing-0 text-text-basic">
          {title}
        </Text>
        <Text className="font-pretendard text-label-xxs font-regular leading-[1.2] tracking-letter-spacing-0 text-text-subtle">
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RegMethod;
