// ChatScreen.js
import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import { callAssistantApi } from "../../openai-backend/ApiBackEnd";

const ChatScreen = ({ navigation, threadId, assistantId }) => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const callAssistant = async (message) => {
    setLoading(true);
    try {
      const assistantMessage = await callAssistantApi(message);
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
  };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading, please wait");
      return;
    }

    addMessageToConversation("user", newMessage);
    callAssistant(newMessage);
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
