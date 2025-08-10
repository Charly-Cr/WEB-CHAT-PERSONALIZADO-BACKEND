const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {

  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const businessName = businessData.businessName;
  const businessType = businessData.businessType || "negocio";
  const location = businessData.location;
  const phone = businessData.contactInfo?.phone;
  
  const serviceList = servicesData.slice(0, 5).map(service => {
  return `- ${service.name} | Precio: S/ ${service.price} | Duración: ${service.duration || "Variable"} min`;
}).join("\n");

const moreServicesNote = servicesData.length > 5 ? "\n...y más servicios disponibles. Pregunta para más detalles." : "";

  return `
Asistente de "${businessName}", un ${businessType} de ${ownerName}.
Servicios disponibles:
${serviceList}${moreServicesNote}
Ubicación: ${location}. Contacto: ${phone}.
Responde en máximo 15 palabras y solo sobre el negocio.
Cliente: "${userPrompt}"

Respuesta:
`.trim();
};

module.exports = { createAgentPrompt };
