const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
} = require('../controllers/booking.controller');

// ─── Routes ──────────────────────────────────────────────────────────────────
// GET    /api/bookings
router.get('/', getBookings);

// GET    /api/bookings/:id
router.get('/:id', getBookingById);

// POST   /api/bookings
router.post('/', createBooking);

// PUT    /api/bookings/:id
router.put('/:id', updateBooking);

// DELETE /api/bookings/:id  (cancel)
router.delete('/:id', cancelBooking);

module.exports = router;
