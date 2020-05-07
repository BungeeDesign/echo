import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../constants/Theme';

export default function AlertsScreen() {
  return <View style={styles.container}></View>;
}

AlertsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blue,
  },
});
