// Project-wide constants

export const ROLES = {
  ADMIN:          'admin',
  ASSET_MANAGER:  'asset_manager',
  DEPT_HEAD:      'department_head',
  EMPLOYEE:       'employee',
}

export const ASSET_STATUS = {
  AVAILABLE:         'available',
  ALLOCATED:         'allocated',
  RESERVED:          'reserved',
  UNDER_MAINTENANCE: 'under_maintenance',
  LOST:              'lost',
  RETIRED:           'retired',
  DISPOSED:          'disposed',
}

export const ASSET_STATUS_COLORS = {
  available:         'bg-green-100 text-green-700',
  allocated:         'bg-blue-100 text-blue-700',
  reserved:          'bg-purple-100 text-purple-700',
  under_maintenance: 'bg-yellow-100 text-yellow-700',
  lost:              'bg-red-100 text-red-700',
  retired:           'bg-slate-100 text-slate-600',
  disposed:          'bg-slate-100 text-slate-500',
}

export const NOTIFICATION_TYPES = {
  ASSET_ASSIGNED:        'ASSET_ASSIGNED',
  ASSET_RETURNED:        'ASSET_RETURNED',
  MAINTENANCE_APPROVED:  'MAINTENANCE_APPROVED',
  MAINTENANCE_REJECTED:  'MAINTENANCE_REJECTED',
  BOOKING_CONFIRMED:     'BOOKING_CONFIRMED',
  BOOKING_CANCELLED:     'BOOKING_CANCELLED',
  BOOKING_REMINDER:      'BOOKING_REMINDER',
  TRANSFER_APPROVED:     'TRANSFER_APPROVED',
  TRANSFER_REQUESTED:    'TRANSFER_REQUESTED',
  OVERDUE_RETURN:        'OVERDUE_RETURN',
  AUDIT_DISCREPANCY:     'AUDIT_DISCREPANCY',
  GENERAL:               'GENERAL',
}

export const PRIORITY_COLORS = {
  low:      'bg-slate-100 text-slate-600',
  medium:   'bg-blue-100 text-blue-700',
  high:     'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}
