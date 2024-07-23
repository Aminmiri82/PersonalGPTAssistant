import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { getDB } from "../../database";

const ChatScreen = ({ navigation }) => {
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

  return (
    <View>
      <TextInput
        placeholder="Enter chat title"
        value={newChatTitle}
        onChangeText={setNewChatTitle}
      />
      <Button title="Add Chat" onPress={addChatItem} />
    </View>
  );
};

export default ChatScreen;
