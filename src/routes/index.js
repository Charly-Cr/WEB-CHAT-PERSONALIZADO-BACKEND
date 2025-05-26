const express = require('express');
const userRouter = require('./user.router');
const businessRouter = require('./business.router');
const serviceRouter = require('./service.router');
const openiaRouter = require('./openai.router');
const faqRouter = require('./faq.router');
const chatlogRouter = require('./chatlog.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/businesses', businessRouter);
router.use('/services', serviceRouter)
router.use('/openias', openiaRouter)
router.use('/faqs', faqRouter)
router.use('/chatlogs', chatlogRouter);


module.exports = router;
