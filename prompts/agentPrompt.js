const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
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
Eres un asistente virtual para el negocio "${businessName}", un ${businessType}.
Responde de forma breve (máx. 30 palabras) y solo sobre los servicios del negocio.
No hables de temas no relacionados. Si no sabes algo, sugiere contactar por teléfono.
Ubicación: ${location} | Horarios: ${hours}
Descripción: ${description}
Contacto: ${phone}, ${email}
Servicios: ${services}

Pregunta del cliente: "${userPrompt}"

Responde solo sobre el negocio. Si no sabes algo, sugiere contactar por teléfono o redes.
`.trim();
};

module.exports = { createAgentPrompt };