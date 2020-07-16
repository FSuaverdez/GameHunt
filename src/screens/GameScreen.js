import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Image, FlatList, BackHandler } from 'react-native';
import useResults from '../hooks/useResults';
import { Video } from 'expo-av';
import RAWG from '../api/RAWG';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';



const GameScreen = ({ navigation, route }) => {



  const [gameInfo, setGameInfo] = useState(null);
  const [screenshots, setScreens] = useState(null);
  const [trending, getTrending, results, setResults, top, getTop, errorMessage] = useResults();


  const isFocused = useIsFocused();


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setResults(null);
        console.log(results);
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const item = route.params;

  navigation.setOptions({
    title: item.name,
    headerLeft: (props) => (
      <HeaderBackButton
        onPress={() => {
          setResults(null);
          console.log(results);
          navigation.navigate('HomeScreen');
        }}
      />
    )
  });
  const getResult = async (id) => {
    const response = await RAWG.get(`/games/${id}`);
    setGameInfo(response.data);
  };
  const getScreens = async (id) => {
    const response = await RAWG.get(`/games/${id}/screenshots`);
    setScreens(response.data.results);
  };


  useEffect(() => {
    getResult(item.id);
    getScreens(item.id);
  }, []);


  if (errorMessage !== null) {
    return <Text style={{ alignSelf: 'center', color: 'white' }}>SOMETHING WENT WRONG.....</Text>;
  }
  else if (!gameInfo) {
    return <Text style={{ alignSelf: 'center', color: 'white' }}>LOADING.....</Text>;
  }



  return (

    <ScrollView>
      <Image source={{ uri: item.background_image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.rating}>Ratings: {item.rating} / {item.rating_top}</Text>
      <Text style={styles.description}> {gameInfo.description_raw}</Text>
      {!gameInfo.clip ? null : <View style={styles.media_container}>
        <Text style={styles.clip}>Clip: </Text>
        <Video
          style={styles.video}
          source={{ uri: gameInfo.clip.clip }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
        />
      </View>}
      {!screenshots ? null : <View style={styles.media_container}>
        <Text style={styles.clip}>Screenshots: </Text>
        <FlatList
          horizontal
          data={screenshots}
          keyExtractor={(item) => item.image}
          renderItem={({ item }) => {
            return (
              <Image style={styles.screenshot} source={{ uri: item.image }} />
            )
          }} />
      </View>}
    </ScrollView>



  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    margin: 20,
    alignSelf: 'center'
  },
  rating: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  description: {
    color: 'white',
    fontSize: 16,
    margin: 20,
    backgroundColor: '#3d3d3d',
    padding: 20,
    borderRadius: 20,
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 350,
    borderRadius: 20,
    margin: 20
  },
  video: {
    alignSelf: 'center',
    height: 200,
    width: 350,
    borderRadius: 20,
  },
  media_container: {
    alignSelf: 'center',
    borderRadius: 20,
    height: 250,
    width: 350,
    marginVertical: 10,
  },
  clip: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  screenshot: {
    height: 160,
    width: 280,
    borderRadius: 20,
    margin: 10
  }
});
export default GameScreen;