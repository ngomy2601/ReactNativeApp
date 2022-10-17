import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
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

const UpdateTrip = ({ route, navigation }) => {
  const { id, name, destination, datetime, assessment, description } =
    route.params;

  let [textInputName, setTextInputName] = useState('');
  let [textInputDestination, settextInputDestination] = useState('');
  let [textInputDate, settextInputDate] = useState('');
  let [textInputAssessment, settextInputAssessment] = useState('');
  let [textInputDescription, settextInputDescription] = useState('');

  const updateTripData = () => {
    myDB.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_trip set trip_name=?, trip_destination=?, trip_datetime=?, trip_assessment=?, trip_description=? where _id=?',
        [
          textInputName,
          textInputDestination,
          textInputDate,
          textInputAssessment,
          textInputDescription,
          id,
        ],
        (tx, results) => {
          console.log('Results: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Updated Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert('Updated failed!');
          }
        }
      );
    });
  };
  return (
    <SafeAreaView>
      <Text style={styles.titleText}>UPDATE TRIP</Text>
      <Text style={styles.baseText}>Trip Name:</Text>
      <TextInput
        style={styles.input}
        defaultValue={name}
        onChangeText={setTextInputName}
      />
      <Text style={styles.baseText}>Destination:</Text>
      <TextInput
        style={styles.input}
        defaultValue={destination}
        onChangeText={settextInputDestination}
      />
      <Text style={styles.baseText}>Date:</Text>
      <TextInput
        style={styles.input}
        defaultValue={datetime}
        onChangeText={settextInputDate}
      />
      <Text style={styles.baseText}>Require Risks Assessment:</Text>
      <TextInput
        style={styles.input}
        defaultValue={assessment}
        onChangeText={settextInputAssessment}
      />
      <Text style={styles.baseText}>Description:</Text>
      <TextInput
        style={styles.input}
        defaultValue={description}
        onChangeText={settextInputDescription}
      />
      <Button title="UPDATE" color="#0000ff" onPress={updateTripData} />
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

export default UpdateTrip;
