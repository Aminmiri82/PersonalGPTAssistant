import React, { createContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { initDB } from "./database"; // Adjust the path as necessary

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB();
        console.log("Database initialized");
        setDbInitialized(true);
      } catch (error) {
        console.log("Error initializing database: ", error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <DatabaseContext.Provider value={{ dbInitialized }}>
      {dbInitialized ? children : <Text>Loading...</Text>}
    </DatabaseContext.Provider>
  );
};
