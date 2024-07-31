import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "chatApp.db";
const database_version = "1.0";
const database_displayname = "Chat App Database";
const database_size = 200000;

let db;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    )
      .then((DB) => {
        db = DB;
        db.executeSql("SELECT 1 FROM ChatItems LIMIT 1")
          .then(() => {
            console.log("Database is ready ... executing SQL ...");
          })
          .catch((error) => {
            console.log("Received error: ", error);
            db.transaction((tx) => {
              tx.executeSql(
                "CREATE TABLE IF NOT EXISTS ChatItems (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, lastMessage TEXT, timestamp TEXT)"
              );
            })
              .then(() => {
                console.log("Table created successfully");
              })
              .catch((error) => {
                console.log(error);
              });
          });
        resolve(db);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getDB = () => {
  return db;
};
