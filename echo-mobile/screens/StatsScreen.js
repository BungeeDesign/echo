import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../constants/Theme';

export default function StatsScreen() {
  return <View style={styles.container}></View>;
}

StatsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blue,
  },
});
