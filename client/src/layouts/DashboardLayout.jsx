import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Navbar  from '../components/layout/Navbar.jsx'
import { notificationService } from '../services/notificationService.js'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [unreadCount, setUnreadCount]   = useState(0)

  useEffect(() => {
    // Fetch unread notification count on load
    notificationService.getAll(1)
      .then((data) => setUnreadCount(data.unreadCount || 0))
      .catch(() => {})

    // Poll every 30 seconds
    const interval = setInterval(() => {
      notificationService.getAll(1)
        .then((data) => setUnreadCount(data.unreadCount || 0))
        .catch(() => {})
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          unreadCount={unreadCount}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
