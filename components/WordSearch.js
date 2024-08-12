import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WordSearch = () => {
  // Define the generateBoard function before using it
  const generateBoard = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newBoard = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      newBoard.push(row);
    }
    return newBoard;
  };

  const [board, setBoard] = useState(generateBoard());
  const [selectedWord, setSelectedWord] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadGame();
  }, []);

  const saveGame = async () => {
    try {
      await AsyncStorage.setItem('@WordSearchGame', JSON.stringify({ board, score }));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };

  const loadGame = async () => {
    try {
      const savedGame = await AsyncStorage.getItem('@WordSearchGame');
      if (savedGame) {
        const { board, score } = JSON.parse(savedGame);
        setBoard(board);
        setScore(score);
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  };

  const resetGame = () => {
    setBoard(generateBoard());
    setScore(0);
    setSelectedWord('');
  };

  const restartGame = () => {
    resetGame();
    saveGame();
  };

  const handlePress = (letter) => {
    setSelectedWord(selectedWord + letter);
  };

  return (
    <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1557682261-7fa5cdf7e2b6'}} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.status}>Score: {score}</Text>
        <View style={styles.board}>
          {board.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <TouchableOpacity key={`${rowIndex}-${colIndex}`} style={styles.square} onPress={() => handlePress(letter)}>
                <Text style={styles.squareText}>{letter}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
        <Text style={styles.selectedWord}>Selected Word: {selectedWord}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');
const boardWidth = Math.min(width * 0.9, 300); // Ensure the board fits within the screen and remains centered
const cellSize = boardWidth / 10; // Adjust cell size based on board width

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
  },
  status: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  board: {
    width: boardWidth,
    height: boardWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  square: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderColor: '#555555',
    borderWidth: 1,
  },
  squareText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  selectedWord: {
    fontSize: 20,
    marginVertical: 20,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default WordSearch;
