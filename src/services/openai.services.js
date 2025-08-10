const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askOpenAI = async ( businessPrompt, userPrompt ) => {

  const messages = [
  { role: "system", content: businessPrompt }, // Aquí está todo el contexto del negocio
  { role: "user", content: userPrompt },       // Aquí está la pregunta del cliente
];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0,
    max_tokens: 30,
  });


  return {
    text: response.choices[0].message.content,
    usage: response.usage
  };
};


module.exports = { askOpenAI };


  