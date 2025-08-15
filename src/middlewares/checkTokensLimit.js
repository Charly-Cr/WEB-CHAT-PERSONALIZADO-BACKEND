// Importamos el modelo business y plan para obtener info del plan
const { business, plan } = require("../models");

const checkTokensLimit = async (req, res, next) => {
  try {
    const { businessId } = req.body;

    // 📌 1. Traemos el negocio con su plan asociado usando Sequelize include
    const businessData = await business.findByPk(businessId, {
      include: {
        model: plan,
        attributes: ["name", "tokenLimit", "price"] // campos que nos interesan del plan
      },
      raw: false, // mantenemos la instancia para poder usar .get()
    });

    // Si no existe el negocio, devolvemos error 404
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    // 📌 2. Obtenemos el plan del negocio (incluido en la consulta)
    // Si no tiene plan asociado, asumimos plan básico con 500 tokens
    const planData = businessData.plan || { name: "basic", tokenLimit: 500 };

    const tokenLimit = planData.tokenLimit;

    // 📌 3. Tokens usados hasta ahora (si es null o undefined, lo asumimos 0)
    const tokensUsed = businessData.tokensUsed ?? 0;

    // 📌 4. Bloquear acceso si alcanzó o superó el límite
    if (tokensUsed >= tokenLimit) {
      return res.status(403).json({
        error: `Has alcanzado tu límite de ${tokenLimit} tokens para el plan ${planData.name}`,
        tokensUsed,
        tokenLimit,
      });
    }

    // 📌 5. Advertencia si quedan 50 tokens o menos
    if (tokenLimit - tokensUsed <= 50) {
      req.tokenWarning = {
        message: "⚠️ Estás cerca de tu límite de tokens",
        tokensUsed,
        tokenLimit,
      };
    }

    // 📌 6. Guardamos datos para usar luego en el controlador
    req.businessData = businessData;
    req.tokenLimit = tokenLimit;

    // 📌 7. Continuamos con siguiente middleware/controlador
    next();

  } catch (err) {
    console.error("Error en checkTokensLimit:", err);
    res.status(500).json({ error: "Error interno al verificar límite de tokens" });
  }
};

module.exports = checkTokensLimit;
