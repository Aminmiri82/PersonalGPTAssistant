// server.js
const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.post("/initialize-assistant", async (req, res) => {
  try {
    console.log("Initializing assistant...");
    const assistant = await openai.beta.assistants.create({
      name: "Code Interpreter",
      instructions: "You are a code interpreter. Answer code-related questions.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o",
    });

    console.log("Assistant created:", assistant);
    res.json({ assistantId: assistant.id });
  } catch (error) {
    console.error("Error initializing assistant:", error);
    res.status(500).json({ error: "Failed to initialize assistant" });
  }
});

app.post("/call-assistant", async (req, res) => {
  const { assistantId, message } = req.body;

  try {
    console.log("Creating thread...");
    const thread = await openai.beta.threads.create();

    console.log("Sending message to thread...");
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    console.log("Running assistant...");
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
      instructions:"Please address the user as Jane Doe. The user has a premium account.",
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const assistantMessage = messages.data[0]?.content[0]?.text?.value;
      res.json({ message: assistantMessage });
    } else {
      res.status(500).json({ error: "Assistant run failed" });
    }
  } catch (error) {
    console.error("Error calling assistant:", error);
    res.status(500).json({ error: "Failed to call assistant" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
