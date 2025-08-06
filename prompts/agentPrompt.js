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
Eres un asistente virtual de "${businessName}", un ${businessType}.
Servicios disponibles:
${serviceList || "No hay servicios activos actualmente"}
Ubicación: ${location} | Horarios: ${hours}
Descripción: ${description}
Contacto: Tel: ${phone} | Email: ${email}
Sitio web: ${website}

Redes sociales:
${socialLinks || "No disponibles"}

Responde solo sobre los servicios del negocio en máximo 30 palabras.
Si no sabes algo, sugiere contactar por teléfono.

🗣️ Cliente: "${userPrompt}"
Respuesta:
`.trim();
};

module.exports = { createAgentPrompt };
