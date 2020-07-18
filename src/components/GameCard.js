import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';



const GameCard = ({ item, navigation }) => {
    if (item.parent_platforms) {
        var platforms = "";
        for (var i = 0; i < item.parent_platforms.length; i++) {
          platforms += item.parent_platforms[i].platform.id == 3 ? "Mac" : item.parent_platforms[i].platform.name;
          if (i + 1 != item.parent_platforms.length) {
            platforms += ", ";
          }

        }
      }
    return (
        <View >
            <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={() => {
                navigation.navigate('GameScreen', item);
            }}>
                <Image source={{ uri: item.background_image }} resizeMode='cover' resizeMethod='resize' style={styles.image} />
                <Text style={styles.gameTitle}>{item.name}</Text>
                <Text style={styles.txt}>Ratings {item.rating} / 5</Text>

                <Text style={styles.txt}>{platforms}</Text>

            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    txt: {
        color: 'white',
        fontSize: 10,
        alignSelf: 'center',
        justifyContent:'center',
        marginHorizontal: 5,
        paddingHorizontal:15,
        textAlign:'center'
        
    },
    gameTitle: {
        fontWeight: 'bold',
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
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#3d3d3d',
        marginHorizontal: 10,
        width: 250,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 20
    }
});
export default GameCard;