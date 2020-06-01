import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  ScrollView,
  Picker,
} from 'react-native';
import Theme from '../constants/Theme';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/images/logo-icon.png';
import { useMemoOne } from 'use-memo-one';

export default function OnboardingScreen() {
  const [questions, setQuestions] = useState([
    {
      question: [
        'Please answer the following questions as accurately as possible.',
      ],
      multipleQuestion: false,
      textQuestion: false,
      numerical: false,
    },
    {
      question: ['Do you have access to shelter?', 'Are you trapped?'],
      multipleQuestion: false,
      textQuestion: false,
      numerical: false,
    },
    {
      question: [
        'Do you have access to food & water?',
        'What level do you have?',
      ],
      multipleQuestion: true,
      textQuestion: false,
      numerical: false,
    },
    {
      question: [
        'Do you have any health complications or injuries?',
        'What health complications or injuries do you have?',
      ],
      multipleQuestion: false,
      textQuestion: true,
      numerical: false,
    },
    {
      question: ['Are you with any other adults?', 'How many?'],
      multipleQuestion: false,
      textQuestion: true,
      numerical: true,
    },
    {
      question: ['Are you with any minors?', 'How many?'],
      multipleQuestion: false,
      textQuestion: true,
      numerical: true,
    },
  ]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [subQuestionIndex, setSubQuestionIndex] = useState(0);
  const [isMultipleQuestion, setMultipleQuestion] = useState(false);
  const [isTextQuestion, setTextQuestion] = useState(false);
  const [userDetails, setUserDetails] = useState([
    {
      userDetails: {
        name: '',
        location: {
          lat: 0,
          long: 0,
        },
        age: 0,
        gender: '',
        pregnant: false,
        adultsWith: 0,
        minorsWith: 0,
      },
      stats: {
        food: '',
        health: {
          complications: [],
        },
        shelter: false,
        trapped: false,
      },
      sos: {
        active: false,
        message: 'n/a',
      },
    },
  ]);
  const [textQuestionValue, setTextQuestionValue] = useState('');
  const [multipleQuestionValue, setMultipleQuestionValue] = useState('');
  const [isNumerical, setNumerical] = useState(false);
  const [isLastQuestion, setLastQuestion] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(false);
  const [adultsWith, setAdultsWith] = useState(0);
  const [minorsWith, setMinorsWith] = useState(0);
  const [injury, setInjury] = useState('');
  const [isFemale, setFemale] = useState(false);
  const [isPregnant, setPregnant] = useState(false);
  const [isMale, setMale] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(0);
  const [isComplete, setComplete] = useState(false);

  const [yumyum, setYumyum] = useState('');

  const fadeIn = new Animated.Value(0);
  const fadeOut = useMemoOne(() => new Animated.Value(1), [fadeOut]);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    }, 1800);

    setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
      setQuestionIndex(1);
    }, 3800);
  }, []);

  const onButtonNo = () => {
    if (subQuestionIndex > 0) {
      setSubQuestionIndex((subQuestions) => subQuestions - 1);
    }
    setQuestionIndex((questions) => questions + 1);

    console.log(
      'Multiple Question State: ',
      questions[questionIndex].multipleQuestion,
    );
    console.log(
      'No Question Index State: ',
      questions[questionIndex].multipleQuestion,
    );
    console.log('No Question Index Object: ', questions[questionIndex]);

    if (questions[questionIndex - 1].multipleQuestion) {
      console.log('Q?', questions[questionIndex + 1].multipleQuestion);
      setMultipleQuestion((multipleQuestion) => !multipleQuestion);
    }
  };

  const onButtonYes = () => {
    // End of situation questions
    if (isLastQuestion) {
      console.log('End of questions');
      setPersonalDetails(true);
    } else {
      if (questions[questionIndex].question.length > 1) {
        // Increment Sub Question
        setSubQuestionIndex((subQuestions) => subQuestions + 1);

        // Multiple Answer Question
        if (questions[questionIndex].multipleQuestion) {
          setMultipleQuestion((multipleQuestion) => !multipleQuestion);
        } else {
          setMultipleQuestion(false);
        }

        // Text Answer Question
        if (questions[questionIndex].textQuestion) {
          setTextQuestion((textQuestion) => !textQuestion);

          if (questions[questionIndex].numerical) {
            setNumerical(true);
          } else {
            setNumerical(false);
          }
        } else {
          setTextQuestion(false);
        }

        if (subQuestionIndex > 0) {
          setSubQuestionIndex(0);
          setQuestionIndex((questions) => questions + 1);
        }

        if (questionIndex === 5) {
          setLastQuestion(true);
        }

        // Set Question Data
        switch (questionIndex) {
          case 1:
            setUserDetails([
              ...userDetails,
              (userDetails[0].stats.shelter = true),
            ]);
            break;

          default:
            break;
        }

        // Set Sub Question Data
        switch (questions[questionIndex].question[subQuestionIndex]) {
          case 'Are you trapped?':
            setUserDetails([
              ...userDetails,
              (userDetails[0].stats.trapped = true),
            ]);
            break;
          case 'What health complications or injuries do you have?':
            setUserDetails([
              ...userDetails,
              (userDetails[0].stats.health.complications = textQuestionValue.split(
                ' ',
              )),
            ]);
            break;
          case 'How many?':
            if (questionIndex === 4) {
              setUserDetails([
                ...userDetails,
                (userDetails[0].userDetails.adultsWith = textQuestionValue),
              ]);
            } else {
              setUserDetails([
                ...userDetails,
                (userDetails[0].stats.trapped = textQuestionValue),
              ]);
            }
            break;
          default:
            break;
        }
        console.log('User Details Object: ', userDetails);
      } else {
        setQuestionIndex((questions) => questions + 1);
        if (questions[questionIndex].multipleQuestion) {
          console.log('Multiple Increment', questions[questionIndex]);
          setMultipleQuestion((multipleQuestion) => !multipleQuestion);
        } else {
          setMultipleQuestion(false);
        }
      }
    }
  };

  const onMultipleQuestion = (level) => {
    console.log('On Multiple Question....');
    setMultipleQuestionValue(level);
    onButtonYes();
  };

  const onPersonalDetails = () => {
    // Set Users Personal Details
    setUserDetails([
      ...userDetails,
      (userDetails[0].userDetails.name = userName),
    ]);

    setUserDetails([
      ...userDetails,
      (userDetails[0].userDetails.age = userAge),
    ]);

    setUserDetails([
      ...userDetails,
      (userDetails[0].userDetails.gender = isMale ? 'Male' : 'Female'),
    ]);

    setUserDetails([
      ...userDetails,
      (userDetails[0].userDetails.pregnant = isPregnant),
    ]);

    setUserDetails([
      ...userDetails,
      (userDetails[0].stats.food = multipleQuestionValue),
    ]);

    console.log('[********Final Object*********]: ', userDetails);
  };

  const settingUpAccount = () => {};

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeIn }]}>
        <View style={styles.brandingContainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandingText}>
            {personalDetails ? 'Now enter your details' : 'Welcome to Echo'}
          </Text>
        </View>
        {!personalDetails && (
          <View style={styles.questionsContainer}>
            <View style={styles.questionItem}>
              <Animated.Text
                style={[styles.questionText, { opacity: fadeOut }]}
              >
                {questions[questionIndex].question[subQuestionIndex]}
              </Animated.Text>
            </View>
          </View>
        )}
      </Animated.View>
      {personalDetails && (
        <View style={{ flex: 2, alignItems: 'center' }}>
          <LinearGradient
            colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <ScrollView
              style={{ width: '100%', height: 900, marginTop: 50 }}
              contentContainerStyle={{
                height: 600,
                alignItems: 'center',
              }}
            >
              <TextInput
                style={styles.personalDetailsTextInput}
                onChangeText={(text) => setUserName(text)}
                value={userName}
                autoFocus={true}
                returnKeyType="default"
                onSubmitEditing={onPersonalDetails}
                placeholder="Name"
                placeholderTextColor="white"
              />
              <TextInput
                style={styles.personalDetailsTextInput}
                onChangeText={(text) => setUserAge(text)}
                value={userAge}
                autoFocus={true}
                returnKeyType="default"
                onSubmitEditing={onPersonalDetails}
                placeholder="Age"
                placeholderTextColor="white"
              />
              <View style={{ flexDirection: 'row', height: 80 }}>
                <TouchableOpacity
                  disabled={isMale ? true : false}
                  onPress={() => {
                    setMale(true), setComplete(true);
                  }}
                  style={{ opacity: isMale ? 0.5 : 1 }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 10,
                      backgroundColor: Theme.colors.blue,
                      height: 'auto',
                      borderRadius: 5,
                      width: 100,
                      padding: 10,
                      margin: 5,
                    }}
                  >
                    <Text style={styles.questionText}>Male</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={isMale ? true : false}
                  onPress={() => {
                    setFemale(true), setComplete(true);
                  }}
                  style={{ opacity: isFemale ? 0.5 : 1 }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 10,
                      backgroundColor: Theme.colors.blue,
                      height: 'auto',
                      borderRadius: 5,
                      width: 100,
                      padding: 10,
                      margin: 5,
                    }}
                  >
                    <Text style={styles.questionText}>Female</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {isFemale && (
                <>
                  <Text style={styles.questionText}>Are you pregnant?</Text>
                  <View style={{ flexDirection: 'row', height: 100 }}>
                    <TouchableOpacity onPress={setPregnant(true)}>
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 10,
                          backgroundColor: Theme.colors.blue,
                          height: 'auto',
                          borderRadius: 5,
                          width: 70,
                          padding: 10,
                          margin: 5,
                        }}
                      >
                        <Text style={styles.questionText}>Yes</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setPregnant(false)}>
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 10,
                          backgroundColor: Theme.colors.blue,
                          height: 'auto',
                          borderRadius: 5,
                          width: 70,
                          padding: 10,
                          margin: 5,
                        }}
                      >
                        <Text style={styles.questionText}>No</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {isComplete && (
                <TouchableOpacity onPress={settingUpAccount}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 20,
                      backgroundColor: Theme.colors.blue,
                      height: 'auto',
                      borderRadius: 10,
                      width: 250,
                      padding: 10,
                      margin: 5,
                    }}
                  >
                    <Text style={styles.questionText}>Continue</Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </LinearGradient>
        </View>
      )}
      {isTextQuestion && !personalDetails && (
        <View style={styles.buttonsContainer}>
          <View style={styles.touchable}>
            <LinearGradient
              colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
              style={styles.button}
            >
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setTextQuestionValue(text)}
                value={textQuestionValue}
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={onButtonYes}
                keyboardType={isNumerical ? 'numeric' : 'default'}
              />
            </LinearGradient>
          </View>
        </View>
      )}
      {isMultipleQuestion && !personalDetails && (
        <View style={styles.buttonsMultipleContainer}>
          <TouchableOpacity
            style={styles.touchableMultiple}
            onPress={() => {
              onMultipleQuestion('Low');
            }}
          >
            <LinearGradient
              colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
              style={styles.buttonMultiple}
            >
              <Text style={styles.buttonText}>Low</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableMultiple}
            onPress={() => {
              onMultipleQuestion('Medium');
            }}
          >
            <LinearGradient
              colors={['#1D3D7E', '#183160']}
              style={styles.buttonMultiple}
            >
              <Text style={styles.buttonText}>Medium</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableMultiple}
            onPress={() => {
              onMultipleQuestion('High');
            }}
          >
            <LinearGradient
              colors={['#1D3D7E', '#183160']}
              style={styles.buttonMultiple}
            >
              <Text style={styles.buttonText}>High</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableMultiple}
            onPress={() => {
              onMultipleQuestion('Plenty');
            }}
          >
            <LinearGradient
              colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
              style={styles.buttonMultiple}
            >
              <Text style={styles.buttonText}>Plenty</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {!isMultipleQuestion && !isTextQuestion && !personalDetails && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.touchable} onPress={onButtonYes}>
            <LinearGradient
              colors={[Theme.colors.skyBlue, Theme.colors.oceanBlue]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={onButtonNo}>
            <LinearGradient
              colors={['#1D3D7E', '#183160']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>No</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blue,
  },
  header: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonsMultipleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMultiple: {
    flexBasis: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 35,
    color: 'white',
    fontFamily: Theme.fonts.body,
  },
  touchable: {
    flex: 1,
  },
  touchableMultiple: {
    width: '50%',
  },
  brandingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  brandingText: {
    color: 'white',
    fontFamily: Theme.fonts.body,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    width: 30,
    height: 100,
  },
  questionsContainer: {
    flex: 1,
  },
  questionItem: {
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    color: 'white',
    fontFamily: Theme.fonts.body,
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    fontSize: 25,
    color: 'white',
    fontFamily: Theme.fonts.body,
    height: 50,
    width: 200,
    backgroundColor: Theme.colors.blue,
    borderRadius: 10,
    marginBottom: 335,
    padding: 4,
  },
  personalDetailsTextInput: {
    fontSize: 20,
    color: 'white',
    fontFamily: Theme.fonts.body,
    // height: 50,
    width: 250,
    backgroundColor: Theme.colors.blue,
    borderRadius: 10,
    marginBottom: 30,
    padding: 10,
  },
});
