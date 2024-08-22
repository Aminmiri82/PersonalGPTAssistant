import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ChatItem from "../../../Components/ChatComponents/ChatItem";

import colors from "../../../config/colors";
import { fetchChatItems, deleteChatItemById } from "../../../database";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../../Components/Screen";
import { DatabaseContext } from "../../../DatabaseProvider"; // Adjust the import path
import { useTranslation } from "react-i18next";

function WTChatMenuScreen({ navigation }) {
  const { t } = useTranslation();
  const { dbInitialized } = useContext(DatabaseContext);
  const [chatItems, setChatItems] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadChatItems = async () => {
        if (dbInitialized) {
          try {
            const data = await fetchChatItems();
            setChatItems(data.reverse());
          } catch (error) {
            console.log("Error fetching ChatItems: ", error);
          }
        }
      };

      console.log("loading chat items");
      loadChatItems();
    }, [dbInitialized])
  );

  const handlePress = (chat) => {
    console.log("in chat menu screen", chat.threadId, chat.assistantId);
    navigation.navigate("WTChatScreen", {
      threadId: chat.threadId,
      assistantId: chat.assistantId,
    });
  };

  const handleDelete = (chatId) => {
    deleteChatItemById(chatId)
      .then(() => {
        setChatItems((prevChatItems) =>
          prevChatItems.filter((item) => item.Id !== chatId)
        );
      })
      .catch((error) => {
        console.log("Error deleting chat item: ", error);
      });
  };

  const renderItem = ({ item }) => (
    <ChatItem
      title={item.assistantName || "Legal Guide"}
      subTitle={item.lastMessage}
      image={
        item.assistantId === "asst_40ROFN9nKe2V6Eka6bYXSZ2y"
          ? require("../../../assets/logo.jpg")
          : require("../../../assets/assistant.jpg")
      }
      modelname={item.assistantModel}
      onPress={() => handlePress(item)}
      showDelete={editMode}
      onDelete={() => handleDelete(item.Id)}
    />
  );

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }

  return (
    <Screen>
      <View style={styles.container}>
        {chatItems.length === 0 ? (
          <Text>{t("noChats")}</Text>
        ) : (
          <FlatList
            data={chatItems}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={renderItem}
          />
        )}
      
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default WTChatMenuScreen;
