/**
 * Booking Service
 * Business logic stubs — implementation will be added in Task 2
 */

/**
 * Get all bookings with optional filters
 * @param {Object} query - filters: status, resourceId, userId, date
 */
const getBookings = async (query = {}) => {
  // TODO: Implement MongoDB query with date range and status filters
  return [];
};

/**
 * Get a single booking by ID
 * @param {string} id - Booking ObjectId
 */
const getBookingById = async (id) => {
  // TODO: Implement findById with populated references
  return null;
};

/**
 * Create a new booking
 * @param {Object} payload - { resourceId, userId, startDate, endDate, purpose, notes }
 */
const createBooking = async (payload) => {
  // TODO: Check resource availability conflicts, create booking record, send notification
  return {};
};

/**
 * Update an existing booking
 * @param {string} id - Booking ObjectId
 * @param {Object} payload - Updated fields
 */
const updateBooking = async (id, payload) => {
  // TODO: Re-validate availability after date changes, update record
  return {};
};

/**
 * Cancel a booking
 * @param {string} id - Booking ObjectId
 */
const cancelBooking = async (id) => {
  // TODO: Update status to 'cancelled', free up the resource slot
  return null;
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
};
