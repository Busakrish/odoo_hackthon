// Utility helpers shared across the project

/**
 * Format date to readable string
 */
export const formatDate = (d, options = {}) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', ...options,
  })
}

/**
 * Human-readable time since a date
 */
export const timeSince = (d) => {
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(d)
}

/**
 * Capitalize first letter
 */
export const capitalize = (s) => s ? s[0].toUpperCase() + s.slice(1) : ''

/**
 * Format role string to label
 */
export const formatRole = (role) => {
  const map = {
    admin:           'Admin',
    asset_manager:   'Asset Manager',
    department_head: 'Department Head',
    employee:        'Employee',
  }
  return map[role] || capitalize(role)
}

/**
 * Check if a date is overdue
 */
export const isOverdue = (date) => date && new Date(date) < new Date()
