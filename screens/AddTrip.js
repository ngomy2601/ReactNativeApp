import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
} from 'react-native';

const AddTrip = () => {
  const [textInputName, setTextInputName] = useState('');
  const [textInputDestination, settextInputDestination] = useState('');
  const [textInputDate, settextInputDate] = useState('');
  const [textInputAssessment, settextInputAssessment] = useState('');
  const [textInputDescription, settextInputDescription] = useState('');

  const checkTextInput = () => {
    //Check for the TextInput
    if (!textInputName.trim()) {
      alert('Please Enter Name');
      return;
    }

    if (!textInputDestination.trim()) {
      alert('Please Enter Destination');
      return;
    }

    if (!textInputDate.trim()) {
      alert('Please Enter Date');
      return;
    }

    if (!textInputAssessment.trim()) {
      alert('Please Enter Yes/No');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    alert('Success');
  };
  return (
    <SafeAreaView>
      <Text style={styles.titleText}>ADD A NEW TRIP</Text>
      <Text style={styles.baseText}>Trip Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the trip name"
        onChangeText={(value) => setTextInputName(value)}
      />
      <Text style={styles.baseText}>Destination:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the destination"
        onChangeText={(value) => settextInputDestination(value)}
      />
      <Text style={styles.baseText}>Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the date"
        onChangeText={(value) => settextInputDate(value)}
      />
      <Text style={styles.baseText}>Require Risks Assessment:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter YES/NO"
        onChangeText={(value) => settextInputAssessment(value)}
      />
      <Text style={styles.baseText}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the description"
        onChangeText={(value) => settextInputDescription(value)}
      />
      <Button title="Add" color="#0000ff" onPress={checkTextInput} />
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
