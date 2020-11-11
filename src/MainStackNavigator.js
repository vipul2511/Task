import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SignUp from './Screens/signup';
import SignIn from './Screens/signin';
import Home from './Screens/Home';
import Cart from './Screens/cart';
import SearchBar from './Screens/Search';



const Stack = createStackNavigator();


function MainStackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{
   headerShown: false
 }}
 >
     <Stack.Screen name="SignUp" component={SignUp} />
     <Stack.Screen name="SignIn" component={SignIn} />
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen  name="Cart" component={Cart} />
     <Stack.Screen  name="Search" component={SearchBar} />
    
   </Stack.Navigator>
    
    </NavigationContainer>
  );
}




export default MainStackNavigator;