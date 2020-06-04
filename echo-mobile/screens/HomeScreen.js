import React, { useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Theme from '../constants/Theme';
import { Logo } from '../components/Layout/Logo';
import { Map } from '../components/Map/MapView';
import { SubHeading } from '../components/Layout/SubHeading';
import { PreviewBubble } from '../components/Layout/Messages/PreviewBubble';
import SOSModal from '../components/Layout/Modal/SOSModal';

export default function HomeScreen() {
  useEffect(() => {
    (async () => {
      // console.log('Clear Async Storage');
      // AsyncStorage.clear();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SOSModal />
      <Map />
      <View style={styles.recentMessagesContainer}>
        <SubHeading text="Recent Messages" />
        <View style={styles.messages}>
          <PreviewBubble />
        </View>
      </View>
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
  recentMessagesContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
  },
  messages: {
    flex: 0,
    marginTop: 20,
  },
});
