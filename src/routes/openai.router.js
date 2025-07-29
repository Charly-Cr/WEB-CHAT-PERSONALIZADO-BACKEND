const { handleAIMessage } = require('../controllers/openai.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');
const verifyRoles = require('../utils/verifyRoles');
const validateBusinessAccess = require('../middlewares/multiTenantAuth');

const openiaRouter = express.Router();

openiaRouter.route('/')
    .post(verifyJWT, verifyRoles('superadmin', 'admin', 'employed'), validateBusinessAccess, handleAIMessage)

module.exports = openiaRouter;