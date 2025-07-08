import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <Text style={{ fontSize: 20 }}>◀️</Text>
    </TouchableOpacity>
  );
};
export default CustomBackButton;
