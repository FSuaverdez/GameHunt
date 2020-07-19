import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import GameCard from './GameCard';
import useResults from '../hooks/useResults';

const GameCardList = ({ title, data, navigation }) => {

    const [getTrending, results, errorMessage, refresh, setRefresh] = useResults();

    if (!data) {
        return null;
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                keyExtractor={(item) => item.slug}
                data={data}
                renderItem={({ item }) => (
                    <GameCard
                        item={item}
                        navigation={navigation} />
                )}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
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