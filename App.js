import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/0';
import Home from './src/0Home';
import A from './src/A';
import B from './src/B';
import C from './src/C';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="A" component={A} options={{ headerShown: false }}/>
        <Stack.Screen name="B" component={B} options={{ headerShown: false }}/>
        <Stack.Screen name="C" component={C} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
