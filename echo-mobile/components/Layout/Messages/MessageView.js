import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '../../../constants/Theme';
import API from '../../../utils/API';
import { MessageBubble } from '../../../components/Layout/Messages/MessageBubble';
import { FontAwesome5 } from '@expo/vector-icons';
import screenLoader from '../../../assets/animations/ui-screen-loader.gif';
import sosContext from '../../../context/sos/sosContext';
import { useIsFocused } from '@react-navigation/native';

export default function MessageView({ navigation }) {
  // const SosContext = useContext(sosContext);
  // const { messages, getMessages } = SosContext;

  const [userMessages, setUserMessages] = useState([]);
  const [userID, setUserID] = useState('');
  const [hasMessages, setHasMessages] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    // Polling the /messages endpoint to keep the state real-time
    setInterval(() => {
      (async () => {
        const res = await API.get('/messages');
        setUserMessages(res.data);
        getUser();
      })();
    }, 2500);

    // Ensure that the getUser funciton is called upon the screen coming into to focus
    navigation.addListener('focus', () => {
      getUser();
    });

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userDetails');
      setUserID(JSON.parse(user)._id);
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }

    for (const message of userMessages) {
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
    <>
      {userMessages.length > 0 && (
        <ScrollView
          style={{ flex: isKeyboardVisible ? 1 : 0, marginTop: 30 }}
          contentContainerStyle={{
            width: 350,
            alignItems: 'center',
          }}
        >
          {userMessages[0].messages.map((message, index) => {
            return (
              <MessageBubble
                key={index}
                type={message.type}
                messageBody={message.message}
              />
            );
          })}
        </ScrollView>
      )}

      {userMessages.length === null ||
        (userMessages.length === 0 && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image
              style={{ width: 100, resizeMode: 'contain' }}
              source={screenLoader}
            />
          </View>
        ))}

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
    </>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: Theme.fonts.bodyText,
    color: 'white',
    fontSize: 20,
    opacity: 0.5,
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
