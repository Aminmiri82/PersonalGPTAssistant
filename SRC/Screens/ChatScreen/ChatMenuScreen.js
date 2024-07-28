import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text, ScrollView, StyleSheet } from "react-native";

import ChatItem from "../../Components/ChatComponents/ChatItem";
import { initializeAssistant } from "../../openai-backend/ApiBackEnd";
import AppDocumentPicker from "../../Components/AssistantsComponents/AppDocumentPicker";
import AppText from "../../Components/AppText";
import colors from "../../config/colors";
import axios from "axios";
import { fetchChatItems, deleteChatItemById, initDB } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../Components/Screen";
import AppButton from "../../Components/AppButton";

function ChatMenuScreen({ navigation }) {
  const [chatItems, setChatItems] = useState([]);
  const [files, setFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchChatItems()
        .then((data) => {
          setChatItems(data);
        })
        .catch((error) => {
          console.log("Error fetching ChatItems: ", error);
        });
    }, [])
  );

  const handlePress = (id) => {
    navigation.navigate("ChatScreen", { threadId: id });
  };

  const handleDelete = (threadId) => {
    deleteChatItemById(threadId)
      .then(() => {
        setChatItems((prevChatItems) =>
          prevChatItems.filter((item) => item.id !== threadId)
        );
      })
      .catch((error) => {
        console.log("Error deleting chat item: ", error);
      });
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <Screen>
      <AppButton title={editMode ? "Done" : "Edit"} onPress={toggleEditMode} />
      <View>
        <ScrollView bounces={false}>
          {chatItems.length === 0 ? (
            <Text>No chats available. please add a new chat.</Text>
          ) : (
            chatItems.map((chat) => (
              <ChatItem
                key={chat.id}
                title={chat.assistantName}
                subTitle={chat.lmit}
                image="../../assets/IMG_1706.jpeg"
                modelname={chat.modelname}
                onPress={() => handlePress(chat.id)}
                showDelete={editMode}
                onDelete={() => handleDelete(chat.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

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
