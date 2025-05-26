const catchError = require("../utils/catchError");
const {getAllBusinesses, createBusiness, getOneBusiness, putBusiness, removeBusiness, getBusinessBySlug
} = require("../services/business.services");

const getAll = catchError(async (req, res) => {
  const { id: userId } = req.user //desestructuración con renombramiento
  const results = await getAllBusinesses(userId);
  return res.json(results);
});

//Si un usuario crea un business, puedes extraer el userId del JWT y asignarlo como userId
// y no es necesario colocar en el postman el userId porque lo hace automaticamente.
const create = catchError(async (req, res) => {
  const { id: userId } = req.user;  //desestructuración con renombramiento
  const businessData = { ...req.body, userId };
  const result = await createBusiness(businessData);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id: userId } = req.user;   //desestructuración con renombramiento
  const result = await getOneBusiness(userId);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const showBySlug = catchError(async (req, res) => {
  const { slug } = req.params;
  const result = await getBusinessBySlug(slug);
  if (!result) return res.status(404).json({ message: "Negocio no encontrado" });
  return res.json(result);
});

const update = catchError(async (req, res) => {
  const { id: userId } = req.user;
  const result = await putBusiness(req.body, userId);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
   const { id: userId } = req.user;
  const result = await removeBusiness(userId, id);
  if (!result) return res.status(404).json({ message: "Negocio no encontrado o no autorizado" });
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  getOne,
  showBySlug,
  update,
  remove,
};
