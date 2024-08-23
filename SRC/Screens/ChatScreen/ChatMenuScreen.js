import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ChatItem from "../../Components/ChatComponents/ChatItem";
import AppText from "../../Components/AppText";
import colors from "../../config/colors";
import { fetchChatItems, deleteChatItemById } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import AppButton from "../../Components/AppButton";
import { DatabaseContext } from "../../DatabaseProvider";
import { useTranslation } from "react-i18next";
import {
  CopilotProvider,
  useCopilot,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);

function ChatMenuScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { dbInitialized } = useContext(DatabaseContext);
  const [chatItems, setChatItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { start, copilotEvents } = useCopilot();

  useFocusEffect(
    useCallback(() => {
      const loadChatItems = async () => {
        if (dbInitialized) {
          try {
            const data = await fetchChatItems();
            console.log("chat items", data);
            setChatItems(data);
          } catch (error) {
            console.log("Error fetching ChatItems: ", error);
          }
        }
      };

      console.log("loading chat items");
      loadChatItems();
      console.log(chatItems);
    }, [dbInitialized])
  );

  const handlePress = (chat) => {
    console.log("in chat menu screen", chat.threadId, chat.assistantId);
    navigation.navigate("ChatScreen", {
      threadId: chat.threadId,
      assistantId: chat.assistantId,
      assistantName: chat.assistantName || t("PersianLegalGuide"),
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
      title={item.assistantName || t("PersianLegalGuide")}
      subTitle={item.lastMessage}
      imageUri={
        item.assistantId === "asst_40ROFN9nKe2V6Eka6bYXSZ2y"
          ? null
          : item.profile
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
    <CopilotStep text="This is chats screen" order={2} name="step4">
      <WalkthroughableView style={styles.container}>
        {chatItems.length === 0 ? (
          <Text>{t("noChats")}</Text>
        ) : (
          <FlatList
            data={chatItems}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={renderItem}
          />
        )}

        {/* <CopilotStep text="This is step 2" order={2} name="step2">
          <WalkthroughableText>Step 2</WalkthroughableText>
        </CopilotStep>

        <CopilotStep text="This is step 3" order={3} name="step3">
          <WalkthroughableText>Step 3</WalkthroughableText>
        </CopilotStep>
        <CopilotStep text="This is chats screen" order={4} name="step4">
          <View></View>
        </CopilotStep>
        <CopilotStep text="This is step 5" order={5} name="step5">
          <View></View>
        </CopilotStep>
        <CopilotStep text="This is step 6" order={6} name="step6">
          <View></View>
        </CopilotStep> */}
      </WalkthroughableView>
    </CopilotStep>
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
