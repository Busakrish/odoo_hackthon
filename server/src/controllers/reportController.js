import Asset      from '../models/Asset.js'
import Allocation  from '../models/Allocation.js'
import Booking     from '../models/Booking.js'
import Maintenance from '../models/Maintenance.js'

// @desc  Asset utilization by status
// @route GET /api/reports/asset-utilization
export const getAssetUtilization = async (req, res) => {
  try {
    const utilization = await Asset.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    res.json({ success: true, message: 'Asset utilization fetched', data: utilization })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Maintenance frequency by category
// @route GET /api/reports/maintenance-frequency
export const getMaintenanceFrequency = async (req, res) => {
  try {
    const frequency = await Maintenance.aggregate([
      {
        $lookup: {
          from: 'assets',
          localField: 'asset',
          foreignField: '_id',
          as: 'assetInfo',
        },
      },
      { $unwind: '$assetInfo' },
      {
        $lookup: {
          from: 'categories',
          localField: 'assetInfo.category',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      { $unwind: '$categoryInfo' },
      {
        $group: {
          _id: '$categoryInfo.name',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])
    res.json({ success: true, message: 'Maintenance frequency fetched', data: frequency })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Department-wise allocation summary
// @route GET /api/reports/department-allocation
export const getDepartmentAllocation = async (req, res) => {
  try {
    const summary = await Allocation.aggregate([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'deptInfo',
        },
      },
      { $unwind: { path: '$deptInfo', preserveNullAndEmpty: true } },
      {
        $group: {
          _id: { $ifNull: ['$deptInfo.name', 'No Department'] },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])
    res.json({ success: true, message: 'Department allocation fetched', data: summary })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Booking heatmap (bookings per hour of day)
// @route GET /api/reports/booking-heatmap
export const getBookingHeatmap = async (req, res) => {
  try {
    const heatmap = await Booking.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: { $hour: '$startTime' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])
    // Fill all 24 hours
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: heatmap.find((h) => h._id === i)?.count || 0,
    }))
    res.json({ success: true, message: 'Booking heatmap fetched', data: hours })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Assets due for retirement (older than 5 years or poor condition)
// @route GET /api/reports/retirement-due
export const getRetirementDue = async (req, res) => {
  try {
    const fiveYearsAgo = new Date()
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5)

    const assets = await Asset.find({
      $or: [
        { acquisitionDate: { $lte: fiveYearsAgo } },
        { condition: 'poor' },
      ],
      status: { $nin: ['retired', 'disposed'] },
    })
      .populate('category', 'name')
      .populate('department', 'name')
      .select('name assetTag condition acquisitionDate status')
      .limit(50)

    res.json({ success: true, message: 'Retirement due fetched', data: assets })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
