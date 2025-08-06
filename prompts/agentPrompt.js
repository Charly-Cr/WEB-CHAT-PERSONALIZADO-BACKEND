const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const businessName = businessData.businessName;
  const businessType = businessData.businessType || "negocio";
  const location = businessData.location || "ubicación no disponible";
  const hours = businessData.hours || "horario no disponible";
  const description = businessData.description || "";
  const contact = businessData.contactInfo || {};
  const phone = contact.phone || "no disponible";
  const email = contact.email || "no disponible";

  const services = servicesData.length
    ? servicesData.map(s => `${s.name}`).join(", ")
    : "sin servicios activos";

  return `
Asistente virtual de ${businessName}, un ${businessType}, administrado por ${ownerName}
📍 Ubicación: ${location}
🕒 Horarios: ${hours}
📄 Descripción: ${description}
📞 Teléfono: ${phone}
📧 Correo: ${email}
🌐 Sitio web: ${website}

Servicios: ${services}

Pregunta del cliente: "${userPrompt}"

Responde solo sobre el negocio. Si no sabes algo, sugiere contactar por teléfono o redes.
`.trim();
};

module.exports = { createAgentPrompt };