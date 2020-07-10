import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image ,StatusBar} from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';

const GameInfo = ({ navigation }) => {

  
  const [getTrending, results, errorMessage] = useResults();

  getTrending(5);

  if(!results){
    return <Text style={styles.loadingTxt}> Loading ... </Text>
  }
  return (
    <View>
      <StatusBar barStyle="light-content"  />
      <GameCardList
        title="Trending Games"
        results={results}
        navigation={navigation} />


    </View>
  );
}
export default GameInfo;
const styles = StyleSheet.create({
  loadingTxt:{
    flex:1,
    color:"white",
  }
})