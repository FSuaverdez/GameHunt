import React, {useState} from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import Header from './src/components/Header';

const MainStack = createStackNavigator();

const getFonts = () => 
  Font.loadAsync({
    'ShareTechMono-Regular': require('./assets/fonts/ShareTechMono-Regular.ttf'),
    'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
    'Anton-Regular': require('./assets/fonts/Anton-Regular.ttf'),
    'FredokaOne-Regular': require('./assets/fonts/FredokaOne-Regular.ttf'),
    'FiraSansCondensed-Regular': require('./assets/fonts/FiraSansCondensed-Regular.ttf')
});

const App = () => {

  const[fontsLoaded, setfontsLoaded] = useState(false);

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





  if (fontsLoaded){
    return (
      <NavigationContainer theme={ColorScheme == 'dark' ? DarkTheme : MyTheme}>
        <MainStack.Navigator>

          <MainStack.Screen Screen name="HomeScreen" component={HomeScreen} options={{
            headerTitle: props => <Header title="GameHunt" />, headerTitleStyle: {fontFamily: 'ShareTechMono-Regular'}
          }} />
          <MainStack.Screen Screen name="GameScreen" component={GameScreen} options={{
            title: 'GamesDetails', headerTitleStyle: {fontFamily: 'Anton-Regular'}
          }} />

        </MainStack.Navigator>
      </NavigationContainer>
    );
  }

  else {
    return(
      <AppLoading
        startAsync={getFonts}
        onFinish={()=> setfontsLoaded(true)}
        />
    )
  }
}

export default App;


