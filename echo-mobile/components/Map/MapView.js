import React, { useRef, useState } from 'react';
import { View, StyleSheet, MaskedViewIOS, LayoutAnimation } from 'react-native';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Theme from '../../constants/Theme';

export const Map = () => {
  const ref = useRef(null);

  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [mapExpanded, setMapExpanded] = useState(400);

  const onExpand = () => {
    if (mapExpanded === 800) {
      setMapExpanded(400);
    } else {
      setMapExpanded(800);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: mapExpanded === 800 ? 100 : 5,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          opacity: 0.5,
        }}
      >
        <FontAwesome5
          onPress={onExpand}
          name={mapExpanded === 800 ? 'minus-circle' : 'plus-circle'}
          size={25}
          style={{
            color: Theme.colors.lightOrange,
          }}
        />
      </View>
      <MaskedViewIOS
        pointerEvents="none"
        style={{ zIndex: 9 }}
        maskElement={
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(255,255,255,0.1)', Theme.colors.blue]}
            style={[styles.gradient, { top: mapExpanded - 50 }]}
          />
        }
      >
        <View style={[styles.mask, { height: mapExpanded }]}></View>
      </MaskedViewIOS>
      <MapView
        style={[styles.map, { height: mapExpanded }]}
        initialRegion={region}
        mapType="satellite"
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  map: {
    width: '100%',
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
    top: 0,
    opacity: 0.8,
    backgroundColor: Theme.colors.blue,
  },
});
