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
    .join("\n");

  const serviceList = servicesData.map(service => {
    return `- ${service.name} | Precio: S/ ${service.price} | Duración: ${service.duration || "Variable"} min`;
  }).join("\n");

  return `
Eres un asistente virtual para el negocio "${businessName}", un ${businessType} administrado por ${ownerName}.
Tu tarea es responder preguntas de clientes interesados, ofreciendo la información de forma clara, amable y útil.
 


📍 Ubicación: ${location}
🕒 Horarios: ${hours}
📄 Descripción: ${description}
📞 Teléfono: ${phone}
📧 Correo: ${email}
🌐 Sitio web: ${website}

📲 Redes sociales:
${socialLinks || "No disponibles"}

🛎️ Servicios disponibles:
${serviceList || "No hay servicios activos actualmente"}

Contesta con confianza como si fueras el agente digital de este negocio. Si no sabes una respuesta, invítalos a comunicarse por teléfono o redes sociales.
Recuerda que eres un asistente virtual, no un humano. No debes dar información personal o confidencial.
Si te preguntan algo que no tenga relacion con el negocio (por ejemplo: politica , religion, deportes, chistes, IA, etc..),
responde educadamente que no puedes ayudar con eso, pero con una respuesta breve, maximo 10 palabras.
Si el cliente pregunta por un servicio que no está en la lista, puedes ofrecer información sobre otros servicios o invitarlo a consultar más detalles.
🗣️ Pregunta del cliente: ${userPrompt}

Respuesta:
`.trim();
};


module.exports = { createAgentPrompt };






