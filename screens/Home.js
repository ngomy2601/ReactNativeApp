import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';

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
              'CREATE TABLE IF NOT EXISTS table_trip' +
                '(_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'trip_name VARCHAR(20) NOT NULL, ' +
                'trip_destination VARCHAR(20) NOT NULL, ' +
                'trip_datetime VARCHAR(20) NOT NULL, ' +
                'trip_assessment VARCHAR(20) NOT NULL, ' +
                'trip_description VARCHAR(20))',
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

  const deleteTrip = (id) => {
    myDB.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_trip where _id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Deleted failed!');
          }
        }
      );
    });
  };

  const deleteAllTrips = () => {
    myDB.transaction((tx) => {
      tx.executeSql('DELETE FROM table_trip', [], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Deleted all successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Home'),
              },
            ],
            { cancelable: false }
          );
        } else {
          alert('Deleted failed!');
        }
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
      <View
        key={item._id}
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          margin: 15,
          borderColor: '#696969',
          borderStyle: 'solid',
          borderWidth: 0.2,
          shadowColor: '#696969',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#F9813A',
              paddingBottom: 10,
            }}
          >
            Trip Name: {item.trip_name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontSize: 16,
              color: '#808080',
            }}
          >
            Destination: {item.trip_destination}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontSize: 16,
              color: '#808080',
            }}
          >
            Datetime: {item.trip_datetime}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontSize: 16,
              color: '#808080',
            }}
          >
            Require Assessment*: {item.trip_assessment}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontSize: 16,
              color: '#808080',
            }}
          >
            Description: {item.trip_description}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            title="Update"
            onPress={() =>
              navigation.navigate('Update Trip Information', {
                id: item._id,
                name: item.trip_name,
                destination: item.trip_destination,
                datetime: item.datetime,
                assessment: item.trip_assessment,
                description: item.trip_description,
              })
            }
          ></Button>
          <Button
            title="Delete"
            color="#dc143c"
            onPress={() => deleteTrip(item._id)}
          ></Button>
        </View>
      </View>
    );
  };
  useEffect(() => {
    createTripTable();
    getTripData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Pressable
            style={{
              backgroundColor: '#F9813A',
              margin: 10,
              borderRadius: 15,
            }}
            onPress={() => navigation.navigate('Add New Trip')}
          >
            <Text
              style={{
                padding: 10,
                textTransform: 'uppercase',
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Add a new trip
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: '#F9813A',
              margin: 10,
              borderRadius: 15,
            }}
            onPress={deleteAllTrips}
          >
            <Text
              style={{
                padding: 10,
                textTransform: 'uppercase',
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Delete all trips
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={flatListItems}
          // ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffffff',
  },
});
export default Home;
