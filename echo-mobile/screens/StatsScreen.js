import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Theme from '../constants/Theme';
import StatBar from '../components/Map/StatBar';
import API from '../utils/API';
import screenLoader from '../assets/animations/ui-screen-loader.gif';

export default function StatsScreen() {
  const [hub, setHub] = useState([]);

  useEffect(() => {
    setInterval(() => {
      (async () => {
        const res = await API.get('/hubs');
        setHub(res.data);
      })();
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>Hub Stats</Text>
      {hub.length > 0 && (
        <View style={styles.levelsContainer}>
          <View style={styles.barContainer}>
            <Text style={styles.levelText}>Water Level</Text>
            <StatBar icon="water" percentage={100} />
          </View>
          <View style={styles.barContainer}>
            <Text style={styles.levelText}>Air Quality</Text>
            <StatBar icon="air-freshener" percentage={100} />
          </View>
          <View style={styles.barContainer}>
            <Text style={styles.levelText}>Hub Battery</Text>
            <StatBar icon="battery-full" percentage={100} />
          </View>
        </View>
      )}
      {hub.length === null ||
        (hub.length === 0 && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image
              style={{ width: 100, resizeMode: 'contain' }}
              source={screenLoader}
            />
          </View>
        ))}
    </View>
  );
}

StatsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: Theme.fonts.bodyText,
    color: 'white',
    fontSize: 20,
    opacity: 0.5,
  },
  screenHeading: {
    marginTop: 40,
    fontFamily: Theme.fonts.heading,
    color: 'white',
    fontSize: 30,
  },
  levelsContainer: {
    flex: 1,
    marginTop: 50,
  },
  barContainer: {
    marginTop: 10,
    height: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontFamily: Theme.fonts.heading,
    color: 'white',
    fontSize: 20,
    top: -35,
    // flex: 1,
    width: '100%',
    position: 'absolute',
  },
});
