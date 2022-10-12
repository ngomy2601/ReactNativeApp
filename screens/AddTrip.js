import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
} from 'react-native';

const AddTrip = () => {
  return (
    <SafeAreaView>
      <Text style={styles.titleText}>ADD A NEW TRIP</Text>
      <Text style={styles.baseText}>Trip Name:</Text>
      <TextInput style={styles.input} placeholder="Enter the trip name" />
      <Text style={styles.baseText}>Destination:</Text>
      <TextInput style={styles.input} placeholder="Enter the destination" />
      <Text style={styles.baseText}>Date:</Text>
      <TextInput style={styles.input} placeholder="Enter the date" />
      <Text style={styles.baseText}>Require Risks Assessment:</Text>
      <TextInput style={styles.input} placeholder="Enter YES/NO" />
      <Text style={styles.baseText}>Description:</Text>
      <TextInput style={styles.input} placeholder="Enter the description" />
      <Button title="Add" color="#0000ff" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
  baseText: {
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily: 'Cochin',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'crimson',
  },
});

export default AddTrip;
