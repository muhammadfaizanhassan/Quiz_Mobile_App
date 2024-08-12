import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TicTacToe from './components/TicTacToe';
import WordSearch from './components/WordSearch';
import Crossword from './components/Crossword';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557682261-7fa5cdf7e2b6' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Puzzle Hub</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TicTacToe')}>
          <Text style={styles.buttonText}>Play TicTacToe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WordSearch')}>
          <Text style={styles.buttonText}>Play Word Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crossword')}>
          <Text style={styles.buttonText}>Play Crossword</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} options={{ title: 'TicTacToe' }} />
        <Stack.Screen name="WordSearch" component={WordSearch} options={{ title: 'Word Search' }} />
        <Stack.Screen name="Crossword" component={Crossword} options={{ title: 'Crossword' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: 'AvenirNext-DemiBold',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'AvenirNext-DemiBold',
  },
});

export default App;
