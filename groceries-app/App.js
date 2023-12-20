import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./src/navigation/RootNavigator";

const App = () => (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
);

export default App;
