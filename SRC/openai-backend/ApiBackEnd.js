// assistantApi.js
import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });


const initializeAssistant = async ({ name, instructions, model }) => {
    try {
      console.log("Initializing assistant...");
      const assistant = await openai.beta.assistants.create({
        name: name,
        instructions: instructions,
        tools: [{ type: "file_search" }],
        model: model,
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

export {callAssistantApi,initializeAssistant};
