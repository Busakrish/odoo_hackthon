import { ASSET_STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants.js'

const STATUS_LABELS = {
  available:         'Available',
  allocated:         'Allocated',
  reserved:          'Reserved',
  under_maintenance: 'Under Maintenance',
  lost:              'Lost',
  retired:           'Retired',
  disposed:          'Disposed',
  active:            'Active',
  inactive:          'Inactive',
  pending:           'Pending',
  approved:          'Approved',
  rejected:          'Rejected',
  resolved:          'Resolved',
  in_progress:       'In Progress',
  upcoming:          'Upcoming',
  ongoing:           'Ongoing',
  completed:         'Completed',
  cancelled:         'Cancelled',
  open:              'Open',
  closed:            'Closed',
}

const STATUS_COLORS = {
  ...ASSET_STATUS_COLORS,
  active:      'bg-green-100 text-green-700',
  inactive:    'bg-slate-100 text-slate-500',
  pending:     'bg-yellow-100 text-yellow-700',
  approved:    'bg-green-100 text-green-700',
  rejected:    'bg-red-100 text-red-700',
  resolved:    'bg-green-100 text-green-700',
  in_progress: 'bg-blue-100 text-blue-700',
  upcoming:    'bg-purple-100 text-purple-700',
  ongoing:     'bg-blue-100 text-blue-700',
  completed:   'bg-green-100 text-green-700',
  cancelled:   'bg-red-100 text-red-700',
  open:        'bg-blue-100 text-blue-700',
  closed:      'bg-slate-100 text-slate-600',
}

export default function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || 'bg-slate-100 text-slate-600'
  const label      = STATUS_LABELS[status] || status

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {label}
    </span>
  )
}
