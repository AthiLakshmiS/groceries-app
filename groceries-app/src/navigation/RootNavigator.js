import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
// import ProductDetails from "../components/ProductDetails";
import MainStackNavigator from "../navigation/StackNavigator";
import Favourites from "../screens/Favourites";

const Tab = createBottomTabNavigator();

const YourTabNavigator = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
    {/* <Tab.Screen name="Product" component={ProductDetails} /> */}
    <Tab.Screen name="Favourites" component={Favourites} options={{tabBarVisible: false,headerShown:false}}/>
    <Tab.Screen name="More" component={MainStackNavigator} options={{tabBarVisible: false,headerShown:false}}/>
  </Tab.Navigator>
);

const RootNavigator = () => (
    <YourTabNavigator />
);

export default RootNavigator;
