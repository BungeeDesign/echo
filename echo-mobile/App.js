import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomMenu from './BottomMenu';
import onBoarding from './screens/OnboardingScreen';
import useLinking from './navigation/useLinking';
import SosState from './context/sos/SosState';
import OnboardProcessing from './screens/OnboardProcessing';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const Stack = createStackNavigator();

  const [isOnboarded, setOnboarded] = React.useState(false);

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
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <SafeAreaProvider>
          <SosState>
            <NavigationContainer>
              <Stack.Navigator headerMode="none">
                <Stack.Screen name="onBoarding" component={onBoarding} />
                <Stack.Screen
                  name="OnboardProcessing"
                  component={OnboardProcessing}
                />
              </Stack.Navigator>
            </NavigationContainer>
            {isOnboarded && (
              <NavigationContainer>
                <BottomMenu />
              </NavigationContainer>
            )}
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
