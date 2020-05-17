import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import { View, StyleSheet } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Value, cond, eq, Easing } from 'react-native-reanimated';
import { mix, onGestureEvent, withTransition } from 'react-native-redash';
import Theme from '../../../constants/Theme';
import { EchoButton } from './EchoButton';
import sosConteext from '../../../context/sos/sosContext';

export default function TestButton({ name, focused }) {
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });
  const isActive = eq(state, State.BEGAN);
  const easing = Easing.inOut(Easing.quad);
  const duration = cond(isActive, 2000, 250);
  const progress = withTransition(isActive, { easing, duration });
  const scale = mix(progress, 1, 1.2);

  useEffect(() => {
    console.log('Running....');
    const socket = socketIOClient('http://127.0.0.1:1255', {
      jsonp: false,
      agent: '-',
      pfx: '-',
      cert: '-',
      ca: '-',
      ciphers: '-',
      rejectUnauthorized: '-',
      perMessageDeflate: '-',
    });
    socket.on('sosAlert', (data) => {
      console.log('BEEP BEEEP SOS Alert!!!!!!! Active');
    });
  }, []);

  return (
    <View style={styles.buttonContainer}>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <EchoButton {...{ progress }} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.lightOrange,
  },
});
