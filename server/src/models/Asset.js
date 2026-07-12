import mongoose from 'mongoose'

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    assetTag: { type: String, unique: true }, // auto-generated AF-0001
    serialNumber: { type: String, default: '' },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'allocated', 'reserved', 'under_maintenance', 'lost', 'retired', 'disposed'],
      default: 'available',
    },
    condition: {
      type: String,
      enum: ['new', 'good', 'fair', 'poor'],
      default: 'good',
    },
    location: { type: String, default: '' },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
    acquisitionDate: { type: Date },
    acquisitionCost: { type: Number, default: 0 },
    isBookable: { type: Boolean, default: false }, // shared/bookable flag
    photo: { type: String, default: '' },
    documents: [{ type: String }],
    customFields: { type: Map, of: mongoose.Schema.Types.Mixed },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

// Auto-generate asset tag before save
assetSchema.pre('save', async function (next) {
  if (!this.assetTag) {
    const count = await mongoose.model('Asset').countDocuments()
    this.assetTag = `AF-${String(count + 1).padStart(4, '0')}`
  }
  next()
})

const Asset = mongoose.model('Asset', assetSchema)
export default Asset
