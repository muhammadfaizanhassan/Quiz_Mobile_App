import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native';
import { quizQuestions } from './questions';
import backgroundImage from '../assets/app.jpg'; // Import your background image

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setShowAnswer(true);

    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert("Quiz Completed", `Your final score is ${score}/${quizQuestions.length}`);
      // Optionally reset quiz or navigate to another screen
    }
  };

  return (
    <ImageBackground
      source={backgroundImage} // Use the imported image here
      style={styles.background}
    >
      <View style={styles.quizContainer}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {quizQuestions[currentQuestionIndex].question}
          </Text>
          <FlatList
            data={quizQuestions[currentQuestionIndex].options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  showAnswer && item === quizQuestions[currentQuestionIndex].correctAnswer
                    ? styles.correctOption
                    : showAnswer && item === selectedAnswer
                    ? styles.incorrectOption
                    : null,
                ]}
                onPress={() => !showAnswer && handleAnswer(item)}
                disabled={showAnswer}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {showAnswer && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Correct Answer: {quizQuestions[currentQuestionIndex].correctAnswer}
            </Text>
            <Text style={styles.scoreText}>Current Score: {score}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  
  },
  scoreContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  optionButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  correctOption: {
    backgroundColor: '#4CAF50', // Green for correct answer
  },
  incorrectOption: {
    backgroundColor: '#F44336', // Red for incorrect answer
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  answerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#03DAC6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin:30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default Quiz;
