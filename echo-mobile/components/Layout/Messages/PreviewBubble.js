import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from '../../../constants/Theme';
import { hide } from 'expo/build/launch/SplashScreen';

export const PreviewBubble = ({ type, message }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        pointerEvents="none"
        colors={[Theme.colors.lightOrange, Theme.colors.burntOrange]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.gradient}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.messageTitle}>
            <View style={styles.fromLabel}>
              <Text style={styles.labelText}>Admin</Text>
            </View>
            <View style={styles.hubLabel}>
              <Text style={styles.labelText}>Echo Peach Admin</Text>
            </View>
            <View style={styles.timeLabel}>
              <Text style={styles.labelText}>7:56</Text>
            </View>
          </View>
          <View style={styles.messageBody}>
            <Text style={styles.bodyText}>{message}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  contentWrapper: {
    width: 330,
    // position: 'relative',
    // width: '100%',
    margin: 10,
  },
  gradient: {
    width: '100%',
    height: 100,
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
    flex: 1,
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 18,
    fontFamily: Theme.fonts.bodyText,
    opacity: 0.9,
    color: 'white',
  },
  bodyText: {
    fontFamily: Theme.fonts.bodyText,
    color: 'white',
  },
});
