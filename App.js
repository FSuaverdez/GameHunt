import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/HomeScreen';
import GameList from './src/GameList';
import GameInfo from './src/GameInfo'
import GameScreen from './src/GameScreen';


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

        <MainStack.Screen Screen name="HomeScreen" component={HomeScreen} options={{ title: 'HomeScreen' }} />
        <MainStack.Screen Screen name="GameList" component={GameList} options={{ title: 'GameList' }} />
        {/* <MainStack.Screen Screen name="Games" component={GameInfo} options={{ title: 'Games' }} /> */}
        <MainStack.Screen Screen name="GameScreen" component={GameScreen} options={{ title: 'GamesDetails' }} />

      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;


