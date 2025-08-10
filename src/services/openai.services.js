const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Clave de API desde .env
});

/**
 * askOpenAI
 * Función que consulta a OpenAI con un límite de tokens dinámico
 *
 * @param {string} businessPrompt - Prompt de sistema (contexto del negocio)
 * @param {string} userPrompt - Pregunta que hace el cliente
 * @param {number} remainingTokens - Tokens que quedan antes de llegar al límite
 * @returns {object} Objeto con el texto generado y el uso de tokens
 */
const askOpenAI = async (businessPrompt, userPrompt, remainingTokens = 100) => {
  
  // 📌 Construimos el contexto de la conversación
  const messages = [
    { role: "system", content: businessPrompt }, // Instrucciones y datos del negocio
    { role: "user", content: userPrompt },       // Pregunta del cliente
  ];

  /**
   * 📌 Definimos max_tokens de forma dinámica:
   * - Si quedan pocos tokens disponibles en el plan, usamos ese número.
   * - Si hay margen, no pedimos más de 200 para evitar respuestas excesivamente largas.
   * - Siempre aseguramos un mínimo de 30 para que no devuelva respuestas vacías.
   */
  const maxTokens = Math.max(Math.min(remainingTokens, 200), 30);

  // 📌 Llamada a la API de OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Modelo usado
    messages,               // Conversación
    temperature: 0,         // 0 = respuesta más predecible y directa
    max_tokens: maxTokens,  // Límite dinámico calculado
  });

  // 📌 Retornamos texto y estadísticas de uso
  return {
    text: response.choices[0].message.content, // Texto generado
    usage: response.usage                      // Tokens usados
  };
};

module.exports = { askOpenAI };
