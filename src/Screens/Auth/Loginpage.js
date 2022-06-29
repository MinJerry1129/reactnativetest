import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../RootNavigation'

const Loginpage = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const handleRegisterPage = () =>{
        console.log("test")
        RootNavigation.navigate('Registerpage');
    }

    const handleHomepage = () =>{
        console.log("test")
        RootNavigation.navigate('Homepage');
    }

    return (
            <View style={styles.contain} >
                <View/>
                <View style={styles.mainpage}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMail}
                        placeholder="Email or Phone number"
                        value={mail}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                    />
                    <View style={styles.button}>
                        <Button
                            title="Sign In"
                            onPress={() => handleHomepage()}
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.text}
                        onPress={() => handleRegisterPage()} >
                        <Text>Don't have account? Sign UP</Text>
                    </TouchableOpacity>                   
                </View>
                <View/>
            </View>
    );
};

const styles = StyleSheet.create({    
    contain:{
        flex: 1,
        backgroundColor:"#fff",        
        justifyContent:'space-between'
    },
    input: {
        height: 40,
        width: 250,
        margin: 5,
        borderWidth: 1,
        padding: 10,
      },
    mainpage: {
        marginTop: 20,
        alignItems: 'center',
    },
    button:{
        marginTop: 10
    },
});

export default Loginpage;