import * as React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomMenu from './BottomMenu';
import SosState from './context/sos/SosState';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  const Stack = createStackNavigator();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-semi-bold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
    userOnboarding();
  }, []);

  const userOnboarding = async () => {
    let isOnboarded;
    try {
      isOnboarded = await AsyncStorage.getItem('onboarding');
    } catch (error) {
      console.log('[Storage Error] - Unable to get data');
    }

    console.log('App.js Onboarding Storage Value: ', isOnboarded);
    if (isOnboarded === null) {
      console.log('Onboarding is false.....');
      try {
        await AsyncStorage.setItem('onboarding', 'false');
      } catch (error) {
        console.log('[Storage Error] - Unable to save data');
      }
    }
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <SafeAreaProvider>
          <SosState>
            {/* <NavigationContainer>
              <Stack.Navigator headerMode="none">
                <Stack.Screen name="onBoarding" component={onBoarding} />
                <Stack.Screen
                  name="OnboardProcessing"
                  component={OnboardProcessing}
                />
              </Stack.Navigator>
            </NavigationContainer> */}
            <NavigationContainer>
              <BottomMenu />
            </NavigationContainer>
          </SosState>
        </SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
