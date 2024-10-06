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
  copilotEvents,
} from "react-native-copilot";
import { useTheme } from "../../themes/ThemeProvidor";
import * as SecureStore from "expo-secure-store";
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableChatItem = walkthroughable(ChatItem);

function ChatMenuScreen({ navigation, route }) {
  const { dark, colorsTh, setScheme } = useTheme();

  const { t } = useTranslation();
  const { dbInitialized } = useContext(DatabaseContext);
  const [chatItems, setChatItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { start, copilotEvents } = useCopilot();
  const [OnWalkthrough, setOnWalkthrough] = useState(null);

  //dear amin please remember that the actal secure store vallue never chnages so you have to manipulate the onwalkthrough state manually
  useEffect(() => {
    const checkWalkthroughStatus = async () => {
      const walkthroughCompleted = await SecureStore.getItemAsync(
        "walkthroughCompleted"
      );
      if (walkthroughCompleted === "true") {
        setOnWalkthrough(false);
      } else {
        setOnWalkthrough(true);
      }
    };
    checkWalkthroughStatus();
    console.log("1OnWalkthrough status", OnWalkthrough);
  }, []);

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
      modelname={item.assistantModel|| "gpt-4o"}
      onPress={() => handlePress(item)}
      showDelete={editMode}
      onDelete={() => handleDelete(item.Id)}
    />
  );

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }
  console.log("2Onalkthrough status", OnWalkthrough);
  return (
    <>
      <CopilotStep text={t("step2")} order={2} name="step2">
        {OnWalkthrough === true ? (
          <WalkthroughableChatItem
            title={t("PersianLegalGuide")}
            subTitle={t("PersianLegalGuide")}
            imageUri={null}
            modelname={t("PersianLegalGuide")}
            onPress={() => console.log("pressed")}
            showDelete={editMode}
            onDelete={() => console.log("pressed")}
          />
        ) : (
          <WalkthroughableView></WalkthroughableView>
        )}
      </CopilotStep>

      <View
        style={[styles.container, { backgroundColor: colorsTh.background }]}
      >
        {chatItems.length === 0 && !OnWalkthrough ? (
          <AppText>{t("noChats")}</AppText>
        ) : (
          <FlatList
            data={chatItems}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>

      <CopilotStep text={t("step3")} order={3} name="step3">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
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
  Stepcontainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ChatMenuScreen;
