/**
 * Allocation Controller
 * Placeholder methods — business logic will be added in Task 2
 */

const allocationService = require('../services/allocation.service');

/**
 * GET /api/allocations
 * Retrieve all allocations
 */
const getAllocations = async (req, res) => {
  try {
    const data = await allocationService.getAllocations();
    return res.status(200).json({ success: true, message: 'Allocations fetched', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * GET /api/allocations/:id
 * Retrieve a single allocation by ID
 */
const getAllocationById = async (req, res) => {
  try {
    const data = await allocationService.getAllocationById(req.params.id);
    return res.status(200).json({ success: true, message: 'Allocation fetched', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * POST /api/allocations
 * Allocate an asset to a user/department
 */
const allocateAsset = async (req, res) => {
  try {
    const data = await allocationService.allocateAsset(req.body);
    return res.status(201).json({ success: true, message: 'Asset allocated successfully', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * PUT /api/allocations/:id
 * Update an allocation record
 */
const updateAllocation = async (req, res) => {
  try {
    const data = await allocationService.updateAllocation(req.params.id, req.body);
    return res.status(200).json({ success: true, message: 'Allocation updated', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * POST /api/allocations/:id/return
 * Return an allocated asset
 */
const returnAsset = async (req, res) => {
  try {
    const data = await allocationService.returnAsset(req.params.id, req.body);
    return res.status(200).json({ success: true, message: 'Asset returned successfully', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * GET /api/allocations/history
 * Get full allocation history
 */
const getAllocationHistory = async (req, res) => {
  try {
    const data = await allocationService.getAllocationHistory(req.query);
    return res.status(200).json({ success: true, message: 'Allocation history fetched', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * DELETE /api/allocations/:id
 * Delete an allocation record
 */
const deleteAllocation = async (req, res) => {
  try {
    const data = await allocationService.deleteAllocation(req.params.id);
    return res.status(200).json({ success: true, message: 'Allocation deleted', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

module.exports = {
  getAllocations,
  getAllocationById,
  allocateAsset,
  updateAllocation,
  returnAsset,
  getAllocationHistory,
  deleteAllocation,
};
