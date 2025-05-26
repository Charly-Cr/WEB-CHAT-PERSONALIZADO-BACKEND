const { getAll, create, getOne, remove, update } = require('../controllers/faq.controllers');
const express = require('express');

const faqRouter = express.Router();

faqRouter.route('/business/:businessId')
    .get(getAll)

faqRouter.route('/')
    .post(create)
    

faqRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = faqRouter;