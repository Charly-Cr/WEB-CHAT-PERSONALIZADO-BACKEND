const { faq } = require('../models');

const getFaqsByBusiness = async (businessId) => {
  const faqs = await faq.findAll({ where: { businessId } });
  // Parsear keywords a array en cada FAQ
  return faqs.map(f => ({
    ...f.toJSON(),
    keywords: JSON.parse(f.keywords || '[]'),
  }));
};

const createFaq = async (data) => {
  if (!Array.isArray(data.keywords)) {
    throw new Error('Keywords debe ser un array');
  }
  const faqData = {
    ...data,
    keywords: JSON.stringify(data.keywords),
  };
  return await faq.create(faqData);
};

const getFaqById = async (id) => {
  const faqItem = await faq.findByPk(id);
  if (!faqItem) return null;
  return {
    ...faqItem.toJSON(),
    keywords: JSON.parse(faqItem.keywords || '[]'),
  };
};

const updateFaq = async (id, data) => {
  const faqs = await faq.findByPk(id);
  if (!faqs) throw new Error('FAQ no encontrado');
  if (data.keywords && !Array.isArray(data.keywords)) {
    throw new Error('Keywords debe ser un array');
  }
  if (data.keywords) {
    data.keywords = JSON.stringify(data.keywords);
  }
  return await faqs.update(data);
};

const deleteFaq = async (id) => {
  const faqs = await faq.findByPk(id);
  if (!faqs) throw new Error('FAQ no encontrado');
  return await faqs.destroy();
};

const findFaqByKeywords = async (userMessage, businessId) => {
  // Simple matching keywords en array (puedes mejorarlo)
  const keywordsFromMessage = userMessage.toLowerCase().match(/\b\w+\b/g);
  if (!keywordsFromMessage || keywordsFromMessage.length === 0) return null;

  const faqs = await getFaqsByBusiness(businessId);

  const matchedFaqs = faqs.map(faq => {
    const matchedWords = faq.keywords.filter(kw => keywordsFromMessage.includes(kw.toLowerCase()));
    const score = matchedWords.length;
    return { faq, score };
  }).filter(f => f.score > 0);

  if (matchedFaqs.length === 0) return null;

  matchedFaqs.sort((a, b) => b.score - a.score);
  return matchedFaqs[0].faq;
};

module.exports = {
  getFaqsByBusiness,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  findFaqByKeywords,
};
