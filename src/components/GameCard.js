import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const GameCard = ({ item, navigation }) => {
    return (
        <View >
            <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={() => {
                navigation.navigate('GameScreen', item);
            }}>
                <Image source={{ uri: item.background_image }} style={styles.image} />
                <Text style={styles.txt2}>{item.name}</Text>

            </TouchableOpacity>
        </View>
    );
}
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
        height: 130,
        width: 250,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    container: {
        alignSelf:'center',
        alignItems: 'center',
        backgroundColor: '#3d3d3d',
        marginHorizontal:10,
        width: 250,
        paddingBottom:20,
        borderRadius:15,
        marginBottom:20
    }
});
export default GameCard;