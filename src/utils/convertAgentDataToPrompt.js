const convertAgentDataToPrompt = (data, userPrompt) => {
  const { business, rules } = data;
  const servicesList = business.services.slice(0, 5).map(s =>
    `${s.name} (S/ ${s.price}, ${s.duration} min)`
  ).join(" | ");

  const moreServicesNote = business.services.length > 5
    ? " | ...y más servicios disponibles."
    : "";

  return `
Asistente virtual de "${business.name}", un ${business.type} de ${business.owner}.
📍 ${business.location} | 🕒 ${business.hours}
📞 ${business.contact.phone} | 📧 ${business.contact.email} | 🌐 ${business.website}
🛎️ Servicios: ${servicesList}${moreServicesNote}

Responde solo sobre el negocio. Usa máximo ${rules.maxWords} palabras.
Si no puedes responder, di: "${rules.fallbackMessage}"

Pregunta del cliente: "${userPrompt}"
`.trim();
};

module.exports = { convertAgentDataToPrompt };
