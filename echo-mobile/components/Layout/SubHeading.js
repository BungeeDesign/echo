import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Theme from '../../constants/Theme';

export const SubHeading = ({ text }) => {
  return <Text style={styles.heading}>{text}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: Theme.fonts.heading,
    fontSize: 20,
    color: 'white',
  },
});
