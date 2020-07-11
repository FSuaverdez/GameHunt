import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, WebView } from 'react-native';

const Header = ({ title }) => {

    const openRAWG = () => {
        return (
            <WebView
                source={{
                    uri: 'https://github.com/facebook/react-native'
                }}
                style={{ marginTop: 20 }}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title} </Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => openRAWG()}>
                <Text style={styles.powered}>Powered by RAWG.IO</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,

    },
    powered: {
        color: '#a9a9a9',
        fontSize: 12,
        textDecorationLine: "underline",

    }
});

export default Header;


