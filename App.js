import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import GameList from './src/screens/GameList';
import GameScreen from './src/screens/GameScreen';
import Header from './src/components/Header';

const MainStack = createStackNavigator();
const App = () => {

  const ColorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'purple',
      background: '#232524',
      card: 'black',
      text: 'white',
      border: 'green',
    },
  };






  return (
    <NavigationContainer theme={ColorScheme == 'dark' ? DarkTheme : MyTheme}>
      <MainStack.Navigator>

        <MainStack.Screen Screen name="HomeScreen" component={HomeScreen} options={{
          headerTitle: props => <Header title="GameHunt" />,
        }} />
        <MainStack.Screen Screen name="GameList" component={GameList} options={{ title: 'GameList' }} />
        <MainStack.Screen Screen name="GameScreen" component={GameScreen} options={{
          title: 'GamesDetails',
        }} />

      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;


