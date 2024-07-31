import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";
import * as SecureStore from "expo-secure-store";

let openai = null;

const initializeOpenAI = async () => {
  try {
    let apiKey = await SecureStore.getItemAsync("apiKey");
    console.log("API Key from SecureStore:", apiKey);
    if (!apiKey) {
      apiKey = OPENAI_API_KEY;
    }
    console.log("API Key:", apiKey);
    openai = new OpenAI({ apiKey: apiKey });
  } catch (error) {
    console.error("Error initializing OpenAI:", error);
    throw error;
  }
};

// Initialize OpenAI once when the module is first loaded
initializeOpenAI();

// Function to wait until OpenAI is initialized
const getOpenAIInstance = async () => {
  if (!openai) {
    await initializeOpenAI();
  }
  return openai;
};

const initializeAssistant = async ({ name, instructions, model }) => {
  try {
    const openaiInstance = await getOpenAIInstance();
    console.log("Initializing assistant...");
    const assistant = await openaiInstance.beta.assistants.create({
      name: name,
      instructions: instructions,
      tools: [{ type: "file_search" }],
      model: model,
      temperature: 0.75,
    });
    console.log("Assistant created:", assistant);

    return { assistantId: assistant.id }; // Return the assistant ID
  } catch (error) {
    console.error("Error initializing assistant:", error);
    return { error: "Failed to initialize assistant" }; // Return the error message
  }
};

const createThread = async () => {
  try {
    const openaiInstance = await getOpenAIInstance();
    console.log("Creating thread...");
    const thread = await openaiInstance.beta.threads.create();
    console.log("Thread created:", thread);
    return thread;
  } catch (error) {
    console.error("Error creating thread:", error);
    return null;
  }
};

const callAssistantApi = async (message, threadID, assistantId) => {
  try {
    const openaiInstance = await getOpenAIInstance();
    const thread = { id: threadID };
    console.log("Sending message to thread...");
    await openaiInstance.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    console.log("Message sent to thread:", message);
    console.log("in call assistant api", assistantId);
    console.log("Running assistant...");
    const run = await openaiInstance.beta.threads.runs.createAndPoll(
      thread.id,
      {
        assistant_id: assistantId, // Use your assistant ID
      }
    );

    if (run.status === "completed") {
      console.log("Assistant run completed");
      const messages = await openaiInstance.beta.threads.messages.list(
        run.thread_id
      );
      console.log("Messages received from thread:", messages.data);
      const assistantMessage = messages.data[0].content[0].text.value;

      if (assistantMessage) {
        console.log("Assistant message:", assistantMessage);
        return assistantMessage;
      } else {
        throw new Error("No assistant message found in the response");
      }
    } else {
      throw new Error("Assistant run failed");
    }
  } catch (error) {
    console.error("Error calling assistant:", error);
    throw error;
  }
};
const UPLOAD_URL = "https://api.openai.com/v1/uploads";
const COMPLETE_UPLOAD_URL =
  "https://api.openai.com/v1/uploads/{upload_id}/complete";
const uploadFiles = async (file) => {
  try {
    const apiKey = await SecureStore.getItemAsync("apiKey");
    const { name, size, mimeType, uri } = file[0];
    const upload = await createUpload(name, size, mimeType, apiKey);
    if (!upload.id) {
      throw new Error("Failed to create upload");
    }

    const partResponse = await uploadFile(
      upload.id,
      uri,
      mimeType,
      name,
      apiKey
    );
    const partIds = [partResponse.id];

    if (!partResponse.id) {
      throw new Error("Failed to upload part");
    }

    const completion = await completeUpload(upload.id, partIds, apiKey);
    console.log("Upload Complete", `File ID: ${completion.file.id}`);
    return completion.file.id;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

const createUpload = async (filename, fileSize, mimeType, apiKey) => {
  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename,
      purpose: "fine-tune",
      bytes: fileSize,
      mime_type: mimeType,
    }),
  });
  return response.json();
};
const uploadFile = async (uploadId, fileUri, mimeType, filename, apiKey) => {
  const formData = new FormData();
  formData.append("data", {
    uri: fileUri,
    type: mimeType,
    name: filename,
  });

  const response = await fetch(`${UPLOAD_URL}/${uploadId}/parts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  return response.json();
};
const completeUpload = async (uploadId, partIds, apiKey) => {
  const response = await fetch(
    COMPLETE_UPLOAD_URL.replace("{upload_id}", uploadId),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ part_ids: partIds }),
    }
  );
  return response.json();
};

export { callAssistantApi, initializeAssistant, uploadFiles, createThread };
