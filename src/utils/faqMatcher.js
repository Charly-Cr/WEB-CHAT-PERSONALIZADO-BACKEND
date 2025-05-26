const { faq } = require("../models");
const stringSimilarity = require("string-similarity");

const matchFAQ = async (userMessage, businessId) => {
  const faqs = await faq.findAll({ where: { businessId } });

  if (!faqs.length) return null;

  let bestMatch = null;
  let highestScore = 0.6; // umbral mínimo de similitud

  for (const item of faqs) {
    let keywords = [];

    try {
      keywords = JSON.parse(item.keywords);
    } catch (err) {
      console.warn("Error al parsear keywords:", err);
      continue;
    }

    for (const keyword of keywords) {
      const similarity = stringSimilarity.compareTwoStrings(userMessage.toLowerCase(), keyword.toLowerCase());
      if (similarity > highestScore) {
        highestScore = similarity;
        bestMatch = item;
      }
    }
  }

  return bestMatch ? bestMatch.response : null;
};

module.exports = { matchFAQ };
