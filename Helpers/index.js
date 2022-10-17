//CRUD TRIP TABLE
import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  const myDB = SQLite.openDatabase('database.db');
  return myDB;
};

const myDB = openDatabase();
//Create trip table
const createTripTable = () => {
  myDB.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS table_trip(_id INTEGER PRIMARY KEY AUTOINCREMENT, trip_name VARCHAR(20) NOT NULL, trip_destination VARCHAR(20) NOT NULL, trip_datetime VARCHAR(20) NOT NULL, trip_assessment VARCHAR(20) NOT NULL, trip_description VARCHAR(20))',
      [],
      (tx, results) => {
        console.log('Created successfully!');
      },
      (error) => {
        console.log('Created failed!');
      }
    );
  });
};
const getTrips = () => {
  myDB.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM table_trip ORDER BY id DESC`,
      [],
      (sqlTxn, res) => {
        console.log('Trips retrieved successfully');
        let len = res.rows.length;

        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push({
              _id: item._id,
              trip_name: item.trip_name,
              trip_destination: item.trip_destination,
              trip_datetime: item.trip_datetime,
              trip_assessment: item.trip_assessment,
              trip_description: item.trip_description,
            });
            return results;
          }
        }
      },
      (error) => {
        console.log('error on getting trips ' + error.message);
      }
    );
  });
};
//Add trip
const addTrip = (
  textInputName,
  textInputDestination,
  textInputDate,
  textInputAssessment,
  textInputDescription
) => {
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

//Update trip
const updateTrip = (
  id,
  name,
  destination,
  datetime,
  assessment,
  description
) => {
  myDB.transaction((tx) => {
    tx.executeSql(
      'UPDATE table_trip set trip_name=?, trip_destination=?, trip_datetime=?, trip_assessment=?, trip_description=?) where _id=?',
      [name, destination, datetime, assessment, description, id],
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

exports = {
  createTripTable,
  getTrips,
  addTrip,
  updateTrip,
};
