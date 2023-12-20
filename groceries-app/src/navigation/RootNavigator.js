import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
// import ProductDetails from "../components/ProductDetails";
// import Favourites from "../components/Favourites";
// import MainStackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

const YourTabNavigator = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* <Tab.Screen name="Product" component={ProductDetails} />
    <Tab.Screen name="Favourites" component={Favourites} />
    <Tab.Screen name="More" component={MainStackNavigator} /> */}
  </Tab.Navigator>
);

const RootNavigator = () => (
    <YourTabNavigator />
);

export default RootNavigator;
