import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  MaskedViewIOS,
  LayoutAnimation,
  AsyncStorage,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Theme from '../../constants/Theme';
import { UserPin } from '../Map/UserPin';
import { BlurView } from 'expo-blur';
import StatBar from '../Map/StatBar';

export const Map = () => {
  const ref = useRef(null);

  const [region, setRegion] = useState({
    latitude: 10.550231,
    longitude: 107.552053,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [userLocation, setUserLocation] = useState([]);
  const [userFood, setUserFood] = useState(0);
  const [userHealth, setUserHealth] = useState(0);
  const [mapExpanded, setMapExpanded] = useState(400);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('userDetails');
      setUserLocation(JSON.parse(user).userDetails.location);
      calculateStats(
        JSON.parse(user).stats.food,
        JSON.parse(user).stats.health.complications,
      );

      console.log('Location: ', userLocation);
    })();
  }, []);

  const calculateStats = (food, health) => {
    switch (food) {
      case 'Low':
        setUserFood(30);
        break;
      case 'Medium':
        setUserFood(50);
        break;
      case 'High':
        setUserFood(100);
        break;
      default:
        break;
    }

    switch (health.length) {
      case 0:
        setUserHealth(100);
        break;
      case 1:
        setUserHealth(50);
        break;
      case 2:
        setUserHealth(30);
        break;
      default:
        break;
    }
  };

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
            color: 'white',
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
      >
        <Marker
          coordinate={{
            latitude: userLocation.lat,
            longitude: userLocation.long,
          }}
          calloutOffset={{ x: 80, y: 190 }}
        >
          <UserPin />
          <Callout tooltip>
            <BlurView intensity={90} tint="dark" style={styles.blurCallout}>
              <View style={{ width: 178, marginTop: 60, zIndex: 999 }}>
                <StatBar icon={'heartbeat'} percentage={userHealth} />
                <StatBar icon={'apple-alt'} percentage={userFood} />
              </View>
              <View style={styles.blurColour}></View>
            </BlurView>
          </Callout>
        </Marker>
      </MapView>
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
  blurCallout: {
    width: 200,
    height: 180,
    borderRadius: 20,
  },
  blurColour: {
    width: 200,
    height: '100%',
    borderRadius: 20,
    backgroundColor: Theme.colors.blue,
    opacity: 0.5,
    position: 'absolute',
  },
});
