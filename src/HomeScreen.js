import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../src/components/GameCard';
import useResults from './hooks/useResults';

const GameInfo = ({ navigation }) => {


  const [getTrending, results, errorMessage] = useResults();

  getTrending(5);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('GameList', results)}>
        <Text style={styles.txt}>Trending Games ></Text>
      </TouchableOpacity>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.slug}
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5} onPress={() => {
            navigation.navigate('GameScreen', item);
          }}>
            <Image source={{ uri: item.background_image }} style={styles.image} />
            <Text style={styles.txt2}>{item.name}</Text>

          </TouchableOpacity>
        )}
      />


    </View>
  );
}
export default GameInfo;
const styles = StyleSheet.create({

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
    height: 100,
    width: 200,
    marginHorizontal: 5,
    borderRadius: 20,
  }
})