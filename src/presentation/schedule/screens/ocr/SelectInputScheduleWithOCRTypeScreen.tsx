import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NativeModules } from 'react-native';

import RegMethod from '../../../schedule/component/RegMethod';

import TakePicture from '../../../../assets/icons/ic_camera_32.svg';
import OpenGallery from '../../../../assets/icons/ic_gallery_32.svg';
import { StackParamList } from '../../../../navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { ScheduleModule } = NativeModules;

type ScheduleInfoInputRouteProp = RouteProp<StackParamList, 'SelectInputScheduleWithOCRType'>;


const SelectInputScheduleWithOCRTypeScreen = () => {
  const route = useRoute<ScheduleInfoInputRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [imageUri, setImageUri] = useState<string | null | undefined>(null);
  const [scheduleJson, setScheduleJson] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeScheduleImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, hadleOCRResponse);
  };

  const openCameraImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 1,
        saveToPhotos: true,
        includeBase64: true,
      },
      hadleOCRResponse
    );
  };

  const hadleOCRResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Camera Error', response.errorMessage);
      return;
    }

    const asset = response.assets?.[0];
    if (!asset) return;

    setImageUri(asset.uri);
    setScheduleJson('');
    setIsAnalyzing(true);

    try {
      const resultJson = await ScheduleModule.parseFromBase64(asset.base64);
      const parsedResult = JSON.parse(resultJson);
      setScheduleJson(JSON.stringify(parsedResult, null, 2));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      Alert.alert('Analysis Error', errorMessage);
      setScheduleJson('분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <View className="flex-1 bg-background-gray-subtle1">
      <SafeAreaView className="flex-1 px-number-8">
        <Text className="mb-4 mt-6 text-start text-heading-m font-semibold">
          인식할 근무표를 등록해주세요.
        </Text>

        <RegMethod
          Icon={TakePicture}
          title="카메라로 촬영하기"
          subtitle="지금 바로 사진을 찍어서 업로드 할 수 있어요."
          onPress={() => navigation.navigate('CompleteCreateScheduleOCR')}
        />
        <RegMethod
          Icon={OpenGallery}
          title="갤러리에서 사진 선택"
          subtitle="이미 저장된 근무표 이미지를 불러올 수 있어요."
          onPress={analyzeScheduleImage}
        />
      </SafeAreaView>
    </View>
  );
};

export default SelectInputScheduleWithOCRTypeScreen;
