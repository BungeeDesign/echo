import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Theme from '../constants/Theme';
import { Logo } from '../components/Layout/Logo';
import { Map } from '../components/Map/MapView';
import { SubHeading } from '../components/Layout/SubHeading';
import { PreviewBubble } from '../components/Layout/Messages/PreviewBubble';
import SOSModal from '../components/Layout/Modal/SOSModal';
import sosContext from '../context/sos/sosContext';
import API from '../utils/API';

export default function HomeScreen() {
  const SosContext = useContext(sosContext);
  const { messages, getMessages } = SosContext;

  const [hasMessages, setHasMessages] = useState(false);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    getMessages();
    getUser();

    (async () => {
      // console.log('Clear Async Storage');
      // AsyncStorage.clear();
    })();
  }, []);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userDetails');
      setUserID(JSON.parse(user)._id);
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }

    console.log('User Messages: ', messages[0].messages);

    for (const message of messages) {
      if (
        message.messageRoom[0] === userID ||
        message.messageRoom[1] === userID
      ) {
        setHasMessages(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SOSModal />
      <Map />
      <View style={styles.recentMessagesContainer}>
        <SubHeading text="Recent Messages" />
        <View style={styles.messages}>
          {hasMessages ? (
            <>
              <PreviewBubble
                type={messages[0].messages[0].type}
                message={messages[0].messages[0].message}
              />
              <PreviewBubble
                type={messages[0].messages[2].type}
                message={messages[0].messages[2].message}
              />
            </>
          ) : (
            <Text style={styles.bodyText}>
              You don't have any messages yet ✉️
            </Text>
          )}
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
  bodyText: {
    fontFamily: Theme.fonts.bodyText,
    color: 'white',
    fontSize: 20,
    opacity: 0.5,
  },
});
