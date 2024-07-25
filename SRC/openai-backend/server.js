const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

const assistantId = "asst_40ROFN9nKe2V6Eka6bYXSZ2y"; // Use the preset assistant ID

app.post("/call-assistant", async (req, res) => {
  const { message } = req.body;

  if (!assistantId) {
    console.error("Assistant ID is not set");
    return res.status(500).json({ error: "Assistant not initialized" });
  }

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
      assistant_id: assistantId,
    });

    if (run.status === "completed") {
      console.log("Assistant run completed");
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      console.log("Messages received from thread:", messages.data);
      console.log(
        "THIS Messages received from thread:",
        messages.data[0].content[0].text.value
      );

      const assistantMessage = messages.data[0].content[0].text.value;

      if (assistantMessage) {
        console.log("Assistant message:", assistantMessage);
        res.json({ message: assistantMessage });
      } else {
        console.error("No assistant message found in the response");
        res.status(500).json({ error: "No assistant message found" });
      }
    } else {
      console.error("Assistant run failed:", run);
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
