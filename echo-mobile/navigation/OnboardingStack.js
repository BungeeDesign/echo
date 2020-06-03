import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import onBoarding from '../screens/OnboardingScreen';
import OnboardProcessing from '../screens/OnboardProcessing';

export default ({ navigation }) => {
  const Onboarding = createStackNavigator();

  navigation.setOptions({ tabBarVisible: false });

  return (
    <Onboarding.Navigator headerMode="none">
      <Onboarding.Screen name="onBoarding" component={onBoarding} />
      <Onboarding.Screen
        name="OnboardProcessing"
        component={OnboardProcessing}
      />
    </Onboarding.Navigator>
  );
};
