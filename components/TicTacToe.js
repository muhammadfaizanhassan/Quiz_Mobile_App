import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    if (checkWinner() || !board.includes(null)) {
      setGameOver(true);
      saveGame();
    }
  }, [board]);

  const saveGame = async () => {
    try {
      await AsyncStorage.setItem('@TicTacToeGame', JSON.stringify({ board, isXTurn, gameOver }));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };

  const loadGame = async () => {
    try {
      const savedGame = await AsyncStorage.getItem('@TicTacToeGame');
      if (savedGame) {
        const { board, isXTurn, gameOver } = JSON.parse(savedGame);
        setBoard(board);
        setIsXTurn(isXTurn);
        setGameOver(gameOver);
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameOver(false);
  };

  const restartGame = () => {
    resetGame();
    saveGame();
  };

  const handlePress = (index) => {
    if (board[index] !== null || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const renderSquare = (index) => (
    <TouchableOpacity key={index} style={styles.square} onPress={() => handlePress(index)}>
      <Text style={[styles.squareText, board[index] === 'X' ? styles.textX : styles.textO]}>
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner();
  const status = winner ? `Winner: ${winner}` : board.includes(null) ? `Next player: ${isXTurn ? 'X' : 'O'}` : 'Draw!';

  const handleReset = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset the game?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: resetGame,
        },
      ],
      { cancelable: true }
    );
  };

  const handleRestart = () => {
    Alert.alert(
      'Restart Game',
      'Are you sure you want to restart the game?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Restart',
          onPress: restartGame,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1557682261-7fa5cdf7e2b6'}} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.board}>
          {Array(9)
            .fill()
            .map((_, i) => renderSquare(i))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

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
  },
  status: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    overflow: 'hidden',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderColor: '#555555',
    borderWidth: 1,
  },
  squareText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  textX: {
    color: '#FF6347', // Tomato Red
  },
  textO: {
    color: '#4682B4', // Steel Blue
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default TicTacToe;
