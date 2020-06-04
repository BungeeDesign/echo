import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import Theme from '../../../constants/Theme';
import SosContext from '../../../context/sos/sosContext';
import { BlurView } from 'expo-blur';
import { useMemoOne } from 'use-memo-one';

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default function SOSModal({}) {
  const scaleIn = useMemoOne(() => new Animated.Value(0), [scaleIn]);
  const sosContext = useContext(SosContext);
  const { setSosAlert, sosAlert } = sosContext;

  const [message, setMessage] = useState('');
  const [remainingSecs, setRemainingSecs] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);

  const reset = () => {
    setRemainingSecs(0);
  };

  useEffect(() => {
    if (sosAlert) {
      showModal();
    }
    let interval = null;
    if (sosAlert) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs + 1);
      }, 1000);
    } else if (!sosAlert && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [sosAlert, remainingSecs]);

  const showModal = () => {
    Animated.spring(scaleIn, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(scaleIn, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const onStop = () => {
    setSosAlert(false);
    closeModal();
    reset();
  };

  return (
    <Animated.View
      style={[styles.alertModalContainer, { transform: [{ scale: scaleIn }] }]}
    >
      <View style={styles.modalContent}>
        <Text style={[styles.modalText, { fontSize: 30 }]}>SOS Active</Text>
        <Text
          style={[styles.modalText, { fontSize: 40 }]}
        >{`${mins}:${secs}`}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onStop}>
          <Text style={[styles.modalText, { marginTop: 0 }]}> Stop ✋</Text>
        </TouchableOpacity>
      </View>
      <BlurView
        intensity={100}
        tint="dark"
        style={styles.alertModal}
      ></BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  alertModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    bottom: 300,
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 60,
    zIndex: 999999999,
  },
  alertModal: {
    borderRadius: 20,
    width: 300,
    height: 250,
  },
  blurColour: {
    width: 400,
    height: 250,
    borderRadius: 20,
    backgroundColor: Theme.colors.blue,
    opacity: 0.5,
  },
  modalContent: {
    flex: 1,
    position: 'absolute',
    zIndex: 12,
    alignItems: 'center',
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  modalText: {
    marginTop: 30,
    color: 'white',
    fontFamily: Theme.fonts.heading,
    fontSize: 20,
    textAlign: 'center',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    width: 200,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.purpleBlue,
  },
});
