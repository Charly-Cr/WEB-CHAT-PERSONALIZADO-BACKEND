const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const businessName = businessData.businessName;
  const businessType = businessData.businessType || "negocio";
  const location = businessData.location || "ubicación no disponible";
  const hours = businessData.hours || "horario no disponible";
  const description = businessData.description || "";
  const website = businessData.website || "";
  const contact = businessData.contactInfo || {};
  const phone = contact.phone || "no disponible";
  const email = contact.email || "no disponible";

  const social = businessData.socialLinks || {};
  const socialLinks = Object.entries(social)
    .filter(([_, value]) => value && value !== "")
    .map(([platform, link]) => `${platform}: ${link}`)
    .join("\n");


  const serviceList = servicesData.map(service => {
    return `- ${service.name} | Precio: S/ ${service.price} | Duración: ${service.duration || "Variable"} min`;
  }).join("\n");


  return `
Eres el asistente virtual de "${businessName}", un ${businessType} (dueño: ${ownerName}).
Servicios: ${serviceList || "Sin servicios activos"}
📍 ${location} | 🕒 ${hours}
📄 ${description}
📞 ${phone} | 📧 ${email} | 🌐 ${website}
🔗 Redes: ${socialLinks || "No disponibles"}

Responde en máximo 30 palabras solo sobre el negocio. Si no sabes algo, sugiere contactar.
Cliente: "${userPrompt}"

Respuesta:
`.trim();
};

module.exports = { createAgentPrompt };
