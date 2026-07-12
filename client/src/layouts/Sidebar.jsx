import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Package,
  ArrowLeftRight,
  CalendarClock,
  Wrench,
  ClipboardList,
  BarChart3,
  Bell,
  Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/',                  label: 'Dashboard',          icon: LayoutDashboard },
  { to: '/org-setup',         label: 'Organization Setup', icon: Building2        },
  { to: '/assets',            label: 'Assets',             icon: Package          },
  { to: '/allocation',        label: 'Allocation & Transfer', icon: ArrowLeftRight },
  { to: '/booking',           label: 'Resource Booking',   icon: CalendarClock    },
  { to: '/maintenance',       label: 'Maintenance',        icon: Wrench           },
  { to: '/audit',             label: 'Audit',              icon: ClipboardList    },
  { to: '/reports',           label: 'Reports',            icon: BarChart3        },
  { to: '/notifications',     label: 'Notifications',      icon: Bell             },
];

function Sidebar({ collapsed = false }) {
  return (
    <aside
      className={`
        flex flex-col bg-sidebar h-screen fixed left-0 top-0 z-30
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-lg tracking-tight">AssetFlow</span>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">AssetFlow v1.0</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
