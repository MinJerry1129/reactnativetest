import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../RootNavigation'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const Loginpage = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const handleRegisterPage = () =>{
        RootNavigation.navigate('Registerpage');
    }

    const validate_mail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(text);
    };

    const validate_phone = (text) => {
        let reg = true
        if(text.length >9){
            reg = isNaN(text)
        }
        return reg;        
    };


    const handleHomepage = () =>{
        if (!mail) {
            alert('Please input Mail or phone number');
            return;
        }
        if (!password) {
            alert('Please input password');
            return;
        }
        console.log(validate_mail(mail), validate_phone(mail))
        if(!validate_mail(mail) && validate_phone(mail)){
            alert('Please input correct Mail or phone number');
            return;
        }
        
        db.transaction(function (tx) {
            tx.executeSql(
              'SELECT * FROM table_user where user_mail = ? AND user_password = ?',
              [mail,password],
              (tx, results) => {
                var len = results.rows.length;
                console.log("leng", len)
                if(len>0){
                    console.log("exist", results.rows.item(0).user_id);                    
                    navigation.navigate('Homepage',{user_id: results.rows.item(0).user_id,user_name:results.rows.item(0).user_name});
                }else{
                    db.transaction(function (tx) {
                        tx.executeSql(
                          'SELECT * FROM table_user where user_mobile = ? AND user_password = ?',
                          [mail,password],
                          (tx, results) => {
                            var len = results.rows.length;
                            
                            if(len>0){
                                console.log("leng", results.rows.item(0).user_id)
                                navigation.navigate('Homepage',{user_id: results.rows.item(0).user_id, 
                                    user_name:results.rows.item(0).user_name})
                            }else{
                                alert('Please input correct data');
                            }
                          }
                        );
                    });
                }
              }
            );
        });
    }

    return (
            <View style={styles.contain} >
                <View/>
                <View style={styles.mainpage}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMail}
                        autoCapitalize='none'
                        placeholder="Email or Phone number"
                        keyboardType='email-address'
                        value={mail}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        autoCapitalize='none'
                        placeholder="Password"
                    />
                    <View style={styles.button}>
                        <Button
                            title="Sign In"
                            onPress={() => handleHomepage()}
                        />
                    </View>
                    <View style={styles.signupView}>
                        <Text>Don't have account? </Text>
                        <TouchableOpacity style={styles.text}
                        onPress={() => handleRegisterPage()} >
                        <Text style={styles.singnupText}>Sign UP</Text>
                    </TouchableOpacity>  
                    </View>
                    
                                     
                </View>
                <View/>
            </View>
    );
};

const styles = StyleSheet.create({    
    contain:{
        flex: 1,
        backgroundColor:"#f5f5f5",        
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
        marginTop: 20,
        marginBottom:10
    },
    signupView:{
        flexDirection:'row'
    },
    singnupText:{
        fontWeight:'bold',
        color:'#1589ff'
    }
});

export default Loginpage;