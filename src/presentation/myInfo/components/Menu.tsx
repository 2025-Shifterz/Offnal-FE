import { View, Text, TouchableOpacity } from 'react-native';

type MenuItemProps = {
  menuTitle: string;
  onPress: () => void;
};

type MenuHeaderProps = { headerTitle: string };

const Header = ({ headerTitle }: MenuHeaderProps) => {
  return (
    <View className="w-full flex-1 justify-start px-number-8 py-number-5">
      <Text className="font-pretendard text-body-xxs font-medium text-text-subtle">
        {headerTitle}
      </Text>
    </View>
  );
};

const Item = ({ menuTitle, onPress }: MenuItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-full flex-1 justify-start px-number-8 py-number-5">
        <Text className="font-pretendard text-body-xs font-medium text-text-basic">
          {menuTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default { Header, Item };
