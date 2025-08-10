const { business } = require("../models");

const checkTokensLimit = async (req, res, next) => {
  try {
    const { businessId } = req.body;

    const businessData = await business.findByPk(businessId);
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    // Límites por plan
    const planLimits = {
      basic: 500,
      premium: 2000,
      gold: 5000
    };

    const planType = businessData.planType || "basic";
    const tokenLimit = planLimits[planType] || 500;
    const tokensUsed = businessData.tokensUsed || 0;

    // 🚫 Bloquear si ya pasó el límite
    if (tokensUsed >= tokenLimit) {
      return res.status(403).json({
        error: `🚫 Has alcanzado tu límite de ${tokenLimit} tokens para el plan "${planType}".`,
        tokensUsed,
        tokenLimit
      });
    }

    // ⚠️ Avisar si está por encima del 80% del límite
    const usagePercentage = (tokensUsed / tokenLimit) * 100;
    if (usagePercentage >= 80) {
      req.tokenWarning = {
        message: `⚠️ Has usado el ${usagePercentage.toFixed(1)}% de tu límite de tokens.`,
        tokensUsed,
        tokenLimit
      };
    }

    // Guardamos info para los controladores
    req.businessData = businessData;
    req.tokenLimit = tokenLimit;

    next();
  } catch (err) {
    console.error("Error en checkTokenLimit:", err);
    res.status(500).json({ error: "Error interno al verificar límite de tokens" });
  }
};

module.exports = checkTokensLimit;
