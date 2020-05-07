import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import Theme from '../constants/Theme';

export default function TabBarIcon({ name, focused }) {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome5
        name={name}
        size={35}
        style={{
          marginTop: 0,
          paddingLeft: 15,
          paddingRight: 15,
          color: 'white',
          opacity: focused ? 1 : 0.59,
        }}
      />
    </View>
  );
}
