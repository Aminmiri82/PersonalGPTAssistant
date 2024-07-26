import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { initDB, getDB } from "../../database";
import ChatItem from "../../Components/ChatComponents/ChatItem";
import { initializeAssistant } from "../../openai-backend/ApiBackEnd";
import AppDocumentPicker from "../../Components/AssistantsComponents/AppDocumentPicker";
import AppText from "../../Components/AppText";
import colors from "../../config/colors";
import axios from "axios";

const ChatMenuScreen = ({ navigation }) => {
  const [chatItems, setChatItems] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = await initDB();
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM ChatItems", [], (tx, results) => {
          let items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          setChatItems(items);
        });
      });
    };
    fetchData();
  }, []);

  return (
    <View>
      <Button
        title="New Chat"
        onPress={() => navigation.navigate("ChatScreen")}
      />

      <FlatList
        data={chatItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatItem
            title={item.title}
            lastMessage={item.lastMessage}
            timestamp={item.timestamp}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: "100%",
    marginTop: 10,
    height: "50%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
  },
  bottomTipContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTip: {
    color: colors.dark,
    fontSize: 18,
    textAlign: "center",
  },
});

export default ChatMenuScreen;
