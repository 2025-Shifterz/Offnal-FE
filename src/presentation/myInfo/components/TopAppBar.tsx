import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/type';

import ArrowBack from '../../../assets/icons/arrow_left.svg';

type TopBarProps = {
  title: string;
  enableNavigationBtn: boolean;
};

const TopAppBar = ({ title, enableNavigationBtn }: TopBarProps) => {
  const navigation = useNavigation();

  return (
    <View className="h-[50px] w-full items-center justify-center">
      {enableNavigationBtn && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-number-8 h-6 w-6 items-center justify-center"
        >
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
      )}
      <Text className="font-pretendard text-heading-xs font-semibold leading-[1.2] tracking-letter-spacing-0 text-text-basic">
        {title}
      </Text>
    </View>
  );
};

export default TopAppBar;
