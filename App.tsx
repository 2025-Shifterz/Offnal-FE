import './global.css';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoPage from './src/presentation/screens/TodoPage';
import ScheduleRegType from './src/presentation/screens/ScheduleRegType';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ScheduleRegType />
      </SafeAreaView>
    </View>
  );
}
