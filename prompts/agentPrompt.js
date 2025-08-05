const createAgentPrompt = (businessData, servicesData) => {
  const name = businessData.businessName;
  const type = businessData.businessType || "negocio";
  const location = businessData.location || "Ubicación no disponible";
  const hours = businessData.hours || "Horario no disponible";
  const phone = businessData.contactInfo?.phone || "No disponible";
  const email = businessData.contactInfo?.email || "No disponible";
  const website = businessData.website || "No disponible";
  const socialLinks = Object.entries(businessData.socialLinks || {})
    .filter(([_, link]) => !!link)
    .map(([platform, link]) => `${platform}: ${link}`)
    .join(" | ") || "No disponibles";

  const services = servicesData.length
    ? servicesData.map(s => `${s.name} - S/ ${s.price} - ${s.duration || "var"}min`).join(" | ")
    : "No hay servicios.";

  return `
Nombre: ${name}
Tipo: ${type}
Ubicación: ${location}
Horario: ${hours}
Teléfono: ${phone}
Correo: ${email}
Web: ${website}
Redes: ${socialLinks}
Servicios: ${services}
`.trim();
};

module.exports = { createAgentPrompt };

  






