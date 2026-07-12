import mongoose from 'mongoose'

const auditCycleSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true, trim: true },
    scope:     { type: String, enum: ['department', 'location', 'all'], default: 'all' },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
    location:  { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate:   { type: Date, required: true },
    auditors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: ['open', 'in_progress', 'closed'],
      default: 'open',
    },
    auditItems: [
      {
        asset:    { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
        status:   { type: String, enum: ['pending', 'verified', 'missing', 'damaged'], default: 'pending' },
        notes:    { type: String, default: '' },
        auditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        auditedAt: { type: Date },
      },
    ],
    discrepancyReport: { type: String, default: '' },
    closedAt: { type: Date, default: null },
    closedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
)

const AuditCycle = mongoose.model('AuditCycle', auditCycleSchema)
export default AuditCycle
