import React, { useState } from 'react';
import { View, StyleSheet, MaskedViewIOS } from 'react-native';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from '../../constants/Theme';

export const Map = () => {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View style={styles.container}>
      <MaskedViewIOS
        pointerEvents="none"
        style={{ zIndex: 9 }}
        maskElement={
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(255,255,255,0.1)', Theme.colors.blue]}
            style={styles.gradient}
          />
        }
      >
        <View style={styles.mask}></View>
      </MaskedViewIOS>
      <MapView
        style={styles.map}
        initialRegion={region}
        mapType="satellite"
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  map: {
    width: '100%',
    height: 400,
  },
  gradient: {
    position: 'absolute',
    top: 350,
    zIndex: 2,
    width: '100%',
    height: 50,
  },
  mask: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    height: 400,
    top: 0,
    opacity: 0.8,
    backgroundColor: Theme.colors.blue,
  },
});
