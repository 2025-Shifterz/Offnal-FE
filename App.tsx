import './global.css';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bold text-primary">Hello, Nativewind!</Text>
        <Text className="text-xl font-bold text-secondary">Welcome to Nativewind!</Text>
      </SafeAreaView>
    </View>
  );
}
