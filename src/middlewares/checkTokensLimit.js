const { business } = require("../models");

const checkTokensLimit = async (req, res, next) => {
  try {
    const { businessId } = req.body;

    const businessData = await business.findByPk(businessId);
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    const tokenLimit = businessData.tokenLimit || 5000; // límite total
    const tokensUsed = businessData.tokensUsed || 0;

    if (tokensUsed >= tokenLimit) {
      return res.status(403).json({
        error: "Has alcanzado tu límite de tokens. Por favor, actualiza tu plan."
      });
    }

    // Aviso preventivo (ej. si queda menos del 10%)
    const remaining = tokenLimit - tokensUsed;
    const warningThreshold = tokenLimit * 0.1; // 10% del total

    req.tokenWarning = remaining <= warningThreshold
      ? `⚠️ Te quedan solo ${remaining} tokens de tu plan`
      : null;

    // Pasamos el negocio y la alerta al controlador
    req.businessData = businessData;
    next();
  } catch (err) {
    console.error("Error en checkTokensLimit:", err);
    res.status(500).json({ error: "Error validando límite de tokens" });
  }
};

module.exports = checkTokensLimit;
