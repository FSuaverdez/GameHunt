import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../src/components/GameCard';
const GameInfo = ({ navigation }) => {
  const [details, setDetails] = useState([
    { title: 'GTA', rating: 5, body: '"Yah FOOL"', id: '1', img: require('../assets/GTA.png') },
    { title: 'NBA', rating: 8, body: '"Ball is Life"', id: '2', img: require('../assets/NBA.jpg') },
    { title: 'LoL', rating: 5, body: '"League of Legends"', id: '3', img: require('../assets/lol.jpg') },
    { title: 'PUBG', rating: 8, body: '"Barilan"', id: '4', img: require('../assets/pubg.jpg') }
  ]);
  return (
    <View>
      <Text style={styles.txt}>Top List Games </Text>
      <View>
        <FlatList
          horizontal
          data={details}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('GameScreen', item)}>
              <Image source={item.img} style={styles.image} />
              <TouchableOpacity onPress={() => navigation.navigate('GameList', item)}>
                <Text style={styles.txt2}>{item.title}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

      </View>

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
    fontSize: 25,
    justifyContent: 'center',
    marginHorizontal: 5
  },
  image: {
    height: 100,
    width: 200,
    marginHorizontal: 5,
    borderRadius: 20,
  }
})