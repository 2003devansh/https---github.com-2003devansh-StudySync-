const express = require('express');
const router = express.Router();
const {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/plan.controller');
const { verifyToken } = require('../middleware/authMiddleware');


router.use(verifyToken);


router.get('/', getPlans);


router.post('/', createPlan);


router.put('/:id', updatePlan);


router.delete('/:id', deletePlan);

module.exports = router;
