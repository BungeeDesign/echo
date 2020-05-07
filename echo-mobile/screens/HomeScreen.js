import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Theme from '../constants/Theme';
import { Button } from '../components/Layout/Buttons/Button';
import TestButton from '../components/TestButton';
import Svg, { Path } from 'react-native-svg';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Svg width={41} height={43} viewBox="0 0 17 43">
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
      <Text style={{ color: 'white', marginTop: 20 }}>
        Echo. Humanitarian Communication.
      </Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.blue,
  },
});
