import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Theme from '../constants/Theme';
import API from '../utils/API';
import { MessageBubble } from '../components/Layout/Messages/MessageBubble';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AlertsScreen() {
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState('');
  const [hasMessages, setHasMessages] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    getMessages();
    getUser();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getMessages = async () => {
    const res = await API.get('/messages');
    setMessages(res.data);
  };

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userDetails');
      setUserID(JSON.parse(user)._id);
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }

    console.log(messages);

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

  const sendMessage = async () => {
    const messageObject = {
      id: '5ed93da63a23b85ff9cfe340',
      message: {
        user: userID,
        message: userMessage,
        type: 'user',
      },
    };
    try {
      const res = await API.put('/messages/message', messageObject);

      if (res.data.msg === 'sent') {
        setUserMessage('');
        Keyboard.dismiss();
        getMessages();
      } else {
        Alert.alert(
          'Message Error',
          'Your message could not be sent, please try again later.',
        );
      }
    } catch (error) {
      console.log('[API Request Error] - Could not send message', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>Messages</Text>
      {hasMessages ? (
        <ScrollView
          style={{ flex: isKeyboardVisible ? 1 : 0, marginTop: 30 }}
          contentContainerStyle={{
            width: 350,
            alignItems: 'center',
          }}
        >
          {messages[0].messages.map((message, index) => {
            return (
              <MessageBubble
                type={message.type}
                messageBody={message.message}
              />
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.bodyText}>You don't have any messages yet ✉️</Text>
      )}
      <View
        style={[
          styles.composeMessageContainer,
          {
            flex: isKeyboardVisible ? 2 : 1,
            marginBottom: isKeyboardVisible ? 0 : 230,
          },
        ]}
      >
        <TextInput
          style={styles.composeInput}
          multiline={true}
          keyboardType="default"
          onChangeText={(text) => setUserMessage(text)}
          value={userMessage}
        ></TextInput>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome5
            name="paper-plane"
            size={18}
            style={{
              marginTop: 0,
              color: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

AlertsScreen.navigationOptions = {
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
