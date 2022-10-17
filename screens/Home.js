import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button } from 'react-native';

const openDatabase = () => {
  const myDB = SQLite.openDatabase('database.db');
  return myDB;
};

const myDB = openDatabase();
const Home = ({ navigation }) => {
  const createTripTable = () => {
    myDB.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_trip'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS table_trip', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS table_trip(_id INTEGER PRIMARY KEY AUTOINCREMENT, trip_name VARCHAR(20) NOT NULL, trip_destination VARCHAR(20) NOT NULL, trip_datetime VARCHAR(20) NOT NULL, trip_assessment VARCHAR(20) NOT NULL, trip_description VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  };
  useEffect(() => {
    createTripTable();
  }, []);
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
