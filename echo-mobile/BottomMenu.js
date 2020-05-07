import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './components/Layout/Menu/TabBar';
import HomeScreen from './screens/HomeScreen';
import AlertsScreen from './screens/AlertsScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useSafeArea } from 'react-native-safe-area-context';
import EchoButtonGesture from './components/Layout/Buttons/EchoButtonGesture';
import Theme from './constants/Theme';

export default () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <View
        style={{
          position: 'absolute',
          zIndex: 300,
          bottom: 5,
          alignSelf: 'center',
        }}
      >
        <EchoButtonGesture />
      </View>
      <View style={{ flex: 1, position: 'relative' }}>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="bell" component={AlertsScreen} />
          <Tab.Screen name="font" component={ProfileScreen} />
          <Tab.Screen name="chart-bar" component={StatsScreen} />
          <Tab.Screen name="user-alt" component={ProfileScreen} />
        </Tab.Navigator>
        {useSafeArea().bottom > 0 && (
          <View
            style={{
              height: useSafeArea().bottom,
              backgroundColor: Theme.colors.purpleBlue,
            }}
          />
        )}
      </View>
    </>
  );
};
