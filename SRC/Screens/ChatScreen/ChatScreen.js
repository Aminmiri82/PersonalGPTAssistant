import React, { useState } from "react";
import { View, StyleSheet, Text,FlatList } from "react-native";
import { getDB } from "../../database";
import Textinput from "../../Components/ChatComponents/Textinput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";

const ChatScreen = ({ navigation }) => {
  const messages = [{id:1,text:"Hello"}, {id:2,text:"World"}, {id:3,text:"!"}];
  const [newChatTitle, setNewChatTitle] = useState("");

  const addChatItem = () => {
    const db = getDB();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO ChatItems (title, lastMessage, timestamp) VALUES (?, ?, ?)",
          [newChatTitle, "", new Date().toISOString()]
        );
      },
      (error) => {
        console.log("Transaction error: ", error);
      },
      () => {
        console.log("Chat item added successfully");
        navigation.goBack();
      }
    );
  };

  const handleSubmit = (text) => {
    console.log("Submitted text:", text);
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Chatbubble text={item.text} />
        )}
      />
      
        
        
      
      <Textinput onSubmit={handleSubmit} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  
  content: {
    flex: 1,
    justifyContent: "center", // Adjust this as needed to position other content
    alignItems: "center", // Adjust this as needed to position other content
  },
});

export default ChatScreen;
