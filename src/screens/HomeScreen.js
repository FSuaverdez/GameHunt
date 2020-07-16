import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, StatusBar, ScrollView, FlatList } from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');

  const [trending, getTrending, results, setResults, top, getTop, getGames, errorMessage] = useResults();



  if (!top && !trending) {
    return <Text style={styles.loadingTxt}> Loading ... </Text>
  }



  return (
    <View style={{ flex: 1 }}>

      <SearchBar
        term={term}
        onTermChange={newTerm =>{
          setTerm(newTerm);
          getGames(10, newTerm);
        }}
        onTermSubmit={() => {
          getGames(10, term);
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
        </ScrollView>
        :
        <FlatList

          data={results}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={() => {
                navigation.navigate('GameScreen', item);
              }}>
                <Image source={{ uri: item.background_image }} style={styles.image} />
                <Text style={styles.txt2}>{item.name}</Text>

              </TouchableOpacity>
            </View>
          )}
        />
      }





    </View>
  );
};

const styles = StyleSheet.create({
  loadingTxt: {
    flex: 1,
    color: "white",
  },
  powered: {
    color: '#a9a9a9',
    fontSize: 12,
    textDecorationLine: "underline",
  },
  txt: {
    color: '#fff',
    fontSize: 30,
  },
  txt2: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    marginHorizontal: 5
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
    marginHorizontal: 10,
    width: 350,
    paddingBottom: 20,
    borderRadius: 20,
    marginBottom: 20
  }
})


export default HomeScreen;
