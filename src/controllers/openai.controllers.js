// controllers/openai.controllers.js
const { business, service, user } = require("../models");
const { askOpenAI } = require("../services/openai.services");
const { createAgentPrompt } = require("../../prompts/agentPrompt");
const { matchFAQ } = require("../utils/faqMatcher");

const handleAIMessage = async (req, res) => {
  try {
    const { businessId, message: userPrompt } = req.body;
    const { tokenWarning } = req; // ya no usamos businessData directo

    // 🔹 Asegurar que siempre traemos el negocio actualizado de DB
    const businessData = await business.findByPk(businessId);
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    const ownerUser = await user.findByPk(businessData.userId);
    const servicesData = await service.findAll({
      where: { businessId, isActive: true },
    });

    // 🔹 Primero buscamos en FAQs
    const faqResponse = await matchFAQ(userPrompt, businessId);
    if (faqResponse) {
      return res.json({
        response: faqResponse,
        source: "faq",
        tokenWarning: tokenWarning || null
      });
    }

    // 🔹 Creamos prompt y pedimos a OpenAI
    const systemPrompt = createAgentPrompt(ownerUser, businessData, servicesData, userPrompt);
    const aiResponse = await askOpenAI(systemPrompt, userPrompt);

    // 🔹 Calculamos y acumulamos tokens
    const tokensUsedNow = aiResponse.usage?.total_tokens || 0;
    const currentTokens = businessData.tokensUsed ?? 0;
    const updatedTokens = currentTokens + tokensUsedNow;

    await businessData.update({ tokensUsed: updatedTokens });

    res.json({
      response: aiResponse.text,
      tokensUsedNow,
      totalTokensUsed: updatedTokens,
      tokenWarning: tokenWarning || null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno al generar respuesta" });
  }
};

module.exports = { handleAIMessage };
