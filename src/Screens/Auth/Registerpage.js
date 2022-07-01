import React, { useState, Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button,TouchableOpacity,Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../RootNavigation';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const Registerpage = () => {
    const data = [
        { label: 'Bengaluru', value: '1' },
        { label: 'Mumbai', value: '2' },
        { label: 'Jaipur', value: '3' },
        { label: 'Kolkata', value: '4' },
        { label: 'Lucknow', value: '5' },
        { label: 'Ahmedabad', value: '6' },
        { label: 'Surat', value: '7' },
        { label: 'Hyderabad', value: '8' },
      ];
    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        selected: true,
        value: 'male'
    }, {
        id: '2',
        label: 'Female',
        selected: false,
        value: 'female'
    }]
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = useState("");
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    const navigation = useNavigation();

    const handleLoginPage = () =>{
        console.log("test")
        RootNavigation.navigate('Loginpage');
    }
    const validate_name = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log(text, reg.test(text));
    };
    const validate_mail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(text)
    };
    const validate_phone = (text) => {
        let reg = true
        if(text.length >9){
            reg = isNaN(text)
        }
        return reg;        
    };
    const validate_password = (text) => {
        let reg = false
        if(text.length >7){
            reg = true
        }
        return reg;
    };

    const handleSignup = () =>{
        console.log(name, ", ",mail, ", ",mobile, ", ",password, ", ",value)
        let exist = false
        if (!name) {
            alert('Please fill name');
            return;
        }
        if (!mail) {
            alert('Please fill Mail Address');
            return;
        }
        if (!mobile) {
            alert('Please fill Mobile number');
            return;
        }
        if (!password) {
            alert('Please input Password');
            return;
        }
        if (!value) {
            alert('Please select City');
            return;
        }

        if(!validate_mail(mail)){
            alert('Please input correct mail form');
            return;
        }
        if(validate_phone(mobile)){
            alert('Please input correct phone number');
            return;
        }
        if(!validate_password(password)){
            alert('Please input over 8 letter');
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql(
              'SELECT * FROM table_user where user_mail = ? OR user_mobile = ?',
              [mail,mobile],
              (tx, results) => {
                var len = results.rows.length;
                console.log("leng", len)
                if(len>0){
                    alert('This Mail or Phone number is already exist');
                    exist = true;
                    console.log("exist", exist);
                }else{
                    db.transaction(function (tx) {
                        tx.executeSql(
                          'INSERT INTO table_user (user_name, user_mail, user_mobile,user_password,user_city,user_gender) VALUES (?,?,?,?,?,?)',
                          [name,mail,mobile,password,value, 'male'],
                          (tx, results) => {
                            console.log('Results', results.rowsAffected);
                            if (results.rowsAffected > 0) {
                              Alert.alert(
                                'Success',
                                'You are Registered Successfully',
                                [
                                  {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Loginpage'),
                                  },
                                ],
                                { cancelable: false }
                              );
                            } else alert('Registration Failed');
                          }
                        );
                    });
                }
              }
            );
        });
    }
    const onPressRadioButton=(radioButtonsArray)=> {
        console.log(radioButtonsArray)
        setRadioButtons(radioButtonsArray);
    }
    return (
            <View style={styles.contain} >
                <View/>
                    <View style={styles.mainpage}>
                        <Text style={styles.title}>Sign Up</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            placeholder="Enter Name"
                            value={name}
                            keyboardType='name-phone-pad'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setMail}
                            value={mail}
                            placeholder="Enter Email"
                            autoCapitalize='none'
                            keyboardType= 'email-address'/>
                        <TextInput
                            style={styles.input}
                            onChangeText={setMobile}
                            value={mobile}
                            placeholder="Enter Mobile Number"
                            keyboardType='number-pad'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            autoCapitalize='none'
                            placeholder="Enter Password"
                        />
                        <View>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select City"
                            value={value}
                            onChange={item => {
                                console.log(item.value);
                                setValue(item.value);
                            }}
                        />
                        </View>                   
                        <View>
                            <RadioGroup 
                                radioButtons={radioButtons} 
                                onPress={onPressRadioButton}
                                layout='row'
                            />
                        </View>
                        
                        <View style={styles.button}>
                            <Button
                                title="Sign Up"
                                onPress={() => handleSignup()}
                            />
                        </View>
                        <View style={styles.signinView}>
                            <Text>Already have account?</Text>
                            <TouchableOpacity style={styles.text}
                                onPress={() => handleLoginPage()} >
                                <Text style={styles.signinText}> Sign In</Text>
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
        marginTop: 20,
        marginBottom:10
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    dropdown: {
        margin: 5,
        height: 40,
        width: 250,
        padding:10,
        borderColor:'#000',
        borderWidth:1
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    signinView:{
        flexDirection:'row'
    },
    signinText:{
        fontWeight:'bold',
        color:'#1589ff'
    }
});

export default Registerpage;