const { getAll, create, getOne, remove, update, showBySlug } = require('../controllers/business.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');
const verifyRoles = require('../utils/verifyRoles');

const businessRouter = express.Router();

businessRouter.route('/')
    .get(verifyJWT, verifyRoles('superadmin', 'admin'), getAll)
    .post(verifyJWT, verifyRoles('superadmin', 'admin'), create);

businessRouter.route('/slug/:slug')
    .get( verifyJWT, showBySlug );

businessRouter.route('/:id')
    .get(verifyJWT, verifyRoles('superadmin', 'admin'), getOne)
    .delete(verifyJWT, verifyRoles('superadmin', 'admin'), remove)
    .put(verifyJWT, verifyRoles('superadmin'), update);


    

module.exports = businessRouter;


