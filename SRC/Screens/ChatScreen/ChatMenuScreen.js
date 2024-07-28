import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
            setChatItems(data);
          } catch (error) {
            console.log("Error fetching ChatItems: ", error);
          }
        }
      };

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

  const handleDelete = (chat) => {
    deleteChatItemById(chat.threadId)
      .then(() => {
        setChatItems((prevChatItems) =>
          prevChatItems.filter((item) => item.id !== chat.threadId)
        );
      })
      .catch((error) => {
        console.log("Error deleting chat item: ", error);
      });
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }

  return (
    <Screen>
      <AppButton title={editMode ? "Done" : "Edit"} onPress={toggleEditMode} />
      <ChatItem
        title="placeholder"
        subTitle="placeholder"
        image="../../assets/IMG_1706.jpeg"
        modelname="placeholder"
        onPress={() => {
          console.log("in chat menu screen doing thing");
          navigation.navigate("ChatScreen", {
            assistantId: "asst_skHPpH0WHoCY6DdgHkdWmU9s",
            threadId: "thread_ed4b20gRQSNjNrGgheMSE5iD",
          });
        }}
        showDelete={editMode}
        onDelete={() => handleDelete(chat)}
      />
      <View>
        <ScrollView bounces={false}>
          {chatItems.length === 0 ? (
            <Text>No chats available. Please add a new chat.</Text>
          ) : (
            chatItems.map((chat) => (
              <ChatItem
                key={chat.Id}
                title="placeholder"
                subTitle={chat.lastMessage}
                image="../../assets/IMG_1706.jpeg"
                modelname={chat.modelname}
                onPress={() => handlePress(chat)}
                showDelete={editMode}
                onDelete={() => handleDelete(chat)}
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
