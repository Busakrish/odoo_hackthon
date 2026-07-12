import { Bell, Search, ChevronDown, Menu, User } from 'lucide-react';

function Navbar({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-20 shadow-sm">
      {/* ── Sidebar Toggle ── */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* ── Search ── */}
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search assets, allocations..."
          className="
            w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200
            rounded-lg placeholder-slate-400 text-slate-700
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-colors
          "
        />
      </div>

      {/* ── Right Actions ── */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-700 leading-tight">Admin User</p>
            <p className="text-xs text-slate-400 leading-tight">Administrator</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
