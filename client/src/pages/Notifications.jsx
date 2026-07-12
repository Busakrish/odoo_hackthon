import { useState, useEffect, useCallback } from 'react'
import {
  Bell, CheckCheck, Trash2, Package, Wrench, Calendar,
  ArrowLeftRight, AlertTriangle, ClipboardCheck, Info,
  Filter, Activity,
} from 'lucide-react'
import { notificationService } from '../services/notificationService.js'
import { useAuth } from '../hooks/useAuth.js'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import toast from 'react-hot-toast'
import { reportService } from '../services/reportService.js'
import api from '../services/api.js'

const NOTIF_ICONS = {
  ASSET_ASSIGNED:       { icon: Package,       color: 'text-blue-500',   bg: 'bg-blue-50'   },
  ASSET_RETURNED:       { icon: Package,       color: 'text-green-500',  bg: 'bg-green-50'  },
  MAINTENANCE_APPROVED: { icon: Wrench,        color: 'text-green-500',  bg: 'bg-green-50'  },
  MAINTENANCE_REJECTED: { icon: Wrench,        color: 'text-red-500',    bg: 'bg-red-50'    },
  BOOKING_CONFIRMED:    { icon: Calendar,      color: 'text-purple-500', bg: 'bg-purple-50' },
  BOOKING_CANCELLED:    { icon: Calendar,      color: 'text-red-500',    bg: 'bg-red-50'    },
  BOOKING_REMINDER:     { icon: Calendar,      color: 'text-yellow-500', bg: 'bg-yellow-50' },
  TRANSFER_APPROVED:    { icon: ArrowLeftRight,color: 'text-green-500',  bg: 'bg-green-50'  },
  TRANSFER_REQUESTED:   { icon: ArrowLeftRight,color: 'text-blue-500',   bg: 'bg-blue-50'   },
  OVERDUE_RETURN:       { icon: AlertTriangle, color: 'text-red-500',    bg: 'bg-red-50'    },
  AUDIT_DISCREPANCY:    { icon: ClipboardCheck,color: 'text-orange-500', bg: 'bg-orange-50' },
  GENERAL:              { icon: Info,          color: 'text-slate-500',  bg: 'bg-slate-100' },
}

const timeSince = (d) => {
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const MODULE_LABELS = [
  { value: '',             label: 'All Modules' },
  { value: 'Assets',       label: 'Assets' },
  { value: 'Allocations',  label: 'Allocations' },
  { value: 'Bookings',     label: 'Bookings' },
  { value: 'Maintenance',  label: 'Maintenance' },
  { value: 'Audit',        label: 'Audit' },
  { value: 'Organization', label: 'Organization' },
  { value: 'Auth',         label: 'Auth' },
]

export default function Notifications() {
  const { user }   = useAuth()
  const [notifs,   setNotifs]   = useState([])
  const [meta,     setMeta]     = useState({ total: 0, unreadCount: 0, pages: 1 })
  const [page,     setPage]     = useState(1)
  const [loading,  setLoading]  = useState(true)
  const [logs,     setLogs]     = useState([])
  const [logsPage, setLogsPage] = useState(1)
  const [logsMeta, setLogsMeta] = useState({ pages: 1, total: 0 })
  const [module,   setModule]   = useState('')
  const [logsLoading, setLogsLoading] = useState(false)
  const [tab, setTab] = useState('notifications') // 'notifications' | 'logs'

  const canViewLogs = ['admin', 'asset_manager'].includes(user?.role)

  const fetchNotifs = useCallback(async (p = 1) => {
    setLoading(true)
    try {
      const data = await notificationService.getAll(p)
      setNotifs(data.notifications)
      setMeta({ total: data.total, unreadCount: data.unreadCount, pages: data.pages })
    } catch {
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchLogs = useCallback(async (p = 1, mod = '') => {
    setLogsLoading(true)
    try {
      const res = await api.get(`/activity-logs?page=${p}&limit=20${mod ? `&module=${mod}` : ''}`)
      setLogs(res.data.data.logs)
      setLogsMeta({ pages: res.data.data.pages, total: res.data.data.total })
    } catch {
      toast.error('Failed to load activity logs')
    } finally {
      setLogsLoading(false)
    }
  }, [])

  useEffect(() => { fetchNotifs(page) }, [page, fetchNotifs])
  useEffect(() => {
    if (tab === 'logs' && canViewLogs) fetchLogs(logsPage, module)
  }, [tab, logsPage, module, canViewLogs, fetchLogs])

  const handleMarkRead = async (id) => {
    await notificationService.markRead(id)
    setNotifs((prev) => prev.map((n) => n._id === id ? { ...n, isRead: true } : n))
    setMeta((m) => ({ ...m, unreadCount: Math.max(0, m.unreadCount - 1) }))
  }

  const handleMarkAll = async () => {
    await notificationService.markAllRead()
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })))
    setMeta((m) => ({ ...m, unreadCount: 0 }))
    toast.success('All marked as read')
  }

  const handleDelete = async (id) => {
    await notificationService.delete(id)
    setNotifs((prev) => prev.filter((n) => n._id !== id))
    toast.success('Notification deleted')
  }

  const MODULE_COLORS = {
    Assets: 'bg-blue-100 text-blue-700', Allocations: 'bg-green-100 text-green-700',
    Bookings: 'bg-purple-100 text-purple-700', Maintenance: 'bg-yellow-100 text-yellow-700',
    Audit: 'bg-orange-100 text-orange-700', Organization: 'bg-slate-100 text-slate-600',
    Auth: 'bg-pink-100 text-pink-700', Reports: 'bg-teal-100 text-teal-700',
  }

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {meta.unreadCount > 0 ? `${meta.unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {meta.unreadCount > 0 && (
          <button
            onClick={handleMarkAll}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab('notifications')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            tab === 'notifications' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5" />
            Notifications
            {meta.unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">
                {meta.unreadCount}
              </span>
            )}
          </span>
        </button>
        {canViewLogs && (
          <button
            onClick={() => setTab('logs')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              tab === 'logs' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              Activity Logs
            </span>
          </button>
        )}
      </div>

      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <Card padding={false}>
          {loading ? (
            <Loader />
          ) : notifs.length === 0 ? (
            <EmptyState title="No notifications" description="You'll see alerts here for assets, bookings, maintenance and more." icon={Bell} />
          ) : (
            <>
              <div className="divide-y divide-slate-100">
                {notifs.map((notif) => {
                  const conf = NOTIF_ICONS[notif.type] || NOTIF_ICONS.GENERAL
                  const Icon = conf.icon
                  return (
                    <div
                      key={notif._id}
                      className={`flex items-start gap-4 px-5 py-4 transition-colors ${
                        !notif.isRead ? 'bg-primary-50/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-9 h-9 ${conf.bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${conf.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm ${!notif.isRead ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>
                            {notif.title}
                          </p>
                          {!notif.isRead && <span className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0 mt-1.5" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{timeSince(notif.createdAt)}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notif.isRead && (
                          <button
                            onClick={() => handleMarkRead(notif._id)}
                            title="Mark as read"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notif._id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Pagination page={page} pages={meta.pages} onPageChange={setPage} />
            </>
          )}
        </Card>
      )}

      {/* Activity Logs Tab */}
      {tab === 'logs' && canViewLogs && (
        <Card padding={false}>
          {/* Filter bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={module}
              onChange={(e) => { setModule(e.target.value); setLogsPage(1) }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {MODULE_LABELS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <span className="text-xs text-slate-400 ml-auto">{logsMeta.total} total logs</span>
          </div>

          {logsLoading ? (
            <Loader />
          ) : logs.length === 0 ? (
            <EmptyState title="No activity logs" description="System actions will be recorded here." icon={Activity} />
          ) : (
            <>
              <div className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <div key={log._id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold mt-0.5 flex-shrink-0 ${MODULE_COLORS[log.module] || 'bg-slate-100 text-slate-600'}`}>
                      {log.module}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700">{log.description}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <span className="font-medium text-slate-500">{log.actorName}</span>
                        {' '}·{' '}<span className="capitalize">{log.actorRole?.replace('_', ' ')}</span>
                        {' '}·{' '}{timeSince(log.createdAt)}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-300 whitespace-nowrap hidden sm:block mt-1">
                      {new Date(log.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
              <Pagination page={logsPage} pages={logsMeta.pages} onPageChange={setLogsPage} />
            </>
          )}
        </Card>
      )}
    </div>
  )
}
