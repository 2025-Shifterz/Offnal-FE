import './global.css';
import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-success-60 font-sans text-heading-l">
          Hello, Nativewind!
        </Text>
        <Text className="text-warning-60 text-heading-xl font-sans">
          Welcome to Nativewind!
        </Text>
      </SafeAreaView>
    </View>
  );
}
