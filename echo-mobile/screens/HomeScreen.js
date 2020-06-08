import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Theme from '../constants/Theme';
import { Map } from '../components/Map/MapView';
import { SubHeading } from '../components/Layout/SubHeading';
import { PreviewBubble } from '../components/Layout/Messages/PreviewBubble';
import SOSModal from '../components/Layout/Modal/SOSModal';
import sosContext from '../context/sos/sosContext';
import screenLoader from '../assets/animations/ui-screen-loader.gif';
import API from '../utils/API';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  const SosContext = useContext(sosContext);
  const { messages, getMessages } = SosContext;

  const [hasMessages, setHasMessages] = useState(false);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    (async () => {
      // Used for testing the onbaording screen / process
      // console.log('Clear Async Storage');
      // AsyncStorage.clear();

      setInterval(() => {
        getMessages();
        getUser();
      }, 2500);
    })();
  }, []);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userDetails');
      setUserID(JSON.parse(user)._id);
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }

    for (const message of messages) {
      if (
        message.messageRoom[0] === userID ||
        message.messageRoom[1] === userID
      ) {
        setHasMessages(true);
      }
    }
  };

  const onMessagePress = () => {
    navigation.navigate('bell');
  };

  return (
    <View style={styles.container}>
      <SOSModal />
      <Map />
      <View style={styles.recentMessagesContainer}>
        <SubHeading text="Recent Messages" />
        <View style={styles.messages}>
          {messages.length > 0 && (
            <>
              <TouchableOpacity onPress={onMessagePress}>
                <PreviewBubble
                  type={messages[0].messages[0].type}
                  message={messages[0].messages[0].message}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        {messages.length === null ||
          (messages.length === 0 && (
            <View
              style={{
                flex: 0,
                width: '100%',
              }}
            >
              <Image
                style={{
                  width: 200,
                  resizeMode: 'contain',
                  transform: [{ scale: 0.5 }],
                }}
                source={screenLoader}
              />
            </View>
          ))}
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
