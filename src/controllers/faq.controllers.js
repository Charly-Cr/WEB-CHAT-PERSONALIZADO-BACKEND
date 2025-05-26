const { getFaqsByBusiness, getFaqById, deleteFaq, createFaq, updateFaq } = require('../services/faq.services');
const catchError = require('../utils/catchError');

const getAll = catchError(async (req, res) => {
  const businessId = req.params.businessId;
  if (!businessId) {
    return res.status(400).json({ message: 'businessId es requerido' });
  }
  const results = await getFaqsByBusiness(businessId);
  res.json(results);
});


const create = catchError(async (req, res) => {
  const data = req.body;
  if (!Array.isArray(data.keywords)) {
    return res.status(400).json({ message: 'Keywords debe ser un array' });
  }
  const result = await createFaq(data);
  res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const id = req.params.id;
  const result = await getFaqById(id);
  if (!result) return res.status(404).json({ message: 'FAQ no encontrado' });
  res.json(result);
});

const update = catchError(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (data.keywords && !Array.isArray(data.keywords)) {
    return res.status(400).json({ message: 'Keywords debe ser un array' });
  }
  const result = await updateFaq(id, data);
  res.json(result);
});


const remove = catchError(async (req, res) => {
  const id = req.params.id;
  await deleteFaq(id);
  res.json({ message: 'FAQ eliminado correctamente' });
});

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
