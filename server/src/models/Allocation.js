const mongoose = require('mongoose');
const { ALLOCATION_STATUS, ALLOCATION_TYPE, RETURN_CONDITION } = require('./constants/allocationStatus');

const { Schema } = mongoose;

// ─── Sub-schema: Return Details ───────────────────────────────────────────────
// Embedded on the allocation when an asset is returned.
const returnDetailsSchema = new Schema(
  {
    returnedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',         // ⚠ Coordinate model name with team
    },
    returnDate: {
      type: Date,
      default: Date.now,   // function reference — evaluated at insert time
    },
    condition: {
      type: String,
      enum: Object.values(RETURN_CONDITION),
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [500, 'Remarks cannot exceed 500 characters'],
    },
  },
  { _id: false }           // No separate _id for embedded sub-document
);

// ─── Allocation Schema ────────────────────────────────────────────────────────
const allocationSchema = new Schema(
  {
    // ── Core References ─────────────────────────────────────────────────────
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',        // ⚠ Coordinate model name with Assets team
      required: [true, 'Asset is required'],
      index: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',         // ⚠ Coordinate model name with team
      required: [true, 'Assigned user is required'],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',   // ⚠ Coordinate model name with team
    },
    allocatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Allocated-by user is required'],
    },

    // ── Transfer Chain ───────────────────────────────────────────────────────
    // Self-reference: reconstructs full transfer history without duplication.
    previousAllocation: {
      type: Schema.Types.ObjectId,
      ref: 'Allocation',
      default: null,
    },

    // ── Status & Type ────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: {
        values:  Object.values(ALLOCATION_STATUS),
        message: '{VALUE} is not a valid allocation status',
      },
      default: ALLOCATION_STATUS.ACTIVE,
      index: true,
    },
    type: {
      type: String,
      enum: {
        values:  Object.values(ALLOCATION_TYPE),
        message: '{VALUE} is not a valid allocation type',
      },
      default: ALLOCATION_TYPE.PERMANENT,
    },

    // ── Dates ────────────────────────────────────────────────────────────────
    allocationDate: {
      type: Date,
      default: Date.now,   // function reference (not Date.now())
      required: [true, 'Allocation date is required'],
    },
    expectedReturnDate: {
      type: Date,
      default: null,
    },

    // ── Meta ─────────────────────────────────────────────────────────────────
    title: {
      type: String,
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [500, 'Remarks cannot exceed 500 characters'],
    },

    // ── Return Details (populated on asset return) ───────────────────────────
    returnDetails: {
      type: returnDetailsSchema,
      default: null,
    },
  },
  {
    timestamps:  true,
    versionKey:  false,    // suppress __v field
    collection: 'allocations',
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

// Query: "Show all allocations for this asset in this status"
allocationSchema.index({ asset: 1, status: 1 });

// Query: "Show all assets allocated to this employee" — suggested by reviewer
allocationSchema.index({ assignedTo: 1, status: 1 });

// Query: "Show allocation history for a department"
allocationSchema.index({ department: 1, status: 1 });

// Query: sort / filter by allocation date
allocationSchema.index({ allocationDate: -1 });

// ─── Virtual: isActive ────────────────────────────────────────────────────────
allocationSchema.virtual('isActive').get(function () {
  return this.status === ALLOCATION_STATUS.ACTIVE;
});

// ─── Model ────────────────────────────────────────────────────────────────────
const Allocation = mongoose.model('Allocation', allocationSchema);

module.exports = { Allocation, allocationSchema };
