import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
import AppTextInput from "../../Components/ChatComponents/AppTextInput";
import Screen from "../../Components/Screen";
import Chatbubble from "../../Components/ChatComponents/Chatbubble";
import {
  createThread,
  getOpenAIInstance,
} from "../../openai-backend/ApiBackEnd";
import {
  insertChatMessage,
  fetchChatHistory,
  insertChat,
  updateChatItemById,
} from "../../database";
import { DatabaseContext } from "../../DatabaseProvider"; // Adjust the import path

import { connectToSSE } from "../../openai-backend/sseHandler";
import EventSource from "react-native-sse";

const ChatScreen = ({ navigation, route }) => {
  const { dbInitialized } = useContext(DatabaseContext);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const assistantId = route.params.assistantId;
  const threadId = route.params.threadId; // this can be null

  const threadRef = useRef(null);

  useEffect(() => {
    const initializeThread = async () => {
      if (!dbInitialized) return; // Wait for the database to be initialized

      if (threadId === null) {
        console.log("Creating new thread...");
        try {
          const newThread = await createThread();
          threadRef.current = newThread.id;
          console.log("Thread created:", threadRef.current);

          await insertChat(threadRef.current, assistantId, null);
          console.log("Inserted chat", threadRef.current, assistantId, null);
        } catch (error) {
          console.error("Error initializing thread:", error);
        }
      } else {
        threadRef.current = threadId;
        console.log("Using existing thread:", threadRef.current);
        console.log("Fetching chat history...");
        try {
          const chatHistory = await fetchChatHistory(threadRef.current);
          console.log("Chat history fetched:", chatHistory);
          setConversation(chatHistory);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      }
    };

    initializeThread();
  }, [threadId, dbInitialized]); // Add dbInitialized as a dependency

  const callAssistant = async (message, assistantId) => {
    setLoading(true);
    if (threadRef.current === null) {
      console.log("Thread not initialized yet.");
      setLoading(false);
      return;
    }
  
    console.log("in chat screen call assistant", assistantId);
  
    try {
      const openaiInstance = await getOpenAIInstance();
  
      // Log the openaiInstance to verify its structure
      console.log("OpenAI Instance:", openaiInstance);
  
      const basePath = openaiInstance.basePath || openaiInstance._options.basePath;
      if (!openaiInstance || !basePath) {
        throw new Error("OpenAI instance or basePath is not defined");
      }
  
      const thread = { id: threadRef.current };
  
      console.log("Sending message to thread...");
      await openaiInstance.beta.threads.messages.create(thread.id, {
        role: "user",
        content: message,
      });
  
      console.log("Message sent to thread:", message);
      console.log("Starting assistant run...");
  
      // First, create a run
      const runResponse = await openaiInstance.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
      });
  
      const runId = runResponse.id; // Ensure you get the run ID from the response
      console.log("Run ID:", runId);
  
      // Now, stream the results of the run
      const streamUrl = `${basePath}/beta/runs/${runId}/events`;
      console.log("Stream URL:", streamUrl);
  
      const eventSource = new EventSource(streamUrl, {
        headers: {
          Authorization: `Bearer ${openaiInstance.apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      });
  
      eventSource.addEventListener("open", () => {
        console.log("Open SSE connection.");
      });
  
      eventSource.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        const content = data.delta?.content[0]?.text?.value || "";
        setStreamingMessage((prev) => ({
          ...prev,
          content: (prev?.content || "") + content,
          role: "assistant",
          timestamp: new Date(),
        }));
      });
  
      eventSource.addEventListener("error", (event) => {
        if (event.type === 'error') {
          console.error("Connection error:", event.message);
        } else if (event.type === 'exception') {
          console.error("Error:", event.message, event.error);
        }
        setLoading(false);
        eventSource.close();
      });
  
      eventSource.addEventListener("close", () => {
        console.log("Close SSE connection.");
        if (streamingMessage) {
          addMessageToConversationAndDB("assistant", streamingMessage.content);
        }
        setStreamingMessage(null);
        setLoading(false);
      });
  
      return () => {
        eventSource.removeAllEventListeners();
        eventSource.close();
      };
    } catch (error) {
      console.error("Error calling assistant:", error);
      setLoading(false);
    }
  };

  const addMessageToConversationAndDB = (role, content) => {
    const newMessage = {
      threadId: threadRef.current,
      content: content,
      role: role,
      timestamp: new Date(),
    };

    setConversation((prevConversation) => [...prevConversation, newMessage]);
    insertChatMessage(threadRef.current, content, role).catch(console.error);
    console.log("Message added to conversation and DB");
    console.log("Updating chatItem in DB, content:", content);

    updateChatItemById(threadRef.current, content.slice(0, 25) + "...").catch(
      console.error
    );
    console.log("ChatItem updated in DB");
  };

  const handleSetMessage = (newMessage) => {
    if (loading) {
      console.error("Still loading, please wait");
      return;
    }

    addMessageToConversationAndDB("user", newMessage);
    callAssistant(newMessage, assistantId);
  };

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }

  return (
    <Screen>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <Text>Loading...</Text>
            </View>
          )}

          <FlatList
            data={[...conversation, streamingMessage].filter(Boolean)} // Include streamingMessage if it exists
            keyExtractor={(item) => item.timestamp.toString()}
            renderItem={({ item }) => <Chatbubble message={item} />}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <AppTextInput onSubmit={handleSetMessage} />
      </ImageBackground>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    alignSelf: "center",
    fontSize: 15,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default ChatScreen;
