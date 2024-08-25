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

const WalkthroughableView = walkthroughable(View);

const EmptyCS = ({ navigation, route }) => {
  const { start, copilotEvents } = useCopilot();
  const [isWalkthrough, setIsWalkthrough] = useState(false);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? headerHeight : headerHeight * 2
        } // put the botttom tab nav height here
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            source={require("../../assets/background.jpg")}
            style={styles.background}
          >
            <CopilotStep
              text="After you've pressed on an assitant, you will be redirected to the conversation and can message the chatbot"
              order={7}
              name="step7"
            >
              <WalkthroughableView style={styles.container}>
                {/* <FlatList
                ref={flatListRef} // Attach the ref here
                data={isWalkthrough ? [] : conversation}
                keyExtractor={(item, index) =>
                  `${item.threadId}-${item.role}-${index}`
                }
                renderItem={({ item }) => <Chatbubble message={item} />}
                contentContainerStyle={styles.flatListContent}
                ListFooterComponent={
                  streamedChunks && !completeResponse ? (
                    <Chatbubble
                      message={{
                        content: streamedChunks,
                        role: "assistant",
                        timestamp: new Date(),
                      }}
                    />
                  ) : null
                }
              /> */}
                <AppTextInput style={styles.input} />
              </WalkthroughableView>
            </CopilotStep>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <CopilotStep
        text="This is the Assitant tab. You can manage your assistants here"
        order={8}
        name="step8"
      >
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
  input: {
    marginTop: 10,
  },
});

export default EmptyCS;
