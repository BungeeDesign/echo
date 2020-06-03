import React, { useEffect, useState, useContext } from 'react';
import { View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './components/Layout/Menu/TabBar';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import AlertsScreen from './screens/AlertsScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useSafeArea } from 'react-native-safe-area-context';
import EchoButtonGesture from './components/Layout/Buttons/EchoButtonGesture';
import Theme from './constants/Theme';
import OnboardingStack from './navigation/OnboardingStack';
import SosContext from './context/sos/sosContext';

export default () => {
  const sosContext = useContext(SosContext);
  const { userOnboarded, setOnboarded } = sosContext;

  useEffect(() => {
    isOnboarded();
    (async () => {
      try {
        let data = await AsyncStorage.getItem('onboarding');
        setOnboarded(data);
      } catch (error) {
        console.log('[Storage Error] - Unable to get data');
      }
    })();
  }, []);

  const isOnboarded = async () => {
    let isOnboarded;
    try {
      isOnboarded = await AsyncStorage.getItem('onboarding');
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }

    if (isOnboarded === 'true') {
      setOnboarded(true);
    }
  };

  const Tab = createBottomTabNavigator();
  return (
    <>
      {userOnboarded && (
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
      )}
      <View style={{ flex: 1, position: 'relative' }}>
        <Tab.Navigator
          initialRouteName={isOnboarded ? 'home' : 'onboarding'}
          tabBar={(props) => (
            <TabBar
              {...props}
              state={{ ...props.state, routes: props.state.routes.slice(0, 5) }}
            />
          )}
        >
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="bell" component={AlertsScreen} />
          <Tab.Screen name="font" component={ProfileScreen} />
          <Tab.Screen name="chart-bar" component={StatsScreen} />
          <Tab.Screen name="user-alt" component={ProfileScreen} />
          <Tab.Screen name="onboarding" component={OnboardingStack} />
        </Tab.Navigator>
        {useSafeArea().bottom > 0 && userOnboarded && (
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
