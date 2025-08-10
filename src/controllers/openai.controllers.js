// controllers/openai.controllers.js
const { business, service, user } = require("../models");
const { askOpenAI } = require("../services/openai.services");
const { createAgentPrompt } = require("../../prompts/agentPrompt");
const { matchFAQ } = require("../utils/faqMatcher");

const handleAIMessage = async (req, res) => {
  try {
    const { businessId, message: userPrompt } = req.body;
    const { tokenWarning } = req;

    // Traer datos frescos desde BD
    const businessData = await business.findByPk(businessId);
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    const ownerUser = await user.findByPk(businessData.userId);
    const servicesData = await service.findAll({
      where: { businessId, isActive: true },
    });

    // Buscar en FAQs
    const faqResponse = await matchFAQ(userPrompt, businessId);
    if (faqResponse) {
      return res.json({
        response: faqResponse,
        source: "faq",
        tokensUsedNow: 0,
        totalTokensUsed: businessData.tokensUsed ?? 0,
        tokenWarning: tokenWarning || null
      });
    }

    // Preguntar a OpenAI
    const systemPrompt = createAgentPrompt(ownerUser, businessData, servicesData, userPrompt);
    const aiResponse = await askOpenAI(systemPrompt, userPrompt);

    // Calcular tokens
    const tokensUsedNow = aiResponse.usage?.total_tokens || 0;
    const currentTokens = businessData.tokensUsed ?? 0;
    const updatedTokens = currentTokens + tokensUsedNow;

    // Guardar en BD
    businessData.tokensUsed = updatedTokens;
    await businessData.save(); // 👈 Esto asegura que se guarde

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
