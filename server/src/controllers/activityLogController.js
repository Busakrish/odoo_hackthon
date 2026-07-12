import ActivityLog from '../models/ActivityLog.js'

// @desc  Get all activity logs (admin/manager only)
// @route GET /api/activity-logs
export const getActivityLogs = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)   || 1
    const limit  = parseInt(req.query.limit)  || 30
    const skip   = (page - 1) * limit
    const module = req.query.module || null

    const filter = module ? { module } : {}

    const [logs, total] = await Promise.all([
      ActivityLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ActivityLog.countDocuments(filter),
    ])

    res.json({
      success: true,
      message: 'Activity logs fetched',
      data: { logs, total, page, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
