const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askOpenAI = async (businessPrompt, userPrompt) => {

  onsole.log("📩 Llamada a askOpenAI con:");
  console.log("📌 businessPrompt:", businessPrompt);
  console.log("📌 userPrompt:", userPrompt);

  const messages = [
  { role: "system", content: businessPrompt }, // Aquí está todo el contexto del negocio
  { role: "user", content: userPrompt },       // Aquí está la pregunta del cliente
];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0,
    max_tokens: 50,
  });

  console.log("Respuesta completa:", JSON.stringify(response, null, 2));

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


  