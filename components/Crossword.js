import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Crossword = () => {
  const [board, setBoard] = useState([
    ['C', 'A', 'T', '', 'D', 'O', 'G'],
    ['', '', 'O', '', '', '', 'O'],
    ['P', 'I', 'G', '', 'R', 'A', 'T'],
    ['', '', 'A', '', '', '', ''],
    ['H', 'E', 'N', '', 'C', 'O', 'W'],
  ]);

  const saveGame = async () => {
    try {
      await AsyncStorage.setItem('@CrosswordGame', JSON.stringify(board));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };

  const loadGame = async () => {
    try {
      const savedGame = await AsyncStorage.getItem('@CrosswordGame');
      if (savedGame) {
        setBoard(JSON.parse(savedGame));
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  };

  const resetGame = () => {
    setBoard([
      ['C', 'A', 'T', '', 'D', 'O', 'G'],
      ['', '', 'O', '', '', '', 'O'],
      ['P', 'I', 'G', '', 'R', 'A', 'T'],
      ['', '', 'A', '', '', '', ''],
      ['H', 'E', 'N', '', 'C', 'O', 'W'],
    ]);
  };

  const handleChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value.toUpperCase();
    setBoard(newBoard);
  };

  const renderCell = (row, col) => (
    <TextInput
      key={`${row}-${col}`}
      style={styles.cell}
      maxLength={1}
      value={board[row][col]}
      onChangeText={(value) => handleChange(row, col, value)}
    />
  );

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557682261-7fa5cdf7e2b6' }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.board}>
          {board.map((row, rowIndex) =>
            row.map((_, colIndex) => renderCell(rowIndex, colIndex))
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={saveGame}>
            <Text style={styles.buttonText}>Save Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reset Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');
const boardWidth = Math.min(width * 0.8, 300); // Ensure the board fits within the screen
const cellSize = boardWidth / 5.5; // Adjust cell size based on board width

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
    paddingHorizontal: 10,
  },
  board: {
    width: boardWidth,
    height: boardWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  cell: {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: '#888',
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: '#333333',
    lineHeight: cellSize, // Centers text vertically
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    margin:80,
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
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Crossword;
