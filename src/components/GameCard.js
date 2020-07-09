import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const Card = (props)=>{
    return(
        <View style = {styles.card}>
            <View style ={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    card:{
        borderRadius:6,
        elevation:3,
        backgroundColor:'gray',
        shadowOffset:{width:1,height:1},
        shadowColor:'#fff',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6
    },
    
    cardContent:{
        marginHorizontal:18,
        marginVertical:20,
    }
})
export default Card;