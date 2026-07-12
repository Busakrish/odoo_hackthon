import mongoose from 'mongoose'

const allocationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
    allocatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expectedReturnDate: { type: Date, default: null },
    returnedAt: { type: Date, default: null },
    conditionOnReturn: { type: String, default: '' },
    returnNotes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['active', 'returned', 'overdue', 'transfer_requested'],
      default: 'active',
    },
    transferRequest: {
      requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      requestedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: { type: String },
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

const Allocation = mongoose.model('Allocation', allocationSchema)
export default Allocation
