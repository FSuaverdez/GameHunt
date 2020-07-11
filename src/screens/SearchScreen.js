import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';
const SearchScreen = ({ navigation }) => {
    const [term, setTerm] = useState('');

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


    return (
        <View>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => getGames(20,term)}
            />

            {!results ? null
                : <FlatList
                    data={results}
                    keyExtractor={(item) => item.slug}
                    renderItem={({ item }) => (
                        <GameCard
                                item={item}
                                navigation={navigation} />
                    )}
                />

            }
        </View>
    );
}
export default SearchScreen;
const styles = StyleSheet.create({
    txt: {
        color: "white",

    }
})