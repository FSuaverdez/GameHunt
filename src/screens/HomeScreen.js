import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';

const HomeScreen = ({ navigation }) => {


  const [
    getTrending,
    trending,
    errorMessage,
    gameInfo,
    screenshots,
    getResult,
    getScreens,
    getTop,
    top,
    dev,
    getDev,
    getGames,
    results
] = useResults();

  useEffect(() => {
    getTrending(10);
    getTop(10);
    getDev(10);
  }, [])

  if (!trending && !top) {
    return <Text style={styles.loadingTxt}> Loading ... </Text>
  }
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <GameCardList
        title="Trending Games"
        results={trending}
        navigation={navigation} />

      <GameCardList
        title="Top Games"
        results={top}
        navigation={navigation} />
      



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingTxt: {
    flex: 1,
    color: "white",
  }
});
export default HomeScreen;
