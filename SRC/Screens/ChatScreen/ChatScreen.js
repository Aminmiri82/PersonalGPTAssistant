import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";

import { getDB } from "../../database";
import { OPENAI_API_KEY } from "@env";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";

import OpenAI from "openai";

const ChatScreen = ({ navigation }) => {
  
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  async function call(newMessage) {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: newMessage },
      ],
      model: "gpt-4o-mini",
    });

    console.log(completion.choices[0]);
    handleSetAns(completion.choices[0]);
  }

  const [ans, setAns] = useState([]);
  const handleSetAns = (newAns) => {
    setAns((prevAns) => {
      return [...prevAns, newAns];
    });
  };

  const [messages, setMessages] = useState([]);
  const handleSetMessage = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      call(newMessage); // Call the function with the new message
      return updatedMessages;
    });
  };

  return (
    <Screen>
      <Button title="Add Chat" onPress={() => call(messages[messages.length - 1])} />
      {messages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
      {ans.map((ans, index) => (
        <Text key={index}>{ans.message.content}</Text>
      ))}

      <AppTextInput onSubmit={handleSetMessage} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ChatScreen;
