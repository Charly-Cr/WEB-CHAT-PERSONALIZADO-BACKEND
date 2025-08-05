const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const businessName = businessData.businessName;
  const businessType = businessData.businessType || "negocio";
  const location = businessData.location || "ubicación no especificada";
  const hours = businessData.hours || "Horario no disponible";
  const description = businessData.description || "";
  const website = businessData.website || "";
  const contact = businessData.contactInfo || {};
  const phone = contact.phone || "No disponible";
  const email = contact.email || "No disponible";

  const social = businessData.socialLinks || {};
  const socialLinks = Object.entries(social)
    .filter(([_, value]) => value && value !== "")
    .map(([platform, link]) => `${platform}: ${link}`)
    .join(" | ") || "No disponibles";

  // const serviceList = servicesData.map(service => {
  //   return `- ${service.name} | Precio: S/ ${service.price} | Duración: ${service.duration || "Variable"} min`;
  // }).join("\n");

  const serviceList = servicesData.length
    ? servicesData.map(service => `• ${service.name} - S/ ${service.price} - ${service.duration || "duración variable"} min`).join(" | ")
    : "No hay servicios disponibles.";

//   return `
// Eres un asistente virtual para el negocio "${businessName}", un ${businessType} administrado por ${ownerName}.
// Tu tarea es responder preguntas de clientes interesados, ofreciendo la información de forma clara, amable y útil.

return `
Eres el asistente virtual de "${businessName}", un ${businessType} administrado por ${ownerName}. 
Responde dudas de forma breve, clara y útil.
 


📍 Ubicación: ${location}
🕒 Horarios: ${hours}
📄 Descripción: ${description}
📞 Teléfono: ${phone}
📧 Correo: ${email}
🌐 Sitio web: ${website}


📲 Redes: ${socialLinks}
🛎️ Servicios: ${serviceList}

👉 Si no sabes la respuesta o no es del negocio, responde: "No puedo ayudarte con eso" (máx. 10 palabras).

🗣️ Pregunta del cliente: ${userPrompt}

Respuesta:
`.trim();
};


module.exports = { createAgentPrompt };






