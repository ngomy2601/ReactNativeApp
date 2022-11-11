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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'HOME',
            headerStyle: {
              backgroundColor: '#F9813A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Add New Trip"
          component={AddTrip}
          options={{
            title: 'ADD NEW TRIP',
            headerStyle: {
              backgroundColor: '#F9813A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update Trip Information"
          component={UpdateTrip}
          options={{
            title: 'UPDATE TRIP INFORMATION',
            headerStyle: {
              backgroundColor: '#F9813A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
