const { handleAIMessage } = require('../controllers/openai.controllers');
const express = require('express');

const openiaRouter = express.Router();

openiaRouter.route('/')
    .post(handleAIMessage)

module.exports = openiaRouter;