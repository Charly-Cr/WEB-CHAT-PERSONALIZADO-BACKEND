const planService = require("../services/plan.services");

const getPlans = async (req, res) => {
  try {
    const plans = await planService.getAllPlans();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPlan = async (req, res) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPlan = async (req, res) => {
  try {
    const newPlan = await planService.createPlan(req.body);
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await planService.updatePlan(req.params.id, req.body);
    res.json(updatedPlan);
  } catch (err) {
    if (err.message === "Plan no encontrado") return res.status(404).json({ error: err.message });
    res.status(400).json({ error: err.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    await planService.deletePlan(req.params.id);
    res.json({ message: "Plan eliminado correctamente" });
  } catch (err) {
    if (err.message === "Plan no encontrado") return res.status(404).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
};
