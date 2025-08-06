const createAgentPrompt = (businessData, servicesData) => {
  const {
    businessName,
    businessType,
    location,
    hours,
    contactInfo = {},
    website,
    socialLinks = {}
  } = businessData;

  const { phone, email } = contactInfo;

  const socials = Object.entries(socialLinks)
    .filter(([_, link]) => !!link)
    .map(([platform, link]) => `${platform}: ${link}`)
    .join(" | ");

  const services = servicesData.length
    ? servicesData.map(s => `${s.name} (S/ ${s.price}, ${s.duration || "duración variable"} min)`).join(" | ")
    : "Sin servicios activos.";

  return `
Eres el asistente virtual de ${businessName}, un ${businessType}.
Ubicado en ${location}. Horario: ${hours}.
Contacto: ${phone}, ${email}. Web: ${website}.
Redes: ${socials || "Ninguna"}.
Servicios: ${services}.
Responde solo sobre este negocio. Si no sabes algo, sugiere contactar por teléfono o redes.
`.trim();
};

module.exports = { createAgentPrompt };