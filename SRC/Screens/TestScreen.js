import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";

const addMessageToThread = async (threadId, message, apiKey) => {
  try {
    const messageResponse = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({ role: "user", content: message }),
      }
    );
    const messageData = await messageResponse.json();
    console.log("Message added:", messageData);
    return messageData;
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
};

const runThreadWithStreaming = async (
  threadId,
  assistantId,
  apiKey,
  handleStreamedEvent,
  setIsLoading
) => {
  try {
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({ assistant_id: assistantId, stream: true }),
      }
    );

    if (!runResponse.ok) {
      throw new Error(`HTTP error! status: ${runResponse.status}`);
    }

    const responseText = await runResponse.text();

    const handleStreamedResponse = (value) => {
      const lines = value.split("\n");
      for (const line of lines) {
        if (line.trim().startsWith("data:")) {
          const data = line.trim().slice(5).trim();
          if (data === "[DONE]") {
            setIsLoading(false);
          } else {
            try {
              const event = JSON.parse(data);
              handleStreamedEvent(event);
            } catch (error) {
              console.error("Error parsing streamed response:", error);
            }
          }
        }
      }
    };

    const simulateStream = async (text) => {
      const lines = text.split("\n");
      for (const line of lines) {
        if (line) {
          handleStreamedResponse(line);
          await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay between chunks
        }
      }
    };

    await simulateStream(responseText);
  } catch (error) {
    console.error("Error running thread:", error);
    setIsLoading(false);
  }
};

const handleStreamedEvent = (
  event,
  setStreamedChunks,
  setCompleteResponse,
  setIsLoading
) => {
  switch (event.object) {
    case "thread.message.delta":
      if (event.delta.content) {
        const content = event.delta.content[0].text.value;
        setStreamedChunks((prevChunks) => prevChunks + content);
      }
      break;
    case "thread.message.completed":
      const finalMessage = event.content[0].text.value;
      setCompleteResponse(finalMessage);
      setIsLoading(false);
      break;
    default:
      break;
  }
};

const ChatScreen = ({ navigation, route }) => {
  const apiKey = "fuck no";
  const threadId = "thread_tKlHb8rst8Zpo7mmwfFJDKHC";
  const assistantId = "asst_vSXZPlFpwmAHVT0XV94ObY3c";

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamedChunks, setStreamedChunks] = useState("");
  const [completeResponse, setCompleteResponse] = useState(null);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    setStreamedChunks("");
    setCompleteResponse(null);
    await addMessageToThread(threadId, inputText, apiKey);
    await runThreadWithStreaming(
      threadId,
      assistantId,
      apiKey,
      (event) =>
        handleStreamedEvent(
          event,
          setStreamedChunks,
          setCompleteResponse,
          setIsLoading
        ),
      setIsLoading
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter your question..."
        value={inputText}
        onChangeText={handleInputChange}
        style={{
          padding: 10,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />
      <Button title="Submit" onPress={handleButtonClick} disabled={isLoading} />
      {isLoading && <Text>Loading...</Text>}
      <ScrollView>
        <Text>{streamedChunks}</Text>
        {completeResponse && <Text>{completeResponse}</Text>}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
