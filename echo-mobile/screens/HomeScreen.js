import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Theme from '../constants/Theme';
import { Logo } from '../components/Layout/Logo';
import { Map } from '../components/Map/MapView';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.blue,
  },
});
