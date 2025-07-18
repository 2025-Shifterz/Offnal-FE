import React, { useState } from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NativeModules } from 'react-native';
import { openSettings, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import RegMethod from '../../../schedule/component/RegMethod';

import TakePicture from '../../../../assets/icons/ic_camera_32.svg';
import OpenGallery from '../../../../assets/icons/ic_gallery_32.svg';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { onboardingNavigation, OnboardingStackParamList } from '../../../../navigation/types';

const { ScheduleModule } = NativeModules;
const { ImageProcessorModule } = NativeModules;

type ScheduleInfoInputRouteProp = RouteProp<
  OnboardingStackParamList,
  'SelectInputScheduleWithOCRType'
>;

const SelectInputScheduleWithOCRTypeScreen = () => {
  const route = useRoute<ScheduleInfoInputRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  const { selectedBoxId, calendarName, workGroup, workTimes, year, month } = route.params;

  const [imageUri, setImageUri] = useState<string | null | undefined>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const requestPermissions = async (permissionType: 'camera' | 'gallery'): Promise<boolean> => {
    const requiredPermissions: (Permission | undefined)[] = [];

    if (permissionType === 'camera') {
      requiredPermissions.push(
        Platform.select({
          android: PERMISSIONS.ANDROID.CAMERA,
          ios: PERMISSIONS.IOS.CAMERA,
        })
      );
    } else {
      return false;
    }

    let allGranted = true;
    for (const perm of requiredPermissions) {
      if (!perm) continue;

      const status = await request(perm as Permission);
      console.log(`Permission ${perm} status:`, status);

      if (status !== RESULTS.GRANTED) {
        allGranted = false;
        if (status === RESULTS.BLOCKED || (Platform.OS === 'ios' && status === RESULTS.DENIED)) {
          Alert.alert(
            '권한 필요',
            '카메라 접근 권한이 필요합니다. 앱 설정에서 수동으로 권한을 허용해주세요.',
            [
              { text: '취소', style: 'cancel' },
              {
                text: '설정으로 이동',
                onPress: () => openSettings().catch(() => console.warn('Failed to open settings')),
              },
            ]
          );
          return false;
        } else {
          Alert.alert(
            '권한 필요',
            '요청된 카메라 권한이 거부되었습니다. 해당 기능을 사용하려면 권한을 허용해야 합니다.'
          );
          return false;
        }
      }
    }

    return allGranted;
  };

  const analyzeScheduleImage = async () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, hadleOCRResponse);
  };

  const openCameraImage = async () => {
    const hasPermission = await requestPermissions('camera');
    if (!hasPermission) return;

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
    setIsAnalyzing(true);

    try {
      const resultJson = await ImageProcessorModule.processImageFromBase64(asset.base64);
      const parsedResult = JSON.parse(resultJson);
      console.log('Parsed OCR Result:', parsedResult);

      const entries = Object.entries(parsedResult);

      navigation.navigate('EditCompleteCreateScheduleOCR', {
        selectedBoxId,
        calendarName,
        workGroup,
        workTimes,
        year,
        month,
        ocrResult: entries,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      Alert.alert('Analysis Error', errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <View className="flex-1 bg-background-gray-subtle1">
      <SafeAreaView className="flex-1 px-number-8">
        <Text className="mb-4 text-start text-heading-m font-semibold">
          인식할 근무표를 등록해주세요.
        </Text>

        <RegMethod
          Icon={TakePicture}
          title="카메라로 촬영하기"
          subtitle="지금 바로 사진을 찍어서 업로드 할 수 있어요."
          onPress={openCameraImage}
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
