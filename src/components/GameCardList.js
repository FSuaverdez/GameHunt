import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import GameCard from './GameCard';

const GameCardList = ({ title, results, navigation }) => {
    return (
        <ScrollView>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameList', results)}>
                <View style={styles.container}>

                    <Text style={styles.title}>{title} ></Text>


                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.slug}
                        data={results}
                        renderItem={({ item }) => (
                            <GameCard
                                item={item}
                                navigation={navigation} />
                        )}
                    />

                </View>
            </TouchableOpacity >
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginVertical: 20,
        backgroundColor: '#3d3d3d',
        padding: 20,
        borderRadius: 15,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
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
    },

})
export default GameCardList;