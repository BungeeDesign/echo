import React from 'react';
import { View } from 'react-native';
import { RADIUS } from '../constants/Constants';
import { BlurView } from 'expo-blur';

export default ({ color }) => {
  return (
    <View
      style={{
        width: RADIUS * 2,
        height: RADIUS,
        overflow: 'hidden',
      }}
    >
      <BlurView
        intensity={50}
        style={{
          backgroundColor: color,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: RADIUS,
        }}
      />
    </View>
  );
};
