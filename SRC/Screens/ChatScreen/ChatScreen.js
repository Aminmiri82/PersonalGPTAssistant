import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";

const ChatScreen = ({ navigation }) => {
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const [conversation, setConversation] = useState([]);
  const [assistant, setAssistant] = useState(null);
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAssistant = async () => {
      try {
        const assistant = await openai.beta.assistants.create({
          name: "Math Tutor",
          instructions:
            "You are a personal math tutor. Write and run code to answer math questions.",
          tools: [{ type: "code_interpreter" }],
          model: "gpt-4o",
        });
        setAssistant(assistant);
        const newThread = await openai.beta.threads.create();
        setThread(newThread);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing assistant or thread:", error);
        setLoading(false);
      }
    };

    initializeAssistant();
  }, []);

  const callAssistant = async (newMessage) => {
    if (!assistant || !thread) {
      console.error("Assistant or thread not initialized");
      return;
    }

    try {
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: newMessage,
      });

      const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistant.id,
        instructions:
          "Please address the user as Jane Doe. The user has a premium account.",
      });

      if (run.status === "completed") {
        const messages = await openai.beta.threads.messages.list(run.thread_id);

        console.log("testing", messages.data[0].content[0].text.value);
        handleSetAns(messages.data[0].content[0].text.value);
      } else {
        console.log(run.status);
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };

  const handleSetAns = (newAns) => {
    setConversation((prevAns) => [
      ...prevAns,
      { role: "assistant", content: newAns },
    ]);
  };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading assistant and thread, please wait");
      return;
    }

    setConversation((prevMessages) => [
      ...prevMessages,
      { role: "user", content: newMessage },
    ]);
    callAssistant(newMessage); // Call the function with the new message
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <Text>Loading assistant and thread...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={conversation}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Chatbubble message={item} />}
        contentContainerStyle={styles.flatListContent}
      />
      <AppTextInput onSubmit={handleSetMessage} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
