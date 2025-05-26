const { getAll, create, getByBusiness, handleChat } = require('../controllers/chatlog.controllers');
const express = require('express');

const chatlogRouter = express.Router();

chatlogRouter.route('/chats' )
    .post(handleChat);

chatlogRouter.route('/')
    .get(getAll)
    .post(create);

chatlogRouter.route('/business/:businessId')
    .get(getByBusiness)
    

module.exports = chatlogRouter;