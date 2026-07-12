export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default:  'bg-slate-100 text-slate-600',
    primary:  'bg-primary-100 text-primary-700',
    success:  'bg-green-100 text-green-700',
    warning:  'bg-yellow-100 text-yellow-700',
    danger:   'bg-red-100 text-red-700',
    purple:   'bg-purple-100 text-purple-700',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  )
}
