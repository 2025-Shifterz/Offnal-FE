import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NativeModules } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { ScheduleModule } = NativeModules;

const ImportImage = () => {
  const [imageUri, setImageUri] = useState(null);
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
      Alert.alert('Analysis Error', e.message);
      setScheduleJson('분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-white" edges={['top', 'bottom']}>
      <View className="p-number-5">
        <Button title="근무표 이미지 분석" onPress={analyzeScheduleImage} disabled={isAnalyzing} />
        <Button title="카메라로 분석" onPress={openCameraImage} disabled={isAnalyzing} />
      </View>

      {isAnalyzing && <Text style={styles.statusText}>분석 중...</Text>}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      {scheduleJson && (
        <>
          <Text style={styles.resultTitle}>분석 결과 (JSON)</Text>
          <ScrollView style={styles.resultScrollView}>
            <Text style={styles.jsonText}>{scheduleJson}</Text>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  imagePreview: {
    width: '90%',
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 16,
  },
  resultScrollView: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  jsonText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12,
    color: '#333',
  },
});

export default ImportImage;
