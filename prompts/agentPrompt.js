const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
  const businessName = businessData.businessName;
  const businessType = businessData.businessType || "negocio";
  const location = businessData.location || "ubicación no disponible";
  const hours = businessData.hours || "horario no disponible";
  const contact = businessData.contactInfo || {};
  const phone = contact.phone || "no disponible";
  const email = contact.email || "no disponible";


  const serviceList = servicesData.map(service => {
    return `- ${service.name} | Precio: S/ ${service.price} | Duración: ${service.duration || "Variable"} min`;
  }).join("\n");


  return `
Eres un asistente virtual de "${businessName}", un ${businessType}.
Servicios disponibles:
${serviceList || "No hay servicios activos actualmente"}
Ubicación: ${location} | Horarios: ${hours}
Contacto: Tel: ${phone} | Email: ${email}

Responde solo sobre los servicios del negocio en máximo 30 palabras.
Si no sabes algo, sugiere contactar por teléfono.

🗣️ Cliente: "${userPrompt}"
Respuesta:
`.trim();
};

module.exports = { createAgentPrompt };
