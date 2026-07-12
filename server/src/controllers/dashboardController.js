import Asset      from '../models/Asset.js'
import Allocation  from '../models/Allocation.js'
import Booking     from '../models/Booking.js'
import Maintenance from '../models/Maintenance.js'
import ActivityLog from '../models/ActivityLog.js'

// @desc  Get all KPI counts for dashboard
// @route GET /api/dashboard/kpis
export const getKPIs = async (req, res) => {
  try {
    const [
      assetsAvailable,
      assetsAllocated,
      maintenanceToday,
      activeBookings,
      pendingTransfers,
      upcomingReturns,
      overdueReturns,
    ] = await Promise.all([
      Asset.countDocuments({ status: 'available' }),
      Asset.countDocuments({ status: 'allocated' }),
      Maintenance.countDocuments({
        status: { $in: ['approved', 'technician_assigned', 'in_progress'] },
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      }),
      Booking.countDocuments({ status: { $in: ['upcoming', 'ongoing'] } }),
      Allocation.countDocuments({ 'transferRequest.status': 'pending' }),
      Allocation.countDocuments({
        status: 'active',
        expectedReturnDate: {
          $gte: new Date(),
          $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      }),
      Allocation.countDocuments({
        status: 'active',
        expectedReturnDate: { $lt: new Date() },
      }),
    ])

    res.json({
      success: true,
      message: 'KPIs fetched',
      data: {
        assetsAvailable,
        assetsAllocated,
        maintenanceToday,
        activeBookings,
        pendingTransfers,
        upcomingReturns,
        overdueReturns,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Get overdue allocations
// @route GET /api/dashboard/overdue
export const getOverdueAllocations = async (req, res) => {
  try {
    const overdue = await Allocation.find({
      status: 'active',
      expectedReturnDate: { $lt: new Date() },
    })
      .populate('asset', 'name assetTag')
      .populate('allocatedTo', 'name email')
      .populate('department', 'name')
      .sort({ expectedReturnDate: 1 })
      .limit(20)

    res.json({ success: true, message: 'Overdue allocations fetched', data: overdue })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Get recent activity logs
// @route GET /api/dashboard/recent-activity
export const getRecentActivity = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(10)

    res.json({ success: true, message: 'Recent activity fetched', data: logs })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
