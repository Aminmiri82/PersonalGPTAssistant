// ApiBackEnd.js
import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const initializeAssistant = async ({ name, instructions, model }) => {
  try {
    console.log("Initializing assistant...");
    const assistant = await openai.beta.assistants.create({
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

const callAssistantApi = async (message) => {
  try {
    console.log("Creating thread...");
    const thread = await openai.beta.threads.create();
    console.log("Thread created:", thread.id);

    console.log("Sending message to thread...");
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    console.log("Message sent to thread:", message);

    console.log("Running assistant...");
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: "asst_40ROFN9nKe2V6Eka6bYXSZ2y", // Use your assistant ID
    });

    if (run.status === "completed") {
      console.log("Assistant run completed");
      const messages = await openai.beta.threads.messages.list(run.thread_id);
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

const addFile = async (
  files,
  assistantId = "asst_OOxeDr8gfBcBK0AUuXH4M68c"
) => {
  try {
    const fileStreams = await Promise.all(
      files.map(async (file) => {
        const filePath = file.uri.replace("file://", "");
        console.log("in the middle of file stream");
        console.log("filePath", filePath);
        return RNFS.readFile(filePath, "base64");
      })
    );
    console.log("creating VectorStore");
    // Create a vector store including our files.
    let vectorStore = await openai.beta.vectorStores.create({
      name: "Financial Statement",
    });
    console.log("vectorStore", vectorStore);

    console.log("doing file steam and buffer");
    // Convert base64 strings back to buffers before uploading
    const buffers = fileStreams.map((stream) => Buffer.from(stream, "base64"));

    console.log("uploading files");
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(
      vectorStore.id,
      buffers
    );

    console.log("updating assistant");
    await openai.beta.assistants.update(assistantId, {
      tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
    });
    console.log("Assistant updated:", assistantId);
  } catch (error) {
    console.error("Error adding file:", error);
  }
};

export { callAssistantApi, initializeAssistant, addFile };
