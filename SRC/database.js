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
        // db.executeSql("SELECT 1 FROM ChatItems LIMIT 1")
        //   .then(() => {
        //     console.log("Database is ready ... executing SQL ...");
        //   })
        //   .catch((error) => {
        //     console.log("Received error: ", error);
        //     db.transaction((tx) => {
        //       tx.executeSql(
        //         "CREATE TABLE IF NOT EXISTS ChatItems (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, lastMessage TEXT, timestamp TEXT)"
        //       );
        //     })
        //       .then(() => {
        //         console.log("Table created successfully");
        //       })
        //       .catch((error) => {
        //         console.log(error);
        //       });
        //   });
        db.executeSql("SELECT 1 FROM Assistants LIMIT 1")
          .then(() => {
            console.log("Assistants table is ready ... executing SQL ...");
          })
          .catch((error) => {
            console.log("Received error: ", error);
            db.transaction((tx) => {
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Assistants (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  name TEXT, 
                  instructions TEXT, 
                  model TEXT, 
                  files TEXT
                )`
              );
            })
              .then(() => {
                console.log("Assistants table created successfully");
              })
              .catch((error) => {
                console.log("Error creating Assistants table: ", error);
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

export const insertAssistant = (name, instructions, model, files) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized"));
      return;
    }
    if (!name || !instructions || !model || !files) {
      reject(
        new Error("Invalid input: one or more values are null or undefined")
      );
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Assistants (name, instructions, model, files) VALUES (?, ?, ?, ?)`,
        [name, instructions, model, JSON.stringify(files)]
      )
        .then(([tx, results]) => {
          console.log("Assistant inserted successfully");
          resolve(results);
        })
        .catch((error) => {
          console.log("Error inserting assistant: ", error);
          reject(error);
        });
    });
  });
};

export const fetchAssistants = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized"));
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Assistants`, [])
        .then(([tx, results]) => {
          let assistants = [];
          for (let i = 0; i < results.rows.length; i++) {
            assistants.push(results.rows.item(i));
          }
          console.log("Fetched assistants successfully");
          resolve(assistants);
        })
        .catch((error) => {
          console.log("Error fetching assistants: ", error);
          reject(error);
        });
    });
  });
};
