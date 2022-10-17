import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, Button } from 'react-native';

const openDatabase = () => {
  const myDB = SQLite.openDatabase('database.db');
  return myDB;
};

const myDB = openDatabase();
const Home = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

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

  const getTripData = () => {
    myDB.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_trip', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  };
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  let listItemView = (item) => {
    return (
      <View key={item._id} style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item._id}</Text>
        <Text>Name: {item.trip_name}</Text>
        <Text>Destination: {item.trip_destination}</Text>
        <Text>Datetime: {item.datetime}</Text>
        <Text>Require Assessment*: {item.trip_assessment}</Text>
        <Text>Description: {item.trip_description}</Text>
      </View>
    );
  };
  useEffect(() => {
    createTripTable();
    getTripData();
  }, []);
  return (
    <SafeAreaView>
      <Button
        title="Add a new trip"
        onPress={() => navigation.navigate('AddTrip')}
      />
      <FlatList
        data={flatListItems}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />
    </SafeAreaView>
  );
};

export default Home;
