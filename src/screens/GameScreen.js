import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Image, FlatList, BackHandler, Linking } from 'react-native';
import useResults from '../hooks/useResults';
import { Video } from 'expo-av';
import RAWG from '../api/RAWG';



const GameScreen = ({ navigation, route }) => {


  const [trending, getTrending, results, setResults, top, getTop, getGames, gameInfo, getResult, screenshots, getScreens, errorMessage] = useResults();

  const item = route.params;

  navigation.setOptions({
    title: item.name,
  });

  var platforms = "";
  if (item.parent_platforms && platforms === '') {

    for (let i = 0; i < item.parent_platforms.length; i++) {
      platforms += item.parent_platforms[i].platform.id == 3 ? "Mac" : item.parent_platforms[i].platform.name;
      if (i + 1 != item.parent_platforms.length) {
        platforms += ", ";
      }

    }
  }


  if (gameInfo) {
    var developers = "";
    if (gameInfo.developers && developers === '') {

      for (let i = 0; i < gameInfo.developers.length; i++) {
        developers += gameInfo.developers[i].name;
        if (i + 1 != gameInfo.developers.length) {
          developers += ", ";
        }

      }
    }
  }


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
      <Text style={styles.rating}>{platforms}</Text>
      <Text style={styles.description}> {gameInfo.description_raw}</Text>
      <Text style={styles.developerText}><Text style ={{fontWeight:'bold',textDecorationLine:'underline'}}>DEVELOPERS:</Text> {"\n"}{developers}</Text>
      {item.released ? <Text style={styles.developerText}><Text style ={{fontWeight:'bold',textDecorationLine:'underline'}}>RELEASE DATE:</Text> {"\n"}{item.released}</Text> : null}
      {!gameInfo.stores ? null : <View style={{ margin: 20 }}>
        <Text style={styles.clip}>Stores: </Text>
        <FlatList
          horizontal
          data={gameInfo.stores}
          keyExtractor={(item) => item.store.name}
          renderItem={({ item }) => {
            var url = item.url
            return (
              <View style={styles.storeContainer}>
                <Text style={styles.storeText} onPress={(em) => Linking.openURL(url)}>{item.store.name}</Text>
              </View>

            );
          }} />
      </View>}
      {!gameInfo.clip ? null : <View style={styles.media_container}>
        <Text style={styles.clip}>Clip: </Text>
        <Video
          style={styles.video}
          useNativeControls
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
    margin: 5,
    alignSelf: 'center'
  },
  rating: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    marginHorizontal:40,
    textAlign:'center'
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
    margin: 20,
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
  },
  storeText: {
    color: 'white',
    fontSize: 16,
    margin: 5,
    backgroundColor: '#3d3d3d',
    padding: 15,
    borderRadius: 20,
  },
  storeContainer: {
    marginVertical: 10
  },
  developerText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
    marginHorizontal:20,
  }
});
export default GameScreen;