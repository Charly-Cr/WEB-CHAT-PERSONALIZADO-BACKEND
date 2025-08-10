// Importamos los modelos necesarios de Sequelize
const { business, service, user } = require("../models");
// Servicio que envía mensajes a OpenAI (ahora con max_tokens dinámico)
const { askOpenAI } = require("../services/openai.services");
// Función que genera el "prompt" de sistema para el agente
const { createAgentPrompt } = require("../../prompts/agentPrompt");
// Utilidad para buscar coincidencias en las FAQs
const { matchFAQ } = require("../utils/faqMatcher");

const handleAIMessage = async (req, res) => {
  try {
    const { businessId, message: userPrompt } = req.body; // ID del negocio y mensaje del usuario
    const { tokenWarning, tokenLimit } = req; // Advertencia y límite de tokens (del middleware)

    // 📌 1. Obtener información actualizada del negocio desde la BD
    const businessData = await business.findByPk(businessId);
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    // 📌 2. Obtener el usuario dueño del negocio
    const ownerUser = await user.findByPk(businessData.userId);

    // 📌 3. Obtener servicios activos del negocio
    const servicesData = await service.findAll({
      where: { businessId, isActive: true },
    });

    // 📌 4. Buscar en FAQs para evitar gasto de tokens innecesario
    const faqResponse = await matchFAQ(userPrompt, businessId);
    if (faqResponse) {
      return res.json({
        response: faqResponse,     
        source: "faq",             
        tokenWarning: tokenWarning || null
      });
    }

    // 📌 5. Crear el prompt del sistema con datos del negocio
    const systemPrompt = createAgentPrompt(ownerUser, businessData, servicesData, userPrompt);

    // 📌 6. Calcular tokens restantes antes de llegar al límite
    const remainingTokens = tokenLimit - (businessData.tokensUsed ?? 0);

    // 📌 7. Enviar consulta a OpenAI con límite dinámico
    const aiResponse = await askOpenAI(systemPrompt, userPrompt, remainingTokens);

    // 📌 8. Calcular y acumular tokens usados
    const tokensUsedNow = aiResponse.usage?.total_tokens || 0;
    const updatedTokens = (businessData.tokensUsed ?? 0) + tokensUsedNow;
    await businessData.update({ tokensUsed: updatedTokens });

    // 📌 9. Responder al cliente con datos completos
    res.json({
      response: aiResponse.text,       
      tokensUsedNow,                   
      totalTokensUsed: updatedTokens,  
      tokenWarning: tokenWarning || null
    });

  } catch (err) {
    console.error(err);
    // 📌 10. Manejo de errores
    res.status(500).json({ error: "Error interno al generar respuesta" });
  }
};

module.exports = { handleAIMessage };
