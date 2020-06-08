import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Theme from '../constants/Theme';
import StatBar from '../components/Map/StatBar';
import API from '../utils/API';
import screenLoader from '../assets/animations/ui-screen-loader.gif';

export default function ProfileScreen() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    setInterval(() => {
      (async () => {
        let userID;
        try {
          userID = await AsyncStorage.getItem('userDetails');
          userID = JSON.parse(userID)._id;
        } catch (error) {
          console.log('[Storage Error] - Unable to get data');
        }

        const res = await API.post('/users/user', {
          userID: userID,
        });

        setUser(res.data);
      })();
    }, 3500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>Your Profile</Text>
      {user.length > 0 && (
        <View style={styles.levelsContainer}>
          <Text style={styles.levelText}>Name: {user[0].userDetails.name}</Text>
          <Text style={styles.levelText}>Age: {user[0].userDetails.age}</Text>
          <Text style={styles.levelText}>
            Gender: {user[0].userDetails.gender}
          </Text>
          <Text style={styles.levelText}>Food: {user[0].stats.food}</Text>
          <Text style={styles.levelText}>
            Shelter: {user[0].stats.shelter ? 'True' : 'False'}
          </Text>
          <Text style={styles.levelText}>
            Trapped: {user[0].stats.trapped ? 'True' : 'False'}
          </Text>
        </View>
      )}
      {user.length === null ||
        (user.length === 0 && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image
              style={{ width: 100, resizeMode: 'contain' }}
              source={screenLoader}
            />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: Theme.fonts.bodyText,
    color: 'white',
    fontSize: 20,
    opacity: 0.5,
  },
  screenHeading: {
    marginTop: 40,
    fontFamily: Theme.fonts.heading,
    color: 'white',
    fontSize: 30,
  },
  levelsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 50,
    padding: 20,
  },
  barContainer: {
    marginTop: 10,
    height: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontFamily: Theme.fonts.heading,
    color: 'white',
    fontSize: 20,
    top: -35,
    marginBottom: 15,
    width: '100%',
    // position: 'absolute',
  },
});
