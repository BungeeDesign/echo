import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from '../../../utils/CircularProgress';

export const Button = () => {
  return (
    <View style={button.container}>
      <CircularProgress radius={4 / 2} bg="white" fg="red"></CircularProgress>
    </View>
  );
};

const button = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 100,
    width: 100,
  },
});
