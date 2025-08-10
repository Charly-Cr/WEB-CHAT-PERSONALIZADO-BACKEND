const { service, user } = require("../models");
const { askOpenAI } = require("../services/openai.services");
const { createAgentPrompt } = require("../../prompts/agentPrompt");
const { matchFAQ } = require("../utils/faqMatcher");

const handleAIMessage = async (req, res) => {
  try {
    const { message: userPrompt } = req.body;
    const businessData = req.businessData; // viene del middleware
    const ownerUser = await user.findByPk(businessData.userId);

    const servicesData = await service.findAll({
      where: {
        businessId: businessData.id,
        isActive: true,
      },
    });

    // 1. FAQ primero
    const faqResponse = await matchFAQ(userPrompt, businessData.id);
    if (faqResponse) {
      return res.json({
        response: faqResponse,
        source: "faq",
        tokenWarning: req.tokenWarning
      });
    }

    // 2. Prompt para OpenAI
    const systemPrompt = createAgentPrompt(ownerUser, businessData, servicesData, userPrompt);
    const { text, usage } = await askOpenAI(systemPrompt, userPrompt);

    // 3. Guardar uso de tokens
    if (usage) {
      const totalTokens = usage.total_tokens || 0;
      await businessData.update({
        tokensUsed: (businessData.tokensUsed || 0) + totalTokens
      });
    }

    res.json({
      response: text,
      tokensUsedNow: usage?.total_tokens || 0,
      tokenWarning: req.tokenWarning
    });
  } catch (err) {
    console.error("Error en handleAIMessage:", err);
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
