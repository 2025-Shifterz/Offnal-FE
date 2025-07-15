import { Dimensions, View } from 'react-native';
import BackGroundAfterNoon from '../../../assets/cards/bg_afternoon.svg';

const { width: screenWidth } = Dimensions.get('window');

const TopCard = () => {
  return (
    <View className="w-screen items-center overflow-hidden">
      <BackGroundAfterNoon width={screenWidth}  preserveAspectRatio="xMidYMid slice" />
    </View>
  );
};

export default TopCard;
