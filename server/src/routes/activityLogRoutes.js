import express from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { getActivityLogs } from '../controllers/activityLogController.js'

const router = express.Router()

router.get('/', protect, authorize('admin', 'asset_manager'), getActivityLogs)

export default router
