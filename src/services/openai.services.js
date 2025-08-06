const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askOpenAI = async (businessPrompt, userPrompt) => {

  const messages = [
  { role: "system", content: businessPrompt }, // Aquí está todo el contexto del negocio
  { role: "user", content: userPrompt },       // Aquí está la pregunta del cliente
];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    max_tokens: 200,
  });

  // ✅ Mostrar tokens usados (si están disponibles)
  if (response.usage) {
    console.log("Tokens usados (prompt):", response.usage.prompt_tokens);
    console.log("Tokens usados (completion):", response.usage.completion_tokens);
    console.log("Tokens usados (total):", response.usage.total_tokens);
  } else {
    console.log("No se pudo obtener el uso de tokens.");
  }


  return response.choices[0].message.content;
};


module.exports = { askOpenAI };


  