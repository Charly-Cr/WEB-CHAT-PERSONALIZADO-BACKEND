const { getPlans, createPlan, getPlan, deletePlan, updatePlan } = require('../controllers/plan.controllers');
const express = require('express');

const planRouter = express.Router();

planRouter.route('/')
    .get(getPlans)
    .post(createPlan);

planRouter.route('/:id')
    .get(getPlan)
    .delete(deletePlan)
    .put(updatePlan);

module.exports = planRouter;

