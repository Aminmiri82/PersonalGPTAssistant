import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet, FlatList,Text } from "react-native";

import ChatItem from "../../Components/ChatComponents/ChatItem";
import colors from "../../config/colors";
import Icon from "../../Components/Icon";
import ListItemSeparator from "../../Components/ListItemSeparator";
import ChatBubble from "../../Components/ChatComponents/Chatbubble";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import { callAssistantApi } from "../../openai-backend/ApiBackEnd";
import { fetchChatHistory, insertChatMessage, initDB } from "../../database";

const ChatScreen = ({ navigation, threadId, assistantId,route }) => {
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
  const { NOTassistantId } = route.params;
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  useEffect(() => {
    fetchChatHistory(NOTassistantId)
      .then((history) => {
        setChatHistory(history);
      })
      .catch((error) => {
        console.log("Error fetching chat history: ", error);
      });
  }, [NOTassistantId]);

  const handleSend = () => {
    if (message.trim() === "") return;
    insertChatMessage(NOTassistantId, message)
      .then(() => {
        setChatHistory([
          ...chatHistory,
          { NOTassistantId, message, timestamp: new Date() },
        ]);
        setMessage("");
      })
      .catch((error) => {
        console.log("Error sending message: ", error);
      });
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => <ChatBubble text={item.message} />}
        contentContainerStyle={styles.chatContainer}
      />
      {/* <Textinput onSubmit={handleSend} /> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 50, // Add some padding to avoid being covered by the TextInput
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default ChatScreen;
