// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../screens/Cart';
import Products from '../screens/Products';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Cart" component={Cart} options={{ tabBarVisible: false,headerShown:false }} /> */}
      <Stack.Screen name="Products" component={Products} options={{tabBarVisible: false,headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
