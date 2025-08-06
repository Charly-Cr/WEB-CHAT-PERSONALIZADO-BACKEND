const createAgentPrompt = (businessData, servicesData, userPrompt) => {
  const {
    businessName,
    businessType = "negocio",
    location = "no especificada",
    hours = "no disponibles",
    contactInfo = {},
    website = "no disponible",
    socialLinks = {}
  } = businessData;

  const { phone = "no disponible", email = "no disponible" } = contactInfo;

  const socials = Object.entries(socialLinks)
    .filter(([_, link]) => !!link)
    .map(([platform, link]) => `${platform}: ${link}`)
    .join(" | ") || "no disponibles";

  const services = servicesData.length
    ? servicesData.map(s => `${s.name} (S/ ${s.price}, ${s.duration || "duración variable"} min)`).join(" | ")
    : "Sin servicios activos.";

  return `
Asistente virtual de ${businessName}, un ${businessType}.
📍 ${location} | 🕒 ${hours}
📞 ${phone} | 📧 ${email} | 🌐 ${website}
📲 Redes: ${socials}
🛎️ Servicios: ${services}

Pregunta del cliente: "${userPrompt}"

Responde brevemente y solo sobre el negocio. Si no sabes algo, sugiere contactar por teléfono o redes.
`.trim();
};


module.exports = { createAgentPrompt };