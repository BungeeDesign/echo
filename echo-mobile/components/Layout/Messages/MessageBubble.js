import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from '../../../constants/Theme';
import { hide } from 'expo/build/launch/SplashScreen';

export const MessageBubble = ({ type, messageBody }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        pointerEvents="none"
        colors={[
          type === 'admin' ? Theme.colors.lightOrange : Theme.colors.purpleBlue,
          type === 'admin' ? Theme.colors.burntOrange : Theme.colors.purpleBlue,
        ]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.gradient}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.messageTitle}>
            <View style={styles.fromLabel}>
              <Text style={styles.labelText}>
                {type === 'admin' ? 'Admin' : 'You'}
              </Text>
            </View>
            <View style={styles.hubLabel}>
              <Text style={styles.labelText}>1.4M from Echo Peach</Text>
            </View>
          </View>
          <View style={styles.messageBody}>
            <Text style={styles.bodyText}>{messageBody}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: auto,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  contentWrapper: {
    // width: 300,
    // position: 'relative',
    width: '100%',
    margin: 10,
  },
  gradient: {
    width: '100%',
    // height: 100,
  },
  messageTitle: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
  },
  fromLabel: {
    justifyContent: 'flex-start',
  },
  hubLabel: {
    flexBasis: 200,
    alignItems: 'flex-end',
  },
  timeLabel: {
    // flex: 1,
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 18,
    fontFamily: Theme.fonts.bodyText,
    opacity: 0.9,
    color: 'white',
  },
  bodyText: {
    fontFamily: Theme.fonts.heading,
    color: 'white',
    padding: 5,
  },
});
