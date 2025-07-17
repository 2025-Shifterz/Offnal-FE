import React from 'react';
import { Text, View } from 'react-native';

import CalendarIcon from '../../../assets/icons/calendar.svg';
import ArrowLeft from '../../../assets/icons/black-arrow-l.svg';
import ArrowRight from '../../../assets/icons/black-arrow-r.svg';

const arrowStyle = 'size-[24px] items-center justify-center rounded-radius-max bg-surface-white';

const DayBoxHeader = () => {
  return (
    <View className="flex-row items-center justify-between bg-surface-primary-subtle px-p-6 py-p-3">
      <View className={arrowStyle}>
        <ArrowLeft />
      </View>
      <View className="flex-row items-center gap-[5px] rounded-radius-max bg-surface-white px-[10px] py-[8px]">
        <CalendarIcon />
        <Text className="text-heading-xxxs font-semibold leading-5 text-text-subtle">오늘</Text>
      </View>
      <View className={arrowStyle}>
        <ArrowRight />
      </View>
    </View>
  );
};

export default DayBoxHeader;
