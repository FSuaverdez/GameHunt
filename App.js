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
import SearchScreen from './src/screens/SearchScreen';
import Header from './src/components/Header';

const MainStack = createStackNavigator();
const SearchStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
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


  function MainStackScreen() {
    return (
      <MainStack.Navigator>

        <MainStack.Screen Screen name="HomeScreen" component={HomeScreen}
          options={{
            headerTitle: props => <Header title="GameHunt" />,
          }} />
        <MainStack.Screen Screen name="GameList" component={GameList} options={{ title: 'GameList' }} />
        <MainStack.Screen Screen name="GameScreen" component={GameScreen} options={{ title: 'GamesDetails' }} />

      </MainStack.Navigator>
    );
  }

  function SearchStackScreen() {
    return (
      <SearchStack.Navigator>

        <SearchStack.Screen
          Screen name="SearchScreen"
          component={SearchScreen}
          options={{ headerTitle: props => <Header title="Search" /> }} />


      </SearchStack.Navigator>
    );
  }



  return (
    <NavigationContainer theme={ColorScheme == 'dark' ? DarkTheme : MyTheme}>
      <Tab.Navigator activeColor='white' inactiveColor='gray' barStyle={{ backgroundColor: '#000' }}>
        <Tab.Screen
          name="HomeScreen"
          component={MainStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: 'white',
            tabBarIcon: ({ color }) => (
              <Icon name='ios-home' color={color} size={26} />
            )
          }} />
        <Tab.Screen
          name="SearchScreen"
          component={SearchStackScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarColor: '#000',
            tabBarIcon: ({ color }) => (
              <Icon name='ios-search' color={color} size={26} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;


