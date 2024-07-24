import React, { createContext, useEffect } from "react";
import { initDB } from "./database"; // Adjust the path as necessary

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  return (
    <DatabaseContext.Provider value={{}}>{children}</DatabaseContext.Provider>
  );
};
