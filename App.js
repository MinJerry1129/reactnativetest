import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './src/Screens/Home/Homepage';
import Loginpage from './src/Screens/Auth/Loginpage';
import Registerpage from './src/Screens/Auth/Registerpage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
const RootStack = createNativeStackNavigator();
export default function App() {
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
