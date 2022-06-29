import React, {useEffect, useState,memo} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../../RootNavigation'
// import {Alert} from 'react-native';

function HomeOfferlist({item,index}){
    const navigation = useNavigation();
    const handlePositionPage = () =>{
        console.log("test")
    }
    return(
        <TouchableOpacity onPress={handlePositionPage} style={styles.contain}>
            <View>
                <Image style={styles.logo} source={item.imgurl}/>
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
        height:100,
        width:100,
        margin:10,
        padding:10
    }
});

export default memo(HomeOfferlist);
