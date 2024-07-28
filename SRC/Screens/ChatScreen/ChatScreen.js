import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import {
  callAssistantApi,
  createThread,
} from "../../openai-backend/ApiBackEnd";
import { insertChatMessage } from "../../database";

const ChatScreen = ({ navigation, route }) => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const assistantId = route.params.assistantId;
  const { chatId } = route.params;
  console.log("in chat screen", assistantId); // this is undefined
  console.log("in chat screen", chatId); // this is undefined
  const threadRef = useRef(null);

  useEffect(() => {
    fetchChatHistory(chatId).then(setChatHistory).catch(console.error);
  }, [chatId]);

  useEffect(() => {
    const initializeThread = async () => {
      if (threadRef.current === null) {
        console.log("Creating new thread...");
        threadRef.current = await createThread();
        console.log("Thread created:", threadRef.current);
      }
    };
    initializeThread();
  }, []);

  const callAssistant = async (message, assistantId) => {
    setLoading(true);
    if (threadRef.current === null) {
      console.log("Thread not initialized yet.");
      setLoading(false);
      return;
    }
    console.log("in chat screen call assistant", assistantId);
    try {
      console.log("Calling assistant with thread:", threadRef.current.id);
      const assistantMessage = await callAssistantApi(
        message,
        threadRef.current.id,
        assistantId
      );
      addMessageToConversation("assistant", assistantMessage);
    } catch (error) {
      console.error("Error calling assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMessageToConversation = (role, content) => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { role, content },
    ]);
    insertChatMessage(chatId, content, role)
      .then(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { chatItemId: chatId, content, role, timestap: new Date() },
        ]);
      })
      .catch(console.error);
  };

  // const addMessageToConversation = (message, sender) => {
  //   insertChatMessage(chatId, message, sender)
  //     .then(() => {
  //       setChatHistory(prevHistory => [
  //         ...prevHistory,
  //         { chatItemId: chatId, message, sender, timestamp: new Date() }
  //       ]);
  //     })
  //     .catch(console.error);
  // };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading, please wait");
      return;
    }

    addMessageToConversation("user", newMessage);
    callAssistant(newMessage, assistantId);
  };

  return (
    <Screen>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}

      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.timestamp.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
