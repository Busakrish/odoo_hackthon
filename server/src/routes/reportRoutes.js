import express from 'express'
import { protect, authorize } from '../middleware/auth.js'
import {
  getAssetUtilization,
  getMaintenanceFrequency,
  getDepartmentAllocation,
  getBookingHeatmap,
  getRetirementDue,
} from '../controllers/reportController.js'

const router = express.Router()

// Admin and Asset Manager can view reports
router.get('/asset-utilization',    protect, authorize('admin', 'asset_manager'), getAssetUtilization)
router.get('/maintenance-frequency',protect, authorize('admin', 'asset_manager'), getMaintenanceFrequency)
router.get('/department-allocation',protect, authorize('admin', 'asset_manager', 'department_head'), getDepartmentAllocation)
router.get('/booking-heatmap',      protect, authorize('admin', 'asset_manager'), getBookingHeatmap)
router.get('/retirement-due',       protect, authorize('admin', 'asset_manager'), getRetirementDue)

export default router
