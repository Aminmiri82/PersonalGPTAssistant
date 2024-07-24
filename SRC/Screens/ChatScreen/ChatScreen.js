import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import axios from "axios";

const ChatScreen = ({ navigation }) => {
  const [conversation, setConversation] = useState([]);
  const [assistantId, setAssistantId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAssistant = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/initialize-assistant"
        );
        setAssistantId(response.data.assistantId);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing assistant:", error);
        setLoading(false);
      }
    };

    initializeAssistant();
  }, []);

  const callAssistant = async (newMessage) => {
    if (!assistantId) {
      console.error("Assistant not initialized");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/call-assistant",
        {
          assistantId,
          message: newMessage,
        }
      );

      const assistantMessage = response.data.message;
      handleSetAns(assistantMessage);
    } catch (error) {
      console.error("Error calling assistant:", error);
    }
  };

  const handleSetAns = (newAns) => {
    setConversation((prevAns) => [
      ...prevAns,
      { role: "assistant", content: newAns },
    ]);
  };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading assistant, please wait");
      return;
    }

    setConversation((prevMessages) => [
      ...prevMessages,
      { role: "user", content: newMessage },
    ]);
    callAssistant(newMessage);
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <Text>Loading assistant...</Text>
        </View>
      </Screen>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
