import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";

import { getDB } from "../../database";
import { OPENAI_API_KEY } from "@env";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";

import OpenAI from "openai";

const ChatScreen = ({ navigation }) => {
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const [conversation, setConversation] = useState([]);

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

  const handleSetAns = (newAns) => {
    setConversation((prevAns) => {
      return [
        ...prevAns,
        { role: "assistant", content: newAns.message.content },
      ];
    });
  };

  const handleSetMessage = (newMessage) => {
    setConversation((prevMessages) => {
      const updatedMessages = [
        ...prevMessages,
        { role: "user", content: newMessage },
      ];
      call(newMessage); // Call the function with the new message
      return updatedMessages;
    });
  };

  return (
    <Screen>
      <View style={styles.stuff}>
        <Button
          title="Add Chat"
          onPress={() => call(messages[messages.length - 1])}
        />
        {conversation.map((msg, index) => (
          <Text key={index}>{msg.content}</Text>
        ))}
      </View>
      <AppTextInput onSubmit={handleSetMessage} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  stuff: {
    
  },
});

export default ChatScreen;
