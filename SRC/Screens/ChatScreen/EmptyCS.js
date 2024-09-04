import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import {
  addMessageToThread,
  createThread,
} from "../../openai-backend/ApiBackEnd";
import {
  insertChatMessage,
  fetchChatHistory,
  insertChat,
  updateChatItemById,
} from "../../database";
import { DatabaseContext } from "../../DatabaseProvider"; // Adjust the import path
import * as SecureStore from "expo-secure-store";
import { useHeaderHeight } from "@react-navigation/elements";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";
import { Chat } from "openai/resources";
import { useTranslation } from "react-i18next";

const WalkthroughableView = walkthroughable(View);
const WalkthroughableChatbubble = walkthroughable(Chatbubble);

const EmptyCS = ({ navigation, route }) => {
  const { start, copilotEvents } = useCopilot();
  const [isWalkthrough, setIsWalkthrough] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkWalkthrough = async () => {
      if (route.params?.isWalkthrough) {
        setIsWalkthrough(true);
      }
    };
    checkWalkthrough();
  }, [route.params?.isWalkthrough]);

  const headerHeight = useHeaderHeight();
  return (
    <Screen>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.container}>
            <CopilotStep text={t("step6")} order={6} name="step6">
              <WalkthroughableView>
              <WalkthroughableChatbubble
                message={{
                  content: t("step6MessageA"),
                  role: "user",
                }}
              />
              <WalkthroughableChatbubble
                message={{ content: t("step6MessageB"), role: "assistant" }}
              /></WalkthroughableView>
            </CopilotStep>

            <Chatbubble
              message={{ content: t("step6MessageC"), role: "user" }}
            />
            <Chatbubble
              message={{ content: t("step6MessageD"), role: "assistant" }}
            />
            <Chatbubble
              message={{ content: t("step6MessageE"), role: "user" }}
            />
            <Chatbubble
              message={{ content: t("step6MessageF"), role: "assistant" }}
            />
            <Chatbubble
              message={{ content: t("step6MessageG"), role: "user" }}
            />
          </View>
          <AppTextInput />
        </View>
      </ImageBackground>

      <CopilotStep text={t("step7")} order={7} name="step7">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  CopilotStepcontainer: {},
});

export default EmptyCS;
