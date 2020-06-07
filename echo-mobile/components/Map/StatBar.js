import React from 'react';
import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function StatBar({ icon, percentage }) {
  return (
    <LinearGradient
      colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
      start={[0, 1]}
      end={[1, 0]}
      style={[
        styles.statBar,
        { width: `${percentage}%`, top: icon === 'heartbeat' ? 55 : 0 },
      ]}
    >
      <FontAwesome5
        name={icon}
        size={18}
        style={{
          marginLeft: 10,
          color: 'white',
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  statBar: {
    position: 'absolute',
    marginLeft: 10,
    zIndex: 999,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
