import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  lessThan,
  multiply,
} from 'react-native-reanimated';

import { transformOrigin } from 'react-native-redash';
import HalfCircle from './HalfCircle';
import { PI, RADIUS } from '../constants/Constants';

export default ({ progress, bg, fg, radius }) => {
  const theta = multiply(progress, 2 * PI);
  const opacity = lessThan(theta, PI);
  const rotate = interpolate(theta, {
    inputRange: [PI, 2 * PI],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      }}
    >
      <View style={{ zIndex: 1 }}>
        <HalfCircle color={fg} {...{ radius }} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin(
              { x: 0, y: radius / 2 },
              { rotate: theta }
            ),
            opacity,
          }}
        >
          <HalfCircle color={bg} {...{ radius }} />
        </Animated.View>
      </View>
      <View style={{ transform: [{ rotate: '180deg' }] }}>
        <HalfCircle color={fg} {...{ radius }} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin({ x: 0, y: radius / 2 }, { rotate }),
          }}
        >
          <HalfCircle color={bg} {...{ radius }} />
        </Animated.View>
      </View>
    </View>
  );
};
