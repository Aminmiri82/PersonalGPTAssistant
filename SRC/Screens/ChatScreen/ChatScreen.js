import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { getDB } from "../../database";
import { OPENAI_API_KEY } from "@env";

import OpenAI from "openai";

const ChatScreen = ({ navigation }) => {
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  async function call() {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is a LLM?" },
      ],
      model: "gpt-4o-mini",
    });

    console.log(completion.choices[0]);
  }
  
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
      <Button title="Add Chat" onPress={call} />
    </View>
  );
};

export default ChatScreen;
