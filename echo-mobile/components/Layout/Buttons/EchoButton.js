import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import Animated, { call, cond, eq, useCode } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import CircularProgress from '../../../utils/CircularProgress';
import Theme from '../../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import API from '../../../utils/API';
import LottieView from 'lottie-react-native';
import SosContext from '../../../context/sos/sosContext';
import { Audio } from 'expo-av';

const SIZE = 80;
const STROKE_WIDTH = 10;
const ICON_SIZE = 96;
const CONTENT_SIZE = SIZE - STROKE_WIDTH * 2;
let hasFired = false;

export const EchoButton = ({ progress }) => {
  const sosContext = useContext(SosContext);
  const { setSosAlert, sosAlert } = sosContext;
  const [active, setActive] = useState(false);
  const [userID, setUserID] = useState('');
  const pulseAnimation = useRef(null);

  useEffect(() => {
    getUser();

    if (!sosAlert) {
      // Stop the SOS Animation
      setActive(false);
    }
  }, []);

  useCode(
    () =>
      cond(
        eq(progress, 1),
        call([], () => setActive(true)),
      ),
    [progress],
  );

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userDetails');
      setUserID(JSON.parse(user)._id);
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }
  };

  const triggerSOS = async () => {
    try {
      const res = await API.post('users/sos', { id: userID, state: active });
    } catch (error) {
      console.log('[Echo Button] - Request Error');
    }

    playAudio();
  };

  const playAudio = async () => {
    // Play the SOS Audio
    const soundObject = new Audio.Sound();

    if (active) {
      try {
        await soundObject.loadAsync(
          require('../../../assets/audio/sos-alarm.mp3'),
        );
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
      } catch (error) {
        console.log('[Audio Error] - SOS audio could not be played.');
      }
    } else {
      try {
        await soundObject.stopAsync();
      } catch (error) {
        console.log('[Audio Error] - SOS audio could not be stopped.');
      }
    }
  };

  if (active) {
    if (!hasFired) {
      setSosAlert(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // Trigger Alert via API Call
      triggerSOS();

      // Play the SOS Animation
      pulseAnimation.current.play();

      hasFired = true;
    }

    if (!sosAlert) {
      setActive(false);
    }
  }

  return (
    <View style={{ bottom: 30 }}>
      <CircularProgress
        radius={SIZE / 2}
        bg={Theme.colors.blue}
        fg={Theme.colors.burntOrange}
        {...{ progress }}
      />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Svg width={'100%'} height={'100%'}>
            <Path
              d="M9.09254 32.344V10.6559C9.09254 6.95972 10.3617 5.0886 12.757 4.50755C12.2095 4.39237 11.6309 4.3335 10.9776 4.3335C7.47187 4.3335 5.56812 6.14575 5.56812 10.6559V32.344C5.56812 36.8542 7.47187 38.6664 10.9776 38.6664C11.6309 38.6664 12.2095 38.6076 12.757 38.4924C10.3586 37.9113 9.09254 36.0428 9.09254 32.344Z"
              fill="white"
            />
            <Path
              d="M14.3995 29.2008V13.8018C14.3995 11.1756 15.3016 9.84964 17 9.43753C16.6112 9.35562 16.2006 9.31467 15.7371 9.31467C13.2485 9.31467 11.8954 10.6022 11.8954 13.8018V29.2008C11.8954 32.4029 13.2454 33.6879 15.7371 33.6879C16.2006 33.6879 16.6143 33.6469 17 33.565C15.2985 33.1529 14.3995 31.8245 14.3995 29.2008Z"
              fill="white"
            />
            <Path
              d="M3.52443 33.1273V9.87267C3.52443 4.32073 6.7129 0.665516 12.7383 0.087029C12.1753 0.0281564 11.5936 0 10.9777 0C3.80439 0 0 3.79856 0 9.87267V33.1273C0 39.2014 3.80439 43 10.9777 43C11.5936 43 12.1753 42.9718 12.7383 42.913C6.7129 42.3345 3.52443 38.6793 3.52443 33.1273Z"
              fill="white"
            />
          </Svg>
        </View>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={[Theme.colors.lightOrange, Theme.colors.burntOrange]}
            style={styles.gradient}
          />
        </View>
      </View>
      <View
        style={[styles.pulseAnimation, { display: active ? 'flex' : 'none' }]}
      >
        <LottieView
          ref={pulseAnimation}
          source={require('../../../assets/animations/sos-pulse.json')}
          speed={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: STROKE_WIDTH,
    left: STROKE_WIDTH,
    right: STROKE_WIDTH,
    bottom: STROKE_WIDTH,
    borderRadius: 100,
    zIndex: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    top: (CONTENT_SIZE - 42) / 2,
    left: (CONTENT_SIZE - 20) / 2,
    position: 'absolute',
    zIndex: 300,
  },
  pulseAnimation: {
    zIndex: -2,
    width: 300,
    height: 200,
    position: 'absolute',
    left: -110,
    top: -60,
  },
});
