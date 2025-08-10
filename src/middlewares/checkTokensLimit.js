// middlewares/checkTokenLimit.js
const { business } = require("../models");

const checkTokensLimit = async (req, res, next) => {
  try {
    const { businessId } = req.body;

    // Traer siempre datos frescos de la BD
    const businessData = await business.findByPk(businessId);
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    // Configuración de límites según plan
    const planLimits = {
      basic: 500,
      premium: 2000,
      gold: 5000
    };

    const planType = businessData.planType || "basic";
    const tokenLimit = planLimits[planType] || 500;

    const tokensUsed = businessData.tokensUsed ?? 0;

    // Bloquear si se superó el límite
    if (tokensUsed >= tokenLimit) {
      return res.status(403).json({
        error: `Has alcanzado tu límite de ${tokenLimit} tokens para el plan ${planType}`,
        tokensUsed,
        tokenLimit
      });
    }

    // Avisar si queda poco margen
    if (tokenLimit - tokensUsed <= 50) {
      req.tokenWarning = {
        message: "⚠️ Estás cerca de tu límite de tokens",
        tokensUsed,
        tokenLimit
      };
    }

    // Guardar datos actualizados para uso en el controlador
    req.businessData = businessData;
    req.tokenLimit = tokenLimit;

    next();
  } catch (err) {
    console.error("Error en checkTokenLimit:", err);
    res.status(500).json({ error: "Error interno al verificar límite de tokens" });
  }
};

module.exports = checkTokensLimit;
