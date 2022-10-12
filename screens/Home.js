import React from 'react';
import { SafeAreaView, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        title="Add a new trip"
        onPress={() => navigation.navigate('AddTrip')}
      />
    </SafeAreaView>
  );
};

export default Home;
