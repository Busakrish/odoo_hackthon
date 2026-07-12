import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Package,
  ArrowLeftRight,
  Calendar,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  Zap,
  X,
} from 'lucide-react'

const navItems = [
  { to: '/',              label: 'Dashboard',          icon: LayoutDashboard },
  { to: '/organization',  label: 'Organization Setup', icon: Building2 },
  { to: '/assets',        label: 'Assets',             icon: Package },
  { to: '/allocations',   label: 'Allocation & Transfer', icon: ArrowLeftRight },
  { to: '/bookings',      label: 'Resource Booking',   icon: Calendar },
  { to: '/maintenance',   label: 'Maintenance',        icon: Wrench },
  { to: '/audit',         label: 'Audit',              icon: ClipboardCheck },
  { to: '/reports',       label: 'Reports',            icon: BarChart3 },
  { to: '/notifications', label: 'Notifications',      icon: Bell },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40 flex flex-col transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-800">AssetFlow</span>
              <p className="text-[10px] text-slate-400 leading-none">Enterprise ERP</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 text-center">AssetFlow v1.0 · Hackathon 2024</p>
        </div>
      </aside>
    </>
  )
}
