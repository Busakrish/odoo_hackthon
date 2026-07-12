/**
 * Booking Status Constants
 * Single source of truth — import these everywhere instead of raw strings.
 */
const BOOKING_STATUS = Object.freeze({
  PENDING:   'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
});

/**
 * Booking Type Constants
 */
const BOOKING_TYPE = Object.freeze({
  MEETING_ROOM: 'Meeting Room',
  VEHICLE:      'Vehicle',
  EQUIPMENT:    'Equipment',
  OTHER:        'Other',
});

module.exports = { BOOKING_STATUS, BOOKING_TYPE };
