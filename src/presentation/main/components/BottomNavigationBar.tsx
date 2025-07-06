import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReactNode } from 'react';

import HomeIcon from '../../../assets/icons/ic_home_24_gray.svg';
import CalendarIcon from '../../../assets/icons/ic_calendar_24_gray.svg';
import MyInfoIcon from '../../../assets/icons/ic_myinfo_24_gray.svg';

export const Tab = createBottomTabNavigator();

const BottomNavigationBar = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            const iconTintColor = focused ? '#1e2124' : '#cdd1d5';

            switch (route.name) {
              case 'Home':
                IconComponent = HomeIcon;
                break;
              case 'Calendar':
                IconComponent = CalendarIcon;
                break;
              case 'MyInfo':
                IconComponent = MyInfoIcon;
                break;
              default:
                IconComponent = HomeIcon;
                break;
            }

            return <IconComponent fill={iconTintColor} />;
          },
          tabBarLabel: ({ focused }) => {
            let label;
            const labelColor = focused ? 'text-text-basic' : 'text-text-disabled';

            switch (route.name) {
              case 'Home':
                label = '홈';
                break;
              case 'Calendar':
                label = '근무 캘린더';
                break;
              case 'MyInfo':
                label = '내 정보';
                break;
              default:
                label = '홈';
                break;
            }

            return (
              <Text className={`font-pretendard text-heading-xxxxs ${labelColor} font-medium`}>
                {label}
              </Text>
            );
          },
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            maxHeight: 65,
          },
          headerShown: false,
        })}
      >
        {children}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigationBar;
