import Notification from '../models/Notification.js'

// @desc  Get notifications for current user
// @route GET /api/notifications
export const getNotifications = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 20
    const skip  = (page - 1) * limit

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find({ recipient: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments({ recipient: req.user._id }),
      Notification.countDocuments({ recipient: req.user._id, isRead: false }),
    ])

    res.json({
      success: true,
      message: 'Notifications fetched',
      data: { notifications, total, unreadCount, page, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Mark single notification as read
// @route PUT /api/notifications/:id/read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true },
      { new: true }
    )
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' })
    res.json({ success: true, message: 'Marked as read', data: notification })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Mark all notifications as read
// @route PUT /api/notifications/read-all
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true })
    res.json({ success: true, message: 'All notifications marked as read', data: {} })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Delete a notification
// @route DELETE /api/notifications/:id
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    })
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' })
    res.json({ success: true, message: 'Notification deleted', data: {} })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
