const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const allocationRoutes = require('./routes/allocation.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AssetFlow API is running',
    data: { version: '1.0.0', env: process.env.NODE_ENV },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/allocations', allocationRoutes);
app.use('/api/bookings', bookingRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', errors: [] });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: 'Internal server error', errors: [] });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 AssetFlow server running on http://localhost:${PORT}`);
});

module.exports = app;
