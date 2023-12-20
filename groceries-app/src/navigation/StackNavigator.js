// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart} options={{ tabBarVisible: false }}/>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
