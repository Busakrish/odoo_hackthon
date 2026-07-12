const express = require('express');
const router = express.Router();
const {
  getAllocations,
  getAllocationById,
  allocateAsset,
  updateAllocation,
  returnAsset,
  getAllocationHistory,
  deleteAllocation,
} = require('../controllers/allocation.controller');

// ─── Placeholder notice (remove when implementing) ────────────────────────────
const placeholder = (label) => (req, res, next) => {
  // Forward to actual controller; stub message only returned if controller is empty
  next();
};

// ─── Routes ──────────────────────────────────────────────────────────────────
// GET    /api/allocations/history  — must be before /:id
router.get('/history', getAllocationHistory);

// GET    /api/allocations
router.get('/', getAllocations);

// GET    /api/allocations/:id
router.get('/:id', getAllocationById);

// POST   /api/allocations
router.post('/', allocateAsset);

// PUT    /api/allocations/:id
router.put('/:id', updateAllocation);

// POST   /api/allocations/:id/return
router.post('/:id/return', returnAsset);

// DELETE /api/allocations/:id
router.delete('/:id', deleteAllocation);

module.exports = router;
