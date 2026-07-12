import mongoose from 'mongoose'

const maintenanceSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    issueDescription: { type: String, required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    photo: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'technician_assigned', 'in_progress', 'resolved'],
      default: 'pending',
    },
    approvedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    technician:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    resolutionNotes: { type: String, default: '' },
    resolvedAt:   { type: Date, default: null },
    rejectionReason: { type: String, default: '' },
  },
  { timestamps: true }
)

const Maintenance = mongoose.model('Maintenance', maintenanceSchema)
export default Maintenance
