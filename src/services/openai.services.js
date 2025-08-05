const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askOpenAI = async (systemPrompt, userPrompt) => {

  const messages = [
    { role: "system", content: "Eres un asistente virtual de un negocio. Responde usando la información del cliente." },
    { role: "user", content: businessPrompt },
    { role: "user", content: userPrompt },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    max_tokens: 200,
  });

  return response.choices[0].message.content;
};
  

  // ✅ Puedes mostrar cuántos tokens se usaron (opcional)
  const usage = response.usage;
  console.log("Tokens usados:", usage);


module.exports = { askOpenAI };


  