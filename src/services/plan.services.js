const { plan } = require("../models");

// Servicio para obtener todos los planes
const getAllPlans = async () => {
  return await plan.findAll();
};

// Servicio para obtener un plan por id
const getPlanById = async (id) => {
  return await plan.findByPk(id);
};

// Servicio para crear un nuevo plan
const createPlan = async (planData) => {
  return await plan.create(planData);
};

// Servicio para actualizar un plan
const updatePlan = async (id, updatedData) => {
  const planToUpdate = await plan.findByPk(id);
  if (!planToUpdate) throw new Error("Plan no encontrado");
  return await planToUpdate.update(updatedData);
};

// Servicio para eliminar un plan
const deletePlan = async (id) => {
  const planToDelete = await plan.findByPk(id);
  if (!planToDelete) throw new Error("Plan no encontrado");
  await planToDelete.destroy();
  return true;
};

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
};
