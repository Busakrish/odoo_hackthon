/**
 * Booking Controller
 * Placeholder methods — business logic will be added in Task 2
 */

const bookingService = require('../services/booking.service');

/**
 * GET /api/bookings
 * Retrieve all bookings
 */
const getBookings = async (req, res) => {
  try {
    const data = await bookingService.getBookings(req.query);
    return res.status(200).json({ success: true, message: 'Bookings fetched', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * GET /api/bookings/:id
 * Retrieve a single booking by ID
 */
const getBookingById = async (req, res) => {
  try {
    const data = await bookingService.getBookingById(req.params.id);
    return res.status(200).json({ success: true, message: 'Booking fetched', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * POST /api/bookings
 * Create a new booking
 */
const createBooking = async (req, res) => {
  try {
    const data = await bookingService.createBooking(req.body);
    return res.status(201).json({ success: true, message: 'Booking created successfully', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * PUT /api/bookings/:id
 * Update an existing booking
 */
const updateBooking = async (req, res) => {
  try {
    const data = await bookingService.updateBooking(req.params.id, req.body);
    return res.status(200).json({ success: true, message: 'Booking updated', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

/**
 * DELETE /api/bookings/:id
 * Cancel a booking
 */
const cancelBooking = async (req, res) => {
  try {
    const data = await bookingService.cancelBooking(req.params.id);
    return res.status(200).json({ success: true, message: 'Booking cancelled successfully', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, errors: [] });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
};
