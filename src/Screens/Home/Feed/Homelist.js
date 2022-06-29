import React, {useEffect, useState,memo} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../../RootNavigation'
// import {Alert} from 'react-native';

function Homelist({item,index}){
    const navigation = useNavigation();
    const handlePositionPage = () =>{
        console.log("test")
    }
    return(
        <TouchableOpacity onPress={handlePositionPage} style={styles.contain}>
            <View>
                {/* <Image style={styles.logo} source={item.imgurl}/> */}
                <Text style={styles.title}>Product Name : {item.name}</Text>
                <Text style={styles.favorite}>Product Details : {item.count} places, {item.fav} favorited</Text>            
            </View>
        </TouchableOpacity>
        
    );
}
const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor: '#F0F0F3',
        marginBottom:10,
        marginLeft:10,
        marginRight:5,
        padding: 10,
    },
    title:{
        flex:1,
        fontWeight: 'bold',
        fontSize: 14,        
        color:'#2459A8',
        marginBottom: 5
    },
    favorite:{
        fontSize: 13,
        color:'#000'
    },
    logo:{
        height:40,
        width:40,
        marginBottom: 10
    }
});

export default memo(Homelist);
