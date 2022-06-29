import React, { useState, Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button,TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '../../../RootNavigation';
import { RadioGroup } from 'react-native-radio-buttons-group';

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
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setMail}
                        value={mail}
                        placeholder="Enter Email"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setMobile}
                        value={mobile}
                        placeholder="Enter Mobile Number"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
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
                            onPress={() => console.log('Simple Button pressed')}
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.text}
                        onPress={() => handleLoginPage()} >
                        <Text>Already have account? Sign In</Text>
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
});

export default Registerpage;