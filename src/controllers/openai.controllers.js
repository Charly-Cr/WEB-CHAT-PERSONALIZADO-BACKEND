// controllers/openai.controllers.js
const { service, user } = require("../models");
const { askOpenAI } = require("../services/openai.services");
const { createAgentPrompt } = require("../../prompts/agentPrompt");
const { matchFAQ } = require("../utils/faqMatcher");

const handleAIMessage = async (req, res) => {
  try {
    const { businessId, message: userPrompt } = req.body;
    const { businessData, tokenWarning } = req;

    const ownerUser = await user.findByPk(businessData.userId);
    const servicesData = await service.findAll({
      where: { businessId, isActive: true },
    });

    // Buscar en FAQs
    const faqResponse = await matchFAQ(userPrompt, businessId);
    if (faqResponse) {
      return res.json({ response: faqResponse, source: "faq", tokenWarning: tokenWarning || null });
    }

    // Crear prompt y preguntar a OpenAI
    const systemPrompt = createAgentPrompt(ownerUser, businessData, servicesData, userPrompt);
    const aiResponse = await askOpenAI(systemPrompt, userPrompt);

    // Actualizar tokens usados en DB
    const tokensUsedNow = aiResponse.usage?.total_tokens || 0;
    await businessData.update({
      tokensUsed: (businessData.tokensUsed || 0) + tokensUsedNow
    });

    res.json({
      response: aiResponse.text,
      tokensUsedNow,
      totalTokensUsed: businessData.tokensUsed + tokensUsedNow,
      tokenWarning: tokenWarning || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno al generar respuesta" });
  }
};

module.exports = { handleAIMessage };




// const { business, service, user } = require("../models");
// const { askOpenAI } = require("../services/openai.services");
// const { createAgentPrompt } = require("../../prompts/agentPrompt");
// const { matchFAQ } = require("../utils/faqMatcher");


// const handleAIMessage = async (req, res) => {
//   try {
//     const { businessId, message: userPrompt } = req.body;

//     const businessData = await business.findByPk(businessId);
//     if (!businessData) {
//       return res.status(404).json({ error: "Negocio no encontrado" });
//     }

//     const ownerUser = await user.findByPk(businessData.userId);
//     const servicesData = await service.findAll({
//       where: {
//         businessId: businessData.id,
//         isActive: true,
//       },
//     });

//     // ⬇️ Primero intentamos buscar respuesta en las FAQs
//     const faqResponse = await matchFAQ(userPrompt, businessId);
//     if (faqResponse) {
//       return res.json({ response: faqResponse, source: "faq" });
//     }

//     // Si no hay buena coincidencia, usamos OpenAI
//     const systemPrompt = createAgentPrompt(ownerUser, businessData, servicesData, userPrompt);
    
    
//     // 4. Enviar a OpenAI
//     const aiResponse = await askOpenAI(systemPrompt, userPrompt);

//     res.json({ response: aiResponse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error interno al generar respuesta" });
//   }
// };

// module.exports = { handleAIMessage };

    



// ! CONTROLADOR PARA  UN USUARIO LOGEADO 

// const { user, business, service } = require("../models");
// const { askOpenAI } = require("../services/openai.services");
// const { createAgentPrompt } = require("../../prompts/agentPrompt");

// const handleAIMessage = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userData = await user.findByPk(userId);
//     const businessData = await business.findOne({ where: { userId } });

//     if (!businessData) return res.status(404).json({ error: "Negocio no encontrado" });

//     const servicesData = await service.findAll({
//       where: { businessId: businessData.id, isActive: true }
//     });

//     const systemPrompt = createAgentPrompt(userData, businessData, servicesData);  //systemPrompt lo arma tu backend.
//     const userPrompt = req.body.message;   //userPrompt viene del cliente

//     const response = await askOpenAI(systemPrompt, userPrompt);

//     res.json({ response });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error interno al generar respuesta de IA" });
//   }
// };

// module.exports = { handleAIMessage };
