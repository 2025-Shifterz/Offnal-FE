import './global.css';
import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="font-bold text-alpha-black0">Hello, Nativewind!</Text>
        <Text className="text-warning-60">Welcome to Nativewind!</Text>
        <Text className="font-2xl text-danger-70">짜증나</Text>
        <Text className="text-danger-70 text-lg font-bold">
          스타일 적용되면 이 문구 보일 거야
        </Text>
      </SafeAreaView>
    </View>
  );
}
