const mongoose = require('mongoose');
const { BOOKING_STATUS, BOOKING_TYPE } = require('./constants/bookingStatus');

const { Schema } = mongoose;

// ─── Booking Schema ───────────────────────────────────────────────────────────
const bookingSchema = new Schema(
  {
    // ── Core References ──────────────────────────────────────────────────────
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',          // ⚠ Coordinate model name with Assets team
      required: [true, 'Asset is required'],
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',           // ⚠ Coordinate model name with team
      required: [true, 'Booked-by user is required'],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',     // ⚠ Coordinate model name with team
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // ── Booking Window ───────────────────────────────────────────────────────
    // Overlap detection is the responsibility of the service layer (requires DB lookup).
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },

    // ── Status & Type ────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: {
        values:  Object.values(BOOKING_STATUS),
        message: '{VALUE} is not a valid booking status',
      },
      default: BOOKING_STATUS.PENDING,
    },
    type: {
      type: String,
      enum: {
        values:  Object.values(BOOKING_TYPE),
        message: '{VALUE} is not a valid booking type',
      },
      required: [true, 'Booking type is required'],
    },

    // ── Meta ─────────────────────────────────────────────────────────────────
    title: {
      type: String,
      trim: true,
      required: [true, 'Booking title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    purpose: {
      type: String,
      trim: true,
      maxlength: [300, 'Purpose cannot exceed 300 characters'],
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [500, 'Remarks cannot exceed 500 characters'],
    },
    cancellationReason: {
      type: String,
      trim: true,
      maxlength: [300, 'Cancellation reason cannot exceed 300 characters'],
      default: null,
    },

    // ── Approval ─────────────────────────────────────────────────────────────
    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps:  true,
    versionKey:  false,    // suppress __v field
    collection: 'bookings',
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

// Core overlap detection query — "Is this asset booked during this window?"
// Service layer uses: { asset, startTime: { $lt: endTime }, endTime: { $gt: startTime } }
bookingSchema.index({ asset: 1, startTime: 1, endTime: 1 });

// Query: "Show all bookings by this user in this status"
bookingSchema.index({ bookedBy: 1, status: 1 });

// Query: "Show upcoming bookings (sorted by start time)"
bookingSchema.index({ startTime: 1, status: 1 });

// Query: "Show all bookings for a department"
bookingSchema.index({ department: 1, status: 1 });

// ─── Virtual: duration (minutes) ─────────────────────────────────────────────
bookingSchema.virtual('durationMinutes').get(function () {
  if (!this.startTime || !this.endTime) return null;
  return Math.round((this.endTime - this.startTime) / 60000);
});

// ─── Virtual: isActive ────────────────────────────────────────────────────────
bookingSchema.virtual('isActive').get(function () {
  return this.status === BOOKING_STATUS.CONFIRMED;
});

// ─── Model ────────────────────────────────────────────────────────────────────
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking, bookingSchema };
