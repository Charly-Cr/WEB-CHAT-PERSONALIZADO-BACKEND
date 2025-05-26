// src/services/openai.services.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askOpenAI = async (systemPrompt, userPrompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },  // systemPrompt lo arma tu backend.
      { role: "user", content: userPrompt },   //userPrompt viene del cliente
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

module.exports = { askOpenAI };