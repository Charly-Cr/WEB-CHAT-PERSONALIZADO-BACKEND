const { findFaqByKeywords } = require('../services/faq.services');
const { askOpenAI } = require('../services/openai.services');
const { createChatLog } = require('../services/chatlog.services');
const { business, user } = require('../models');
const catchError = require('../utils/catchError');

const handleChat = catchError(async (req, res) => {
  const { businessId, message: userMessage } = req.body;

  const businessData = await business.findByPk(businessId);
  if (!businessData) return res.status(404).json({ error: 'Negocio no encontrado' });

  // Buscar FAQ con keywords
  const matchedFaq = await findFaqByKeywords(userMessage, businessId);

  let botResponse = '';
  let matched = false;
  let matchedFaqId = null;
  let score = 0;

  if (matchedFaq) {
    matched = true;
    matchedFaqId = matchedFaq.faq.id;
    score = matchedFaq.score;
    botResponse = matchedFaq.faq.response;
  } else {
    // Si no hay FAQ, llama OpenAI
    const ownerUser = await user.findByPk(businessData.userId);
    const systemPrompt = `Eres un asistente para el negocio ${businessData.name}`;
    botResponse = await askOpenAI(systemPrompt, userMessage);
  }

  // Guardar chatlog
  const chatlog = await createChatLog({
    userMessage,
    botResponse,
    matched,
    matchedFaqId,
    score,
    businessId,
  });

  res.json({ chatlog });
});

// Los otros controladores los dejas igual
const getAll = catchError(async (req, res) => {
  const chatlogs = await getChatLogsByBusiness();
  return res.json(chatlogs);
});

const getByBusiness = catchError(async (req, res) => {
  const { businessId } = req.params;
  const chatlogs = await getChatLogsByBusiness({ where: { businessId } });
  return res.json(chatlogs);
});

const create = catchError(async (req, res) => {
  const { userMessage, botResponse, matched, matchedFaqId, score, businessId } = req.body;
  const chatlog = await createChatLog({
    userMessage,
    botResponse,
    matched,
    matchedFaqId,
    score,
    businessId,
  });
  return res.status(201).json(chatlog);
});

module.exports = {
  getAll,
  getByBusiness,
  create,
  handleChat,
};
