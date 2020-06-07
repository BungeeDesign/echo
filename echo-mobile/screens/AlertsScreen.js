import React, { useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Theme from '../constants/Theme';
import MessageView from '../components/Layout/Messages/MessageView';

export default function AlertsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>Messages</Text>
      <MessageView navigation={navigation} />
    </View>
  );
}

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
  composeMessageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  composeInput: {
    marginTop: 30,
    marginRight: 10,
    borderRadius: 15,
    width: 300,
    height: 100,
    backgroundColor: '#0F1824',
    padding: 10,
    fontSize: 15,
    color: 'white',
    fontFamily: Theme.fonts.heading,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: Theme.colors.purpleBlue,
  },
});
