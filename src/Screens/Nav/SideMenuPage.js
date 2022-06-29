import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,Image , BackHandler, Alert,TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../RootNavigation'

const SideMenuPage = () => {
    const navigation = useNavigation();

    const handleLogout = () =>{
        console.log("test")
        RootNavigation.navigate('Loginpage');
    }
    return (
        <View style={styles.contain} >
            <TouchableOpacity onPress={()=> handleLogout()}>
                <View>
                    <Text style={styles.menutitle}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contain:{
        flex: 1,
        backgroundColor:"#fff"
    },
    menutitle:{
        fontSize:18,
        fontWeight:'normal',
        padding:10
    },
});

export default SideMenuPage;