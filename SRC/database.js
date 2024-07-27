import * as SQLite from "expo-sqlite";

let db;

export const initDB = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      db = await SQLite.openDatabaseAsync("chatApp.db");
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ChatItems (
          Id INTEGER PRIMARY KEY AUTOINCREMENT, 
          assistantName TEXT, 
          modelName TEXT,
          lmit TEXT
        );
        CREATE TABLE IF NOT EXISTS Assistants (
          id TEXT PRIMARY KEY, 
          name TEXT, 
          instructions TEXT, 
          model TEXT, 
          files TEXT
        );
        CREATE TABLE IF NOT EXISTS Chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          assistantId INTEGER,
          message TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
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

export const insertChat = async (assistantName, modelName, lmit) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.runAsync(
        "INSERT INTO ChatItems (assistantName, modelName, lmit) VALUES (?, ?, ?)",
        assistantName,
        modelName,
        lmit
      );
      console.log("ChatItem created successfully");
      resolve(result);
    } catch (error) {
      console.log("Error inserting chatItem: ", error);
      reject(error);
    }
  });
};

export const fetchChatItems = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const allRows = await db.getAllAsync("SELECT * FROM ChatItems");
      console.log("Fetched ChatItems successfully");
      resolve(allRows);
    } catch (error) {
      console.log("Error fetching ChatItems: ", error);
      reject(error);
    }
  });
};

export const deleteChatItemById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync("DELETE FROM ChatItems WHERE id = ?", [id]);
      console.log("ChatItem Deleted successfully");
      resolve();
    } catch (error) {
      console.log("Error deleting ChatItem: ", error);
      reject(error);
    }
  });
};

export const insertAssistant = async (id, name, instructions, model, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.runAsync(
        "INSERT INTO Assistants (id, name, instructions, model, files) VALUES (?, ?, ?, ?, ?)",
        [id, name, instructions, model, JSON.stringify(files)] // Use an array for parameters
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

export const insertChatMessage = async (assistantId, message) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync(
        "INSERT INTO Chats (assistantId, message) SELECT ?, ? FROM Chats JOIN ChatItems ON Chats.id = ChatItems.Id WHERE Chats.assistantId = ?",
        assistantId,
        message,
        assistantId
      );
      console.log("Chat message inserted successfully");
      resolve();
    } catch (error) {
      console.log("Error inserting chat message: ", error);
      reject(error);
    }
  });
};

export const fetchChatHistory = async (assistantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const allRows = await db.getAllAsync(
        "SELECT Chats.id, Chats.assistantId, Chats.message, Chats.timestamp, ChatItems.Id FROM Chats JOIN ChatItems ON ChatItems.Id = Chats.id WHERE Chats.assistantId = ? ORDER BY timestamp ASC",
        [assistantId]
      );
      console.log("Fetched chat history successfully");
      resolve(allRows);
    } catch (error) {
      console.log("Error fetching chat history: ", error);
      reject(error);
    }
  });
};

// export const fetchChatItems = async (assistantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!db) {
//         throw new Error("Database is not initialized");
//       }
//       const allRows = await db.getAllAsync(
//         "SELECT Chats.id AS chatId, Assistants.name AS assistantName, Assistants.model AS modelName, Chats.message, Chats.timestamp FROM Chats JOIN Assistants ON Chats.assistantId = Assistants.id WHERE assistantId = ? ORDER BY Chats.timestamp DESC",
//         [assistantId]
//       );
//       console.log("Fetched ChatItems successfully");
//       resolve(allRows);
//     } catch (error) {
//       console.log("Error fetching ChatItems: ", error);
//       reject(error);
//     }
//   });
// };
