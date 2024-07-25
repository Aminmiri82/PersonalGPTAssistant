import * as SQLite from "expo-sqlite";

let db;

export const initDB = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      db = await SQLite.openDatabaseAsync("chatApp.db");
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ExistingTable (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          column1 TEXT, 
          column2 TEXT
        );
        CREATE TABLE IF NOT EXISTS Assistants (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, 
          instructions TEXT, 
          model TEXT, 
          files TEXT
        );
      `);
      console.log("Tables created successfully");
      resolve(db);
    } catch (error) {
      console.log("Error initializing database: ", error);
      reject(error);
    }
  });
};

export const insertAssistant = async (name, instructions, model, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.runAsync(
        "INSERT INTO Assistants (name, instructions, model, files) VALUES (?, ?, ?, ?)",
        name,
        instructions,
        model,
        JSON.stringify(files)
      );
      console.log("Assistant inserted successfully");
      resolve(result);
    } catch (error) {
      console.log("Error inserting assistant: ", error);
      reject(error);
    }
  });
};

export const fetchAssistants = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const allRows = await db.getAllAsync("SELECT * FROM Assistants");
      console.log("Fetched assistants successfully");
      resolve(allRows);
    } catch (error) {
      console.log("Error fetching assistants: ", error);
      reject(error);
    }
  });
};

export const fetchAssistantById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.getFirstAsync(
        "SELECT * FROM Assistants WHERE id = ?",
        [id]
      );
      console.log("Fetched assistant successfully");
      resolve(result);
    } catch (error) {
      console.log("Error fetching assistant: ", error);
      reject(error);
    }
  });
};

export const updateAssistant = async (id, name, instructions, model, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync(
        "UPDATE Assistants SET name = ?, instructions = ?, model = ?, files = ? WHERE id = ?",
        name,
        instructions,
        model,
        JSON.stringify(files),
        id
      );
      console.log("Assistant updated successfully");
      resolve();
    } catch (error) {
      console.log("Error updating assistant: ", error);
      reject(error);
    }
  });
};

export const deleteAssistantById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync("DELETE FROM Assistants WHERE id = ?", [id]);
      console.log("Assistant Deleted successfully");
      resolve();
    } catch (error) {
      console.log("Error deleting Assistant: ", error);
      reject(error);
    }
  });
};
