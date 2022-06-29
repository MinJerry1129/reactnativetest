import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './src/Screens/Home/Homepage';
import Loginpage from './src/Screens/Auth/Loginpage';
import Registerpage from './src/Screens/Auth/Registerpage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import { openDatabase } from 'react-native-sqlite-storage';

const RootStack = createNativeStackNavigator();
var db = openDatabase({name:'UserDatabase.db'})
export default function App() {
  useEffect(()=>{
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(100),user_mail VARCHAR(100), user_mobile VARCHAR(100),user_password VARCHAR(100),user_city VARCHAR(100),user_gender VARCHAR(100))',
              []
            );
          }
        }
      );
    });
  },[]);
  
  const setProfileHeaderOptions = (title) => {
    return {
        gestureEnabled: true,
        title: title,
    }
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen name="Loginpage" component={Loginpage} options={{headerShown: false}}/>
        <RootStack.Screen name="Registerpage" component={Registerpage} options={{headerShown: false}}/>
        <RootStack.Screen name="Homepage" component={Homepage} options={{headerShown: false}}/>
      </RootStack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
