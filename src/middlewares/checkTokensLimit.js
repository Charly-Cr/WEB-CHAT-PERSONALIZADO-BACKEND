const { business } = require("../models");

const checkTokensLimit = async (req, res, next) => {
  try {
    const { businessId } = req.body;

    // 📌 1. Traemos el negocio desde la BD usando el ID recibido en la petición
    // `raw: true` devuelve un objeto plano en lugar de una instancia de Sequelize

    // Siempre obtener datos frescos de la BD
    const businessData = await business.findByPk(businessId, { raw: true });
    // Si no existe el negocio, devolvemos un error 404 y detenemos la ejecución
    if (!businessData) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    // 📌 2. Definimos el límite de tokens según el plan contratado
    const planLimits = {
      basic: 500,   // Plan básico → 500 tokens
      premium: 2000, // Plan premium → 2000 tokens
      gold: 5000     // Plan gold → 5000 tokens
    };

    // Si el negocio no tiene planType registrado, asumimos "basic"
    const planType = businessData.planType || "basic";
    const tokenLimit = planLimits[planType] || 500;

    // 📌 3. Leemos cuántos tokens lleva usados (si es null o undefined, usamos 0)
    const tokensUsed = businessData.tokensUsed ?? 0;

    // 📌 4. Si ya alcanzó o superó el límite → Bloqueamos el acceso
    if (tokensUsed >= tokenLimit) {
      return res.status(403).json({
        error: `Has alcanzado tu límite de ${tokenLimit} tokens para el plan ${planType}`,
        tokensUsed,
        tokenLimit
      });
    }

    // 📌 5. Si le quedan 50 o menos tokens, enviamos una advertencia
    if (tokenLimit - tokensUsed <= 50) {
      req.tokenWarning = {
        message: "⚠️ Estás cerca de tu límite de tokens",
        tokensUsed,
        tokenLimit
      };
    }

    // 📌 6. Guardamos los datos del negocio y el límite en `req`
    // para que el controlador los pueda usar después sin volver a consultar la BD
    req.businessData = { ...businessData };
    req.tokenLimit = tokenLimit;

  
    // 📌 7. Continuamos con la siguiente función en la cadena de middlewares/controladores
    next();
  } catch (err) {
    console.error("Error en checkTokensLimit:", err);
    // Si ocurre un error interno, devolvemos un 500
    res.status(500).json({ error: "Error interno al verificar límite de tokens" });
  }
};

module.exports = checkTokensLimit;
