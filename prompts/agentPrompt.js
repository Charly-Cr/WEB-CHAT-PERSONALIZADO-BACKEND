const createAgentPrompt = (userData, businessData, servicesData, userPrompt) => {
  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const {
    businessName,
    businessType = "negocio",
    location = "Ubicación no especificada",
    hours = "Horario no disponible",
    description = "",
    website = "",
    contactInfo = {},
    socialLinks = {}
  } = businessData;

  const { phone = "No disponible", email = "No disponible" } = contactInfo;

  const social = Object.entries(socialLinks)
    .filter(([_, value]) => value)
    .map(([platform, link]) => `${platform}: ${link}`)
    .join(" | ") || "No disponibles";

  const serviceList = servicesData.length
    ? servicesData.map(s => `- ${s.name} (S/ ${s.price}, ${s.duration || "Variable"} min)`).join("\n")
    : "No hay servicios activos actualmente.";

  return `
Negocio: ${businessName} (${businessType})
Administrador: ${ownerName}
Ubicación: ${location}
Horario: ${hours}
Descripción: ${description}
Teléfono: ${phone}
Correo: ${email}
Sitio web: ${website}
Redes: ${social}

Servicios:
${serviceList}

Pregunta del cliente: "${userPrompt}"

Responde como asistente del negocio. Si no sabes algo, sugiere contactar por teléfono o redes. Solo responde preguntas relacionadas con el negocio o sus servicios.
`.trim();
};

module.exports = { createAgentPrompt };