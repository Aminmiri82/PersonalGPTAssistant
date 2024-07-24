import React, { useState } from "react";
import { View, Button, StyleSheet, FlatList } from "react-native";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";

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
      <FlatList
        data={conversation}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Chatbubble message={item} />}
        contentContainerStyle={styles.flatListContent}
      />
      <AppTextInput onSubmit={handleSetMessage} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    padding: 10,
  },
});

export default ChatScreen;
