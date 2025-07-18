import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ArrowLeft from '../../../assets/icons/black-arrow-l.svg';
import ArrowRight from '../../../assets/icons/black-arrow-r.svg';
const arrowStyle = 'size-[24px] items-center justify-center rounded-radius-max bg-surface-white';

const EditScreenHeader = () => {
  return (
    <View className="flex-row items-center gap-[10px]">
      <TouchableOpacity className={arrowStyle}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text className="text-body-s text-text-basic">7월</Text>
      <TouchableOpacity className={arrowStyle}>
        <ArrowRight />
      </TouchableOpacity>
    </View>
  );
};

export default EditScreenHeader;
