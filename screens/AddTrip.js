import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
} from 'react-native';

const openDatabase = () => {
  const myDB = SQLite.openDatabase('database.db');
  return myDB;
};

const myDB = openDatabase();
const AddTrip = ({ navigation }) => {
  let [textInputName, setTextInputName] = useState('');
  let [textInputDestination, settextInputDestination] = useState('');
  let [textInputDate, settextInputDate] = useState('');
  let [textInputAssessment, settextInputAssessment] = useState('');
  let [textInputDescription, settextInputDescription] = useState('');

  const addTrip = () => {
    myDB.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_trip (trip_name, trip_destination, trip_datetime, trip_assessment, trip_description) VALUES (?,?,?,?,?)',
        [
          textInputName,
          textInputDestination,
          textInputDate,
          textInputAssessment,
          textInputDescription,
        ],
        (tx, results) => {
          console.log('Results: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert('Added failed!');
          }
        }
      );
    });
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
      <Button title="Add" color="#0000ff" onPress={addTrip} />
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
