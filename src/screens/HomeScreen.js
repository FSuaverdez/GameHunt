import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, StatusBar, ScrollView, FlatList, BackHandler, Alert } from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';
import { useFocusEffect } from '@react-navigation/native';
import * as Network from 'expo-network';

const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [isMounted, setMount] = useState(true);

  const [trending, getTrending, results, setResults, top, getTop, getGames, gameInfo, getResult, screenshots, getScreens, errorMessage, getTopYear, topYear] = useResults();

  const checkConnection = async () => {
    const response = await Network.getNetworkStateAsync();

    if (response.isInternetReachable == false) {
      Alert.alert(
        "Connection Error",
        "Connect to the internet to continue browsing.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }

  useEffect(() => {
    getTrending(10, isMounted);
    getTop(10, isMounted);
    getTopYear(10, new Date().getFullYear(), isMounted);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setMount(true);
      return () => {
        setMount(false);
      };
    }, [])
  );




  if (errorMessage !== null) {
    checkConnection();
    return <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{ color: 'white' }}>SOMETHING WENT WRONG.....</Text>
    </View>
  }
  else if (!top && !trending) {
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



  return (
    <View style={{ flex: 1 }}>

      <SearchBar
        term={term}
        onTermChange={newTerm => {
          setTerm(newTerm);
          getGames(10, newTerm, isMounted);
        }}
        onTermSubmit={() => {
          getGames(10, term, isMounted);
        }}
      />
      <StatusBar barStyle="light-content" />

      {!term ?
        <ScrollView>
          <GameCardList
            title='Trending Games'
            data={trending}
            navigation={navigation} />
          <GameCardList
            title='Top Games'
            data={top}
            navigation={navigation} />
          <GameCardList
            title='Best of the Year'
            data={topYear}
            navigation={navigation} />
        </ScrollView>
        :
         results&&results.length==0 ?
          <View style={{
            flex: 1,
            alignItems: 'center',
            padding:20
          }}>
            <Text style={{color:'white',fontWeight:'bold', fontSize:25}}>No Results Found!</Text>
          </View>
          :
          <FlatList
            data={results}
            keyExtractor={(item) => item.slug}
            renderItem={({ item }) => {
              if (item.parent_platforms) {
                var platforms = "";
                for (var i = 0; i < item.parent_platforms.length; i++) {
                  platforms += item.parent_platforms[i].platform.id == 3 ? "Mac" : item.parent_platforms[i].platform.name;
                  if (i + 1 != item.parent_platforms.length) {
                    platforms += ", ";
                  }

                }
              }
              return (
                <View style={styles.container}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    navigation.navigate('GameScreen', item);
                  }}>
                    <Image source={{ uri: item.background_image }} resizeMode='cover' resizeMethod='resize' style={styles.image} />
                    <Text style={styles.gameTitle}>{item.name}</Text>
                    <Text style={styles.txt}>Ratings {item.rating}/5</Text>

                    {!platforms ? null : <Text style={styles.txt}>{platforms}</Text>}

                  </TouchableOpacity>
                </View>
              );
            }}
          />
      }





    </View>
  );
};

const styles = StyleSheet.create({
  loadingTxt: {
    color: "white",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'

  },
  powered: {
    color: '#a9a9a9',
    fontSize: 12,
    textDecorationLine: "underline",
  },
  txt: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 15,
    textAlign: 'center'

  },
  gameTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: 5,
    textAlign: 'center',
    marginHorizontal: 20
  },
  image: {
    height: 200,
    width: 350,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#3d3d3d',
    marginHorizontal: 20,
    width: 350,
    borderRadius: 20,
    marginVertical: 10,
    paddingBottom: 10
  }
})


export default HomeScreen;
