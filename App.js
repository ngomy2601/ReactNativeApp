import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddTrip from './screens/AddTrip';
import UpdateTrip from './screens/UpdateTrip';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTrip" component={AddTrip} />
        <Stack.Screen name="UpdateTrip" component={UpdateTrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
