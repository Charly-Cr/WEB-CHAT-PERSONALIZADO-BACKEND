const createAgentData = (userData, businessData, servicesData) => {
  const ownerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const {
    businessName,
    businessType = "negocio",
    location = "ubicación no disponible",
    hours = "horario no disponible",
    description = "",
    website = "",
    contactInfo = {},
    socialLinks = {}
  } = businessData;

  const { phone = "no disponible", email = "no disponible" } = contactInfo;

  return {
    business: {
      name: businessName,
      owner: ownerName,
      type: businessType,
      location,
      hours,
      description,
      website,
      contact: { phone, email },
      social: socialLinks,
      services: servicesData.map(s => ({
        name: s.name,
        price: s.price,
        duration: s.duration || "variable"
      }))
    },
    rules: {
      respondOnlyAboutBusiness: true,
      maxWords: 30,
      fallbackMessage: "Lo siento, no puedo ayudarte con eso. Por favor, contáctanos por teléfono."
    }
  };
};

module.exports = { createAgentData };
