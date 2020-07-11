import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Header = ({ title }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title} </Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => Linking.openURL('https://rawg.io/')}>
                <Text style={styles.powered}>Powered by RAWG.IO</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-between'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: hp('2%'),
        
    },
    powered: {
        color: '#a9a9a9',
        fontSize: 12,
        textDecorationLine: "underline",

    }
});

export default Header;


