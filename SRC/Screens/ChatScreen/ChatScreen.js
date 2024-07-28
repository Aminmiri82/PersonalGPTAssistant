import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import { callAssistantApi, createThread } from "../../openai-backend/ApiBackEnd";
import { insertChatMessage, fetchChatHistory, insertChat, updateChatItemById } from "../../database";
import { DatabaseContext } from "../../DatabaseProvider"; // Adjust the import path

const ChatScreen = ({ navigation, route }) => {
  const { dbInitialized } = useContext(DatabaseContext);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const assistantId = route.params.assistantId;
  const threadId = route.params.threadId; // this can be null
  const chatId = route.params.chatId;
  const threadRef = useRef(null);

  useEffect(() => {
    const initializeThread = async () => {
      if (!dbInitialized) return; // Wait for the database to be initialized

      if (threadId === null) {
        console.log("Creating new thread...");
        try {
          const newThread = await createThread();
          threadRef.current = newThread.id;
          console.log("Thread created:", threadRef.current);

          await insertChat(threadRef.current, assistantId, null);
          console.log("Inserted chat", threadRef.current, assistantId, null);
        } catch (error) {
          console.error("Error initializing thread:", error);
        }
      } else {
        threadRef.current = threadId;
        console.log("Using existing thread:", threadRef.current);
        console.log("Fetching chat history...");
        try {
          const chatHistory = await fetchChatHistory(threadRef.current);
          console.log("Chat history fetched:", chatHistory);
          setConversation(chatHistory);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      }
    };

    initializeThread();
  }, [threadId, dbInitialized]); // Add dbInitialized as a dependency

  const callAssistant = async (message, assistantId) => {
    setLoading(true);
    if (threadRef.current === null) {
      console.log("Thread not initialized yet.");
      setLoading(false);
      return;
    }
    console.log("in chat screen call assistant", assistantId);
    try {
      console.log("Calling assistant with thread:", threadRef.current);
      const assistantMessage = await callAssistantApi(
        message,
        threadRef.current,
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
        threadId: threadRef.current,
        content: content,
        role: role,
        timestamp: new Date(),
      },
    ]);
    insertChatMessage(threadRef.current, content, role).catch(console.error);
    console.log("Message added to conversation and DB");
    console.log("Updating chatItem in DB, content:", content);
    updateChatItemById(chatId, content).catch(console.error);
    console.log("ChatItem updated in DB");
  };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading, please wait");
      return;
    }

    addMessageToConversationAndDB("user", newMessage);
    callAssistant(newMessage, assistantId);
  };

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }

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
