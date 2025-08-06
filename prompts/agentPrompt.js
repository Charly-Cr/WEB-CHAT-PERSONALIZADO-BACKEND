const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
  // const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  // const businessName = businessData.businessName;
  // const businessType = businessData.businessType || "negocio";
  // const location = businessData.location || "ubicación no disponible";
  // const hours = businessData.hours || "horario no disponible";
  // const description = businessData.description || "";
  // const website = businessData.website || "";
  // const contact = businessData.contactInfo || {};
  // const phone = contact.phone || "no disponible";
  // const email = contact.email || "no disponible";

  // const social = businessData.socialLinks || {};
  // const socialLinks = Object.entries(social)
  //   .filter(([_, value]) => value && value !== "")
  //   .map(([platform, link]) => `${platform}: ${link}`)
  //   .join("\n");


  // const serviceList = servicesData.map(service => {
  //   return `- ${service.name} | Precio: S/ ${service.price} | Duración: ${service.duration || "Variable"} min`;
  // }).join("\n");

  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const businessName = businessData.businessName;
  const businessType = businessData.businessType || "negocio";
  const location = businessData.location;
  const phone = businessData.contactInfo?.phone;
  const services = servicesData.slice(0, 3).map(s => s.name).join(", ") || "Sin servicios";


  return `
Asistente de "${businessName}", un ${businessType} de ${ownerName}.
Servicios: ${services}.
Ubicación: ${location}. Contacto: ${phone}.
Responde en máximo 30 palabras y solo sobre el negocio.
Cliente: "${userPrompt}"

Respuesta:
`.trim();
};

module.exports = { createAgentPrompt };
