import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import useResults from '../hooks/useResults';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    const [trending, getTrending, results, setResults, top, getTop, getGames, errorMessage] = useResults();

    return (
        <View style={styles.backgroundStyle}>
            <Feather
                name="search"
                style={styles.iconStyle} color="black" />
            <TextInput
                style={styles.inputStyle}
                placeholder='Search'
                placeholderTextColor="gray"
                value={term}
                onChangeText={onTermChange}
                autoCapitalize='none'
                autoCorrect={false}
                onEndEditing={onTermSubmit}
                
            />

            {!term ? null :
                <Entypo style={styles.iconStyle} name="cross" color="black" 
                onPress={() => {
                    onTermChange('');
                }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: "#D3D3D3",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
    },
    inputStyle: {
        borderColor: 'black',
        flex: 1,
        fontSize: 18,
    },
    iconStyle: {
        fontSize: 25,
        alignSelf: 'center',
        marginHorizontal: 15,
    }
});

export default SearchBar;