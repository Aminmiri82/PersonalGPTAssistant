import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import {
  callAssistantApi,
  createThread,
} from "../../openai-backend/ApiBackEnd";
import {
  insertChatMessage,
  fetchChatHistory,
  insertChat,
} from "../../database";

const ChatScreen = ({ navigation, route }) => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const assistantId = route.params.assistantId;
  const threadId = route.params.threadId; // this can be null
  console.log("in chat screen", assistantId);
  console.log("in chat screen threadID recieved", threadId);
  const threadRef = useRef(null);

  useEffect(() => {
    const initializeThread = async () => {
      if (threadId === null) {
        console.log("Creating new thread...");
        threadRef.current = await createThread();
        console.log("Thread created:", threadRef.current);
      } else {
        threadRef.current = threadId;
        console.log("Using existing thread:", threadRef.current);
        console.log("Fetching chat history...");
        fetchChatHistory(threadId).then(setConversation).catch(console.error);
      }
    };
    initializeThread()
      .then(() => insertChat(threadRef.current.id, assistantId, null))
      .then(() => console.log("inserted chat", threadRef.current.id, assistantId, null))
      .catch(console.error);
  }, [threadId]);

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
      addMessageToConversationAndDB("assistant", assistantMessage);
    } catch (error) {
      console.error("Error calling assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMessageToConversationAndDB = (role, content) => {
    setConversation((prevConversation) => [
      ...prevConversation,
      {
        threadId: threadRef.current.id,
        content: content,
        role: role,
        timestamp: new Date(),
      },
    ]);
    insertChatMessage(threadRef.current.id, content, role).catch(console.error);
  };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading, please wait");
      return;
    }

    addMessageToConversationAndDB("user", newMessage);
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
        data={conversation}
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
