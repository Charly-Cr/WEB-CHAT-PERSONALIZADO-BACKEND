const catchError = require("../utils/catchError");
const {
  getAllServices,
  createService,
  getOneService,
  updateService,
  deleteService,
} = require("../services/service.services");

// GET ALL SERVICES del usuario autenticado
const getAll = catchError(async (req, res) => {
  // ! Desestructuración con renombramiento id: userId
  const { id: userId } = req.user; // Extraes el userId del JWT
  const result = await getAllServices(userId);  // Lo pasas a tu servicio
  return res.json(result);  // Devuelves los resultados filtrados por el userId
});


// CREATE SERVICE (solo para negocios del usuario)
const create = catchError(async (req, res) => {
  const { id: userId } = req.user;   //desestructuración con renombramiento
  const serviceData = { ...req.body, userId }; // Agregas el userId tú mismo
  const result = await createService(serviceData);
  return res.status(201).json(result);
});


// GET ONE SERVICE (validación en el servicio)
const getOne = catchError(async (req, res) => {
  const { id: userId } = req.user;   //desestructuración con renombramiento
  const result = await getOneService(userId);
  return res.json(result);
});



// UPDATE SERVICE
const update = catchError(async (req, res) => {
  const { id: userId } = req.user;   //desestructuración con renombramiento
  const result = await updateService(req.body, userId);
  return res.json(result);
});

// DELETE SERVICE
const remove = catchError(async (req, res) => {
  const { id: userId } = req.user;   //desestructuración con renombramiento
  await deleteService(userId);
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
