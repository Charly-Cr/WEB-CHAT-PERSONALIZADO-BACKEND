const { getAll, create, getOne, remove, update } = require('../controllers/service.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');
const verifyRoles = require('../utils/verifyRoles');

const serviceRouter = express.Router();

serviceRouter.route('/')
  .get(verifyJWT, verifyRoles('superadmin', 'admin'), getAll)   // Solo admins pueden ver sus servicios
  .post(verifyJWT, verifyRoles('admin'), create);               // Solo admin puede crear servicios

serviceRouter.route('/:id')
  .get(verifyJWT, verifyRoles('superadmin', 'admin'), getOne)   // Admin y superadmin pueden ver
  .put(verifyJWT, verifyRoles('admin'), update)                 // Solo admin puede editar
  .delete(verifyJWT, verifyRoles('admin'), remove);             // Solo admin puede eliminar

module.exports = serviceRouter;