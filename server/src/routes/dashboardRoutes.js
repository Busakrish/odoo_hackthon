import express from 'express'
import { protect } from '../middleware/auth.js'
import { getKPIs, getOverdueAllocations, getRecentActivity } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/kpis',            protect, getKPIs)
router.get('/overdue',         protect, getOverdueAllocations)
router.get('/recent-activity', protect, getRecentActivity)

export default router
