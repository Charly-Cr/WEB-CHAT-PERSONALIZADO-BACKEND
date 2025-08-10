const OpenAI = require("openai");
const { business } = require("../models");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askOpenAI = async (businessPrompt, userPrompt, businessData) => {

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

  const totalTokens = response.usage?.total_tokens || 0;

  // Actualizar contador en la BD
  await business.update(
    { tokensUsed: (businessData.tokensUsed || 0) + totalTokens },
    { where: { id: businessData.id } }
  );

  // Avisar si está cerca del límite (80%)
  if ((businessData.tokensUsed + totalTokens) >= (businessData.tokenLimit * 0.8)) {
    console.warn(`⚠️ Negocio ${businessData.id} está cerca de su límite de tokens`);
    // Aquí podrías mandar un email o notificación
  }

  return response.choices[0].message.content;
};


module.exports = { askOpenAI };


  