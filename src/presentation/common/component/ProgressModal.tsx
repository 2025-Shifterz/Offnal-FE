import { Modal, Text, View } from 'react-native';
import ModalIcon from '../../../assets/icons/ic_dialog_logo.svg';

interface ProgressModalProps {
  isVisible: boolean;
}

const ProgressModal = ({ isVisible }: ProgressModalProps) => {
  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <View className="flex-1 items-center justify-center bg-alpha-inverse50">
        <View className='items-center justify-center bg-surface-inverse px-[35px] py-[20px] rounded-xl'>
          <ModalIcon />
          <Text className="mt-[23px] font-pretendard text-heading-xxs font-semibold text-text-basic-inverse">
            AI가 근무표를 변환하고 있어요
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ProgressModal;
