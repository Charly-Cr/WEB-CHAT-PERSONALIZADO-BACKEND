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

  const services = servicesData.length
    ? servicesData.map(s => `${s.name}`).join(", ")
    : "sin servicios activos";

  return `
Eres el asistente virtual de ${businessName} ${businessType} administrado por ${ownerName}.
Ubicación: ${location}. Horario: ${hours}.
Descripción: ${description}
Contacto: ${phone}, ${email}. Web: ${website}.
Servicios: ${services.join(" | ")}

Pregunta del cliente: "${userPrompt}"

Responde con claridad y brevedad, solo con la info del negocio.
`.trim();
};

module.exports = { createAgentPrompt };