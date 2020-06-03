import React, { useRef, useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import Theme from '../constants/Theme';
import API from '../utils/API';
import useHubFinder from '../utils/hooks/useHubFinder';
import echoHub from '../assets/images/echoHub.png';
import SosContext from '../context/sos/sosContext';
import { Logo } from '../components/Layout/Logo';
import { Map } from '../components/Map/MapView';
import { SubHeading } from '../components/Layout/SubHeading';
import { PreviewBubble } from '../components/Layout/Messages/PreviewBubble';
import LottieView from 'lottie-react-native';

export default function OnboardProcessing({ route, navigation }) {
  const sosContext = useContext(SosContext);
  const { setOnboarded } = sosContext;

  const [closestHub, setClosestHub] = useState({});
  // const [user, setUser] = useState([]);

  const { user } = route.params;
  const { location } = route.params;

  const loader = useRef(null);

  useEffect(() => {
    loader.current.play();

    // Set User Location & User Object
    user[0].userDetails.location.lat = location.coords.latitude;
    user[0].userDetails.location.long = location.coords.longitude;

    processOnboarding();
  }, []);

  const processOnboarding = async () => {
    try {
      const res = await API.get('/hubs');
      console.log('API Request: ', res.data);
      // Format Hub Objecct for use with the hub finder (Repurposed from the useInsight hook from the dashboard)
      for (const hub of res.data) {
        user.push({
          userDetails: {
            location: {
              lat: hub.location.lat,
              long: hub.location.long,
            },
            name: hub.name,
          },
        });
      }
    } catch (error) {
      console.log('[API Request Error] - Could not get /hubs');
    }

    // Mock real-world delay
    setTimeout(() => {
      const hubsFound = useHubFinder(user);
      setClosestHub({
        hub: hubsFound.hubClosestTo,
        distance: hubsFound.miles.toFixed(2),
      });
    }, 1200);

    // Set onboarding to true
    try {
      await AsyncStorage.setItem('onboarding', 'true');
    } catch (error) {
      console.log('[Storage Error] - Unable to save data');
    }

    setTimeout(() => {
      setOnboarded(true);
      navigation.navigate('home');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: 250,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {Object.keys(closestHub).length ? (
          <Image source={echoHub} style={{ width: 100 }} resizeMode="contain" />
        ) : (
          <LottieView
            ref={loader}
            source={require('../assets/animations/echo-logo-loader.json')}
            speed={1}
            style={{ width: 200 }}
          />
        )}
        <Text style={styles.loadingText}>
          {Object.keys(closestHub).length
            ? `Your closest hub is Echo ${closestHub.hub}, it's currently ${closestHub.distance} Miles Away 📍`
            : 'Please wait, while we find your local Echo hub'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.blue,
  },
  loadingText: {
    color: 'white',
    fontFamily: Theme.fonts.body,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 150,
  },
});
