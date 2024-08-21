import * as SQLite from "expo-sqlite";

let db;

// to delete tables
// Drop TABLE IF EXISTS ChatItems;
// Drop TABLE IF EXISTS Assistants;
// Drop TABLE IF EXISTS Chats;

export const initDB = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      db = await SQLite.openDatabaseAsync("chatApp.db");
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ChatItems (
          Id INTEGER PRIMARY KEY AUTOINCREMENT, 
          threadId TEXT,
          assistantId TEXT,
          lastMessage TEXT,
          profile TEXT
        );
        CREATE TABLE IF NOT EXISTS Assistants (
          id TEXT PRIMARY KEY, 
          name TEXT, 
          instructions TEXT, 
          model TEXT, 
          files TEXT,
          profile TEXT
        );
        CREATE TABLE IF NOT EXISTS Chats (
          id TEXT PRIMARY KEY,
          threadId TEXT,
          content TEXT,
          role TEXT,
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
export const fetchAssistantstest = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const allRows = await db.getAllAsync(`
        SELECT Assistants.id AS assistantId, Assistants.name AS assistantName, Assistants.instructions AS instructions, Assistants.profile AS profile
        FROM Assistants
      `);
      console.log("Fetched Assistants successfully");
      resolve(allRows);
    } catch (error) {
      console.log("Error fetching Assistants: ", error);
      reject(error);
    }
  });
};
export const insertChat = async (threadId, assistantId, lastMessage,profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.runAsync(
        "INSERT INTO ChatItems (threadId, assistantId, lastMessage, profile) VALUES (?, ?, ?, ?)",
        [threadId, assistantId, lastMessage, profile]
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
      const allRows = await db.getAllAsync(`
        SELECT ChatItems.*, Assistants.name AS assistantName, Assistants.model AS assistantModel , Assistants.profile AS profile
        FROM ChatItems
        LEFT JOIN Assistants ON ChatItems.assistantId = Assistants.id
      `);
      console.log("Fetched ChatItems successfully");
      resolve(allRows);
    } catch (error) {
      console.log("Error fetching ChatItems: ", error);
      reject(error);
    }
  });
};
//not working
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

export const updateChatItemById = async (threadId, lastMessage) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync(
        "UPDATE ChatItems SET lastMessage = ? WHERE threadId = ?",
        [lastMessage, threadId]
      );
      console.log("ChatItem really successfully");
      resolve();
    } catch (error) {
      console.log("Error updating ChatItem: ", error);
      reject(error);
    }
  });
};

export const updateChatItemByAssistantId = async (oldAssistantId, newAssistantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync(
        "UPDATE ChatItems SET assistantId = ? WHERE assistantId = ?",
        [newAssistantId, oldAssistantId]
      );
      console.log("ChatItem really successfully");
      resolve();
    } catch (error) {
      console.log("Error updating ChatItem: ", error);
      reject(error);
    }
  });
};
export const insertAssistant = async (id, name, instructions, model, files, profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.runAsync(
        "INSERT INTO Assistants (id, name, instructions, model, files, profile) VALUES (?, ?, ?, ?, ?, ?)",
        [id, name, instructions, model, JSON.stringify(files), profile]
        
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

export const deleteAssistantById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      await db.runAsync("DELETE FROM Assistants WHERE id = ?", [id]);
      // await db.runAsync("DELETE FROM ChatItems WHERE assistantId = ?", [id]);
      console.log("Assistant Deleted successfully");
      resolve();
    } catch (error) {
      console.log("Error deleting Assistant: ", error);
      reject(error);
    }
  });
};

export const insertChatMessage = async (threadId, content, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const result = await db.runAsync(
        "INSERT INTO Chats (threadId, content, role) VALUES (?, ?, ?)",
        [threadId, content, role]
      );
      console.log("Chat message inserted successfully");
      resolve(result);
    } catch (error) {
      console.log("Error inserting chat content: ", error);
      reject(error);
    }
  });
};

export const fetchChatHistory = async (threadId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!db) {
        throw new Error("Database is not initialized");
      }
      const allRows = await db.getAllAsync(
        "SELECT threadId, content, role, timestamp FROM Chats WHERE threadId = ? ORDER BY timestamp ASC",
        [threadId]
      );
      console.log("Fetched chat history successfully");

      resolve(allRows);
    } catch (error) {
      console.log("Error fetching chat history: ", error);
      reject(error);
    }
  });
};

