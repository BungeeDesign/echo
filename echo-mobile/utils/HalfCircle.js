import React from 'react';
import { View } from 'react-native';
import { RADIUS } from '../constants/Constants';

export default ({ color, radius }) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          backgroundColor: color,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
        }}
      />
    </View>
  );
};
