import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import GameCardList from '../components/GameCardList';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';

const GameInfo = ({ navigation }) => {
    const [term, setTerm] = useState('');

    const [getTrending, results, errorMessage] = useResults();


    return (
        <View>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => console.log(term)}
            />
        </View>
    );
}
export default GameInfo;
const styles = StyleSheet.create({
    txt: {
        color: "white",

    }
})