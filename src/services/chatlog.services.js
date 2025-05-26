const { chatlog } = require('../models');

const createChatLog = async (data) => {
  // data = { userMessage, botResponse, matched, matchedFaqId, score, businessId }
  return await chatlog.create(data);
};

const getChatLogsByBusiness = async (businessId) => {
  return await chatlog.findAll({ where: { businessId } });
};

module.exports = {
  createChatLog,
  getChatLogsByBusiness,
};
