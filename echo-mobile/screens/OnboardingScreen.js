import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
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
    },
    {
      question: ['Do you have access to shelter?', 'Are you trapped?'],
      multipleQuestion: false,
    },
    {
      question: [
        'Do you have access to food & water?',
        'What level do you have?',
      ],
      multipleQuestion: true,
    },
    {
      question: [
        'Do you have any health complications or injuries?',
        'What health complications or injuries do you have?',
      ],
      multipleQuestion: false,
    },
  ]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [subQuestionIndex, setSubQuestionIndex] = useState(0);
  const [isMultipleQuestion, setMultipleQuestion] = useState(false);

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
    if (questions[questionIndex].question.length > 1) {
      // Increment Sub Question
      setSubQuestionIndex((subQuestions) => subQuestions + 1);
      if (questions[questionIndex].multipleQuestion) {
        console.log('Multiple Increment', questions[questionIndex]);
        setMultipleQuestion((multipleQuestion) => !multipleQuestion);
      } else {
        setMultipleQuestion(false);
      }
    } else {
      setQuestionIndex((questions) => questions + 1);
      console.log('Question Increment', questions[questionIndex]);
      if (questions[questionIndex].multipleQuestion) {
        console.log('Multiple Increment', questions[questionIndex]);
        setMultipleQuestion((multipleQuestion) => !multipleQuestion);
      } else {
        setMultipleQuestion(false);
      }
    }
  };

  const questionOut = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const questionIn = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeIn }]}>
        <View style={styles.brandingContainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandingText}>Welcome to Echo</Text>
        </View>
        <View style={styles.questionsContainer}>
          <View style={styles.questionItem}>
            <Animated.Text style={[styles.questionText, { opacity: fadeOut }]}>
              {questions[questionIndex].question[subQuestionIndex]}
            </Animated.Text>
          </View>
        </View>
      </Animated.View>
      {isMultipleQuestion && (
        <View style={styles.buttonsMultipleContainer}>
          <TouchableOpacity
            style={styles.touchableMultiple}
            onPress={onButtonYes}
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
            onPress={onButtonNo}
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
            onPress={onButtonNo}
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
            onPress={onButtonNo}
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
      {!isMultipleQuestion && (
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
});
