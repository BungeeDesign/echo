import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../constants/Theme';
import LottieView from 'lottie-react-native';

export default function AlertsScreen() {
  const pulseAnimation = useRef(null);

  useEffect(() => {
    // pulseAnimation.current.play();
  });

  return (
    <View style={styles.container}>
      {/* <LottieView
        ref={pulseAnimation}
        source={require('../assets/animations/sos-pulse.json')}
      /> */}
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
  },
});
