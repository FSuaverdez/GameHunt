import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import useResults from '../hooks/useResults'

const GameList = ({ navigation, route }) => {
  const item = route.params


  return (
    <View style={styles.container}>
      <FlatList
        data={item}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <Text style={styles.txt}> {item.name}</Text>
        )}
      />

    </View>


  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 25,
  },
  image: {
    height: 100,
    width: 100,
  }
});
export default GameList;