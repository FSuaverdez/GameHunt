import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Image, FlatList, BackHandler, Linking, Alert, TouchableOpacity } from 'react-native';
import useResults from '../hooks/useResults';
import { Video } from 'expo-av';
import RAWG from '../api/RAWG';
import * as Network from 'expo-network';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import * as ScreenOrientation from 'expo-screen-orientation';

const GameScreen = ({ navigation, route }) => {


  const checkConnection = async () => {
    const response = await Network.getNetworkStateAsync();

    if (response.isInternetReachable == false) {
      Alert.alert(
        "Connection Error",
        "Connect to the internet to continue browsing.",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
    }
  }
  const [isMounted, setMount] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      setMount(true);
      return () => {
        setMount(false);
      };
    }, [])
  );

  const [trending, getTrending, results, setResults, top, getTop, getGames, gameInfo, getResult, screenshots, getScreens, errorMessage, getTopYear, topYear] = useResults();

  const item = route.params;

  navigation.setOptions({
    headerTitle: props => <Header title={item.name} />, headerTitleStyle: { fontFamily: 'ShareTechMono-Regular' }
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
    var genres = "";
    if (gameInfo.genres && genres === '') {

      for (let i = 0; i < gameInfo.genres.length; i++) {
        genres += gameInfo.genres[i].name;
        if (i + 1 != gameInfo.genres.length) {
          genres += ", ";
        }

      }
    }
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
    getResult(item.id, isMounted);
    getScreens(item.id, isMounted);
    checkConnection();
  }, []);

  if (errorMessage !== null) {
    checkConnection();
    return <View style={{
      flex: 1,
      alignItems: 'center',
      padding: 20
    }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>SOMETHING WENT WRONG.</Text>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Please restart the app and make sure you have internet connection.</Text>
    </View>
  }
  else if (!gameInfo) {
    checkConnection();
    return <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000'
    }}>
      <Image source={require('../../assets/loading.png')} style={{ height: 100, width: 160 }} />
    </View>
  }

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);



  return (

    <ScrollView>
      <Image source={{ uri: item.background_image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.rating}>Ratings: {item.rating} / 5</Text>
      {!platforms ? null : <Text style={styles.rating}>{platforms}</Text>}
      <Text style={styles.description}>
        {gameInfo.description_raw}
        {!gameInfo.description_raw.length ? "" : '\n\n\n\n'}
        {!developers.length ? null : <Text style={styles.developerText}><Text style={{ fontWeight: 'bold' }}>DEVELOPERS:</Text> {"\n"}{developers + '\n\n'}</Text>}
        {!genres ? null : <Text style={styles.developerText}><Text style={{ fontWeight: 'bold' }}>GENRES:</Text> {"\n"}{genres + '\n\n'}</Text>}
        {item.released ? <Text style={styles.developerText}><Text style={{ fontWeight: 'bold' }}>RELEASE DATE:</Text> {"\n"}{item.released}</Text> : null}
      </Text>

      {!gameInfo.stores.length ? null : <View style={{ margin: 20 }}>
        <Text style={styles.clip}>Stores: </Text>
        <FlatList
          horizontal
          data={gameInfo.stores}
          keyExtractor={(item) => item.store.name}
          renderItem={({ item }) => {
            var url = item.url
            return (
              <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(url)}>
                <View style={styles.storeContainer}>
                  <Text style={styles.storeText} >{item.store.name}</Text>
                </View>
              </TouchableOpacity>
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
          resizeMode="contain"
          shouldPlay={false}
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
              <Image style={styles.screenshot} resizeMode='cover' resizeMethod='resize' source={{ uri: item.image }} />
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
    //fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    margin: 5,
    alignSelf: 'center',
    fontFamily: 'Anton-Regular'
  },
  rating: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    marginHorizontal: 40,
    textAlign: 'center',
    fontFamily: 'FiraSansCondensed-Regular'
  },
  description: {
    color: 'white',
    fontSize: 16,
    margin: 20,
    backgroundColor: '#3d3d3d',
    padding: 20,
    borderRadius: 20,
    fontFamily: 'FiraSansCondensed-Regular'
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
    //fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Anton-Regular'
  },
  screenshot: {
    height: 160,
    width: 280,
    borderRadius: 20,
    margin: 10,
  },
  storeText: {
    color: 'white',
    fontSize: 16,
    margin: 5,
    backgroundColor: '#3d3d3d',
    padding: 15,
    borderRadius: 20,
    fontFamily: 'FiraSansCondensed-Regular'
  },
  storeContainer: {
    marginVertical: 10
  },
  developerText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
  }
});
export default GameScreen;