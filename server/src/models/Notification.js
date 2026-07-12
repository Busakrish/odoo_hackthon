import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'ASSET_ASSIGNED',
        'ASSET_RETURNED',
        'MAINTENANCE_APPROVED',
        'MAINTENANCE_REJECTED',
        'BOOKING_CONFIRMED',
        'BOOKING_CANCELLED',
        'BOOKING_REMINDER',
        'TRANSFER_APPROVED',
        'TRANSFER_REQUESTED',
        'OVERDUE_RETURN',
        'AUDIT_DISCREPANCY',
        'GENERAL',
      ],
      required: true,
    },
    title:   { type: String, required: true },
    message: { type: String, required: true },
    isRead:  { type: Boolean, default: false },
    relatedEntity: {
      entityType: { type: String, default: '' }, // 'Asset', 'Allocation', 'Booking', etc.
      entityId:   { type: mongoose.Schema.Types.ObjectId, default: null },
    },
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', notificationSchema)
export default Notification
