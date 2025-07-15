import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from './type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../presentation/login/screen/Login';
import SelectRegMethod from '../presentation/selectRegMethod/screen/SelectRegMethod';
import KakaoLoginWebView from '../presentation/login/screen/KakaoLoginWebView';
import PrivacyPolicy from '../presentation/policy/screen/PrivacyPolicy';
import ServiceTerm from '../presentation/policy/screen/ServiceTerm';
import AutoAlarm from '../presentation/alarm/screen/AutoAlarm';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AutoAlarm" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SelectRegMethod" component={SelectRegMethod} />
        <Stack.Screen name="KakaoWebView" component={KakaoLoginWebView} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="ServiceTerm" component={ServiceTerm} />
        <Stack.Screen name="AutoAlarm" component={AutoAlarm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
