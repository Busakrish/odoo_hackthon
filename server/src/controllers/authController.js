import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { logActivity } from '../utils/activityLogger.js'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

// @desc  Register new user (always employee role)
// @route POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    const user = await User.create({ name, email, password, role: 'employee' })

    await logActivity(user, 'USER_SIGNED_UP', 'Auth', `${user.name} signed up as employee`)

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token: generateToken(user._id),
        user:  { _id: user._id, name: user.name, email: user.email, role: user.role },
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Login
// @route POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, message: 'Account is inactive. Contact admin.' })
    }

    await logActivity(user, 'USER_LOGGED_IN', 'Auth', `${user.name} logged in`)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token: generateToken(user._id),
        user:  { _id: user._id, name: user.name, email: user.email, role: user.role, department: user.department },
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc  Get current logged-in user
// @route GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('department', 'name')
    res.json({ success: true, message: 'User fetched', data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
