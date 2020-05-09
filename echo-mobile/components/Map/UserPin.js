import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Theme from '../../constants/Theme';

export const UserPin = ({}) => {
  return (
    <View style={styles.container}>
      <FontAwesome5
        onPress={() => console.log('Icon Press...')}
        name={'user-alt'}
        size={25}
        style={{
          color: Theme.colors.lightOrange,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.lightOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 9,
    zIndex: 9999,
  },
});
