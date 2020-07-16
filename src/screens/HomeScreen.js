import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, StatusBar, ScrollView, } from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';
import { useFocusEffect } from '@react-navigation/native';
const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');

  const [trending, getTrending, results, setResults, top, getTop, errorMessage] = useResults();



  if (!top && !trending) {
    return <Text style={styles.loadingTxt}> Loading ... </Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => getGames(20, term)}
        />
        <StatusBar barStyle="light-content" />

        <GameCardList
          title='Trending Games'
          data={trending}
          navigation={navigation} />
        <GameCardList
          title='Top Games'
          data={top}
          navigation={navigation} />
      </ScrollView>


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
  }
})


export default HomeScreen;
