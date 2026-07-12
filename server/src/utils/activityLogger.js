import ActivityLog from '../models/ActivityLog.js'

/**
 * Log an activity — call this from ANY controller after a significant action.
 *
 * @param {Object} user    - req.user (must have _id, name, role)
 * @param {string} action  - e.g. 'ASSET_REGISTERED'
 * @param {string} module  - e.g. 'Assets'
 * @param {string} description - Human-readable description
 * @param {Object} metadata   - Optional extra data
 */
export const logActivity = async (user, action, module, description, metadata = {}) => {
  try {
    await ActivityLog.create({
      actor:       user._id,
      actorName:   user.name,
      actorRole:   user.role,
      action,
      module,
      description,
      metadata,
    })
  } catch (err) {
    // Never let logging failure break the main flow
    console.error('Activity log error:', err.message)
  }
}
