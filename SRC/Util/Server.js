const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: sk-proj-gHNRxlMCKXfC8XCZwQa7T3BlbkFJqLKbZxZkRM5gnOWPVgRi,
});

const openai = new OpenAIApi(configuration);

// Example function to use the OpenAI API
async function getResponse() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello, world!",
        max_tokens: 5,
    });
    console.log(response.data.choices[0].text);
}

getResponse();
