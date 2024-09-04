import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Upload from "react-native-background-upload";

let openai = null;

const initializeOpenAI = async () => {
  try {
    
    let apiKey = OPENAI_API_KEY;
    console.log("API Key from env:", apiKey);
    openai = new OpenAI({
      apiKey: apiKey,
      basePath: "https://api.openai.com/v1",
    });
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

const addMessageToThread = async (threadId, message) => {
  try {
    let apiKey = OPENAI_API_KEY;
    console.log("API Key from env in addMessageToThread:", apiKey);
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
    //return messageData;    i think this is not needed
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
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
const MAX_RETRIES = 3;

const uploadIndividualFiles = async (file, onProgress, reportError) => {
  let retriesLeft = MAX_RETRIES;

  const attemptUpload = async () => {
    try {
      const apiKey = OPENAI_API_KEY;
      const { name, size, mimeType, uri } = file;
      console.log("Starting upload for file:", { name, size, mimeType, uri });

      // Step 1: Create Upload
      const upload = await createUpload(name, size, mimeType, apiKey);
      console.log("Upload created:", upload);

      if (!upload.id) {
        throw new Error("Failed to create upload");
      }

      // Step 2: Upload File
      const partResponse = await startBackgroundUpload(
        upload.id,
        uri,
        mimeType,
        name,
        apiKey,
        onProgress
      );
      const partId = partResponse.id; // No need to parse JSON here
      console.log("Part uploaded:", partId);

      if (!partId) {
        throw new Error("Failed to upload part");
      }

      // Step 3: Complete Upload
      const completion = await completeUpload(upload.id, [partId], apiKey);
      console.log("Upload complete:", completion);

      if (!completion.file || !completion.file.id) {
        throw new Error("Failed to complete upload");
      }

      console.log("Upload Complete, File ID:", completion.file.id);
      return completion.file.id;
    } catch (error) {
      console.error("Error uploading files: here", error);

      if (retriesLeft > 0) {
        retriesLeft--;
        console.log(
          `Retrying upload... (${MAX_RETRIES - retriesLeft}/${MAX_RETRIES})`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 second before retrying
        return attemptUpload();
      } else {
        reportError(file.id, error.message);
        throw error;
      }
    }
  };

  return attemptUpload();
};

const createUpload = async (
  filename,
  fileSize,
  mimeType,
  apiKey,
  retries = 3
) => {
  try {
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
    const jsonResponse = await response.json();
    console.log("Create upload response:", jsonResponse);

    if (jsonResponse.error) {
      throw new Error(jsonResponse.error.message);
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error creating upload:", error);
    if (retries > 0) {
      console.log(`Retrying create upload... (${3 - retries + 1}/3)`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second before retrying
      return createUpload(filename, fileSize, mimeType, apiKey, retries - 1);
    } else {
      throw error;
    }
  }
};

const startBackgroundUpload = async (
  uploadId,
  fileUri,
  mimeType,
  filename,
  apiKey,
  onProgress
) => {
  try {
    const formData = new FormData();
    formData.append('data', {
      uri: fileUri,
      name: filename,
      type: mimeType,
    });

    const response = await axios.post(`${UPLOAD_URL}/${uploadId}/parts`, formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader('x-decompressed-content-length');

        if (totalLength) {
          const progress = Math.round((progressEvent.loaded * 100) / totalLength);
          onProgress(progress);
        }
      },
    });

    console.log('Upload completed:', response.data);

    return response.data; // Already parsed as JSON
  } catch (error) {
    console.error('Upload error:', error.message);
    console.error('Error response data:', error.response?.data);
    console.error('Error response status:', error.response?.status);
    console.error('Error response headers:', error.response?.headers);
    throw error;
  }
};

const completeUpload = async (uploadId, partIds, apiKey) => {
  try {
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
    const jsonResponse = await response.json();
    console.log("Complete upload response:", jsonResponse);

    if (jsonResponse.error) {
      throw new Error(jsonResponse.error.message);
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error completing upload:", error);
    throw error;
  }
};

async function createVectorStore(openaiInstance, fileIds) {
  const vectorStore = await openaiInstance.beta.vectorStores.create({
    name: "my-vector-store",
    file_ids: fileIds,
  });
  return vectorStore.id;
}

async function pollVectorStoreStatus(openaiInstance, vectorStoreId) {
  let isCompleted = false;
  while (!isCompleted) {
    const vectorStore = await openaiInstance.beta.vectorStores.retrieve(
      vectorStoreId
    );
    if (vectorStore.status === "completed") {
      isCompleted = true;
    } else {
      console.log("Vector store status:", vectorStore.status);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function updateAssistantWithVectorStore(
  openaiInstance,
  assistantId,
  vectorStoreId
) {
  await openaiInstance.beta.assistants.update(assistantId, {
    tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
  });
}

const addFilesToAssistant = async (assistantId, fileIds) => {
  const openaiInstance = await getOpenAIInstance();
  console.log("creating vector store");
  const vectorStoreId = await createVectorStore(openaiInstance, fileIds);
  console.log("vector store created", vectorStoreId);
  await pollVectorStoreStatus(openaiInstance, vectorStoreId);
  await updateAssistantWithVectorStore(
    openaiInstance,
    assistantId,
    vectorStoreId
  );
  console.log(
    `Assistant ${assistantId} is now updated with Vector Store ${vectorStoreId}`
  );
};

export {
  callAssistantApi,
  initializeAssistant,
  uploadIndividualFiles,
  createThread,
  addFilesToAssistant,
  addMessageToThread,
};
