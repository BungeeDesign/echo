import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Theme from '../constants/Theme';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <LinearGradient colors={['#1D3D7E', '#183160']} style={styles.button}>
            <Text style={styles.buttonText}>No</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blue,
  },
  header: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 45,
    color: 'white',
    fontFamily: Theme.fonts.body,
  },
  touchable: {
    flex: 1,
  },
});
