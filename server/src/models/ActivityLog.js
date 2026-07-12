import mongoose from 'mongoose'

const activityLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    actorName: { type: String, required: true },
    actorRole: { type: String, required: true },
    action: {
      type: String,
      required: true,
      // e.g. ASSET_REGISTERED, ALLOCATION_CREATED, BOOKING_CANCELLED
    },
    module: {
      type: String,
      required: true,
      enum: ['Auth', 'Assets', 'Allocations', 'Bookings', 'Maintenance', 'Audit', 'Organization', 'Reports'],
    },
    description: { type: String, required: true },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
)

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema)
export default ActivityLog
