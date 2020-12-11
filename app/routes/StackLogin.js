import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Notes from '../pages/Notes';
import Map from '../pages/Map';
import Splash from '../pages/Splash';

import Notes_list from '../pages/Notes_list';
import UpdateList from '../pages/UpdateList';

const Stack = createStackNavigator();

function StackLogin() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={Map} options={{ headerShown: true }} />
        <Stack.Screen name="Notes" component={Notes} options={{ headerShown: false }} />
        <Stack.Screen name="Notes_list" component={Notes_list} options={{ headerShown: false }}  />
        <Stack.Screen name="UpdateList" component={UpdateList} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackLogin;
