import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ChatItem from "../../Components/ChatComponents/ChatItem";
import AppText from "../../Components/AppText";
import colors from "../../config/colors";
import { fetchChatItems, deleteChatItemById } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../Components/Screen";
import AppButton from "../../Components/AppButton";
import { DatabaseContext } from "../../DatabaseProvider"; // Adjust the import path

function ChatMenuScreen({ navigation }) {
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
    navigation.navigate("ChatScreen", {
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
      title={item.title || "Placeholder Title"}
      subTitle={item.lastMessage}
      image={require("../../assets/IMG_1706.jpeg")}
      modelname={item.modelname}
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
          <Text>No chats available. Please add a new chat.</Text>
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

export default ChatMenuScreen;
