import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet, FlatList } from "react-native";

import ChatItem from "../../Components/ChatComponents/ChatItem";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Icon from "../../Components/Icon";
import ListItemSeparator from "../../Components/ListItemSeparator";
import Textinput from "../../Components/ChatComponents/Textinput";
import ChatBubble from "../../Components/ChatComponents/Chatbubble";
import { fetchChatHistory, insertChatMessage, initDB } from "../../database";

// const ChatScreen = ({ navigation }) => {
//   const [newChatTitle, setNewChatTitle] = useState("");

//   const addChatItem = () => {
//     const db = getDB();
//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           "INSERT INTO ChatItems (title, lastMessage, timestamp) VALUES (?, ?, ?)",
//           [newChatTitle, "", new Date().toISOString()]
//         );
//       },
//       (error) => {
//         console.log("Transaction error: ", error);
//       },
//       () => {
//         console.log("Chat item added successfully");
//         navigation.goBack();
//       }
//     );
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter chat title"
//         value={newChatTitle}
//         onChangeText={setNewChatTitle}
//       />
//       <Button title="Add Chat" onPress={addChatItem} />
//     </View>
//   );
// };
function ChatScreen({ navigation, route }) {
  const { assistantId } = route.params;
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  useEffect(() => {
    fetchChatHistory(assistantId)
      .then((history) => {
        setChatHistory(history);
      })
      .catch((error) => {
        console.log("Error fetching chat history: ", error);
      });
  }, [assistantId]);

  const handleSend = () => {
    if (message.trim() === "") return;
    insertChatMessage(assistantId, message)
      .then(() => {
        setChatHistory([
          ...chatHistory,
          { assistantId, message, timestamp: new Date() },
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
