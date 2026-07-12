import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import { errorHandler } from './src/middleware/errorHandler.js'

// Route imports
import authRoutes         from './src/routes/authRoutes.js'
import dashboardRoutes    from './src/routes/dashboardRoutes.js'
import notificationRoutes from './src/routes/notificationRoutes.js'
import reportRoutes       from './src/routes/reportRoutes.js'
import activityLogRoutes  from './src/routes/activityLogRoutes.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/auth',          authRoutes)
app.use('/api/dashboard',     dashboardRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/reports',       reportRoutes)
app.use('/api/activity-logs', activityLogRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AssetFlow API is running 🚀' })
})

// Error handler (must be last)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`✅ AssetFlow server running on http://localhost:${PORT}`)
})
