import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package, Users, Wrench, Calendar, ArrowLeftRight, Clock,
  AlertTriangle, Plus, TrendingUp, Activity,
} from 'lucide-react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { dashboardService } from '../services/dashboardService.js'
import { useAuth } from '../hooks/useAuth.js'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import toast from 'react-hot-toast'

const KPICard = ({ label, value, icon: Icon, color, bg, sub }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-start gap-4`}>
    <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value ?? '—'}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  </div>
)

const PIE_COLORS = ['#22C55E', '#2563EB', '#A855F7', '#F59E0B', '#EF4444', '#64748B', '#94A3B8']

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const timeSince = (d) => {
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const MODULE_COLORS = {
  Assets:       'bg-blue-100 text-blue-700',
  Allocations:  'bg-green-100 text-green-700',
  Bookings:     'bg-purple-100 text-purple-700',
  Maintenance:  'bg-yellow-100 text-yellow-700',
  Audit:        'bg-orange-100 text-orange-700',
  Organization: 'bg-slate-100 text-slate-600',
  Auth:         'bg-pink-100 text-pink-700',
  Reports:      'bg-teal-100 text-teal-700',
}

export default function Dashboard() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const [kpis,     setKpis]     = useState(null)
  const [overdue,  setOverdue]  = useState([])
  const [activity, setActivity] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [kpiData, overdueData, activityData] = await Promise.all([
          dashboardService.getKPIs(),
          dashboardService.getOverdue(),
          dashboardService.getRecentActivity(),
        ])
        setKpis(kpiData)
        setOverdue(overdueData)
        setActivity(activityData)
      } catch {
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) return <Loader />

  // Pie chart data from KPIs
  const pieData = kpis
    ? [
        { name: 'Available',   value: kpis.assetsAvailable },
        { name: 'Allocated',   value: kpis.assetsAllocated },
        { name: 'Maintenance', value: kpis.maintenanceToday },
        { name: 'Bookings',    value: kpis.activeBookings },
      ].filter((d) => d.value > 0)
    : []

  // Bar chart from overdue (grouped by department)
  const deptOverdue = overdue.reduce((acc, item) => {
    const dept = item.department?.name || 'No Dept'
    acc[dept] = (acc[dept] || 0) + 1
    return acc
  }, {})
  const barData = Object.entries(deptOverdue).map(([dept, count]) => ({ dept, count }))

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Welcome back, <span className="font-medium text-slate-700">{user?.name}</span> 👋
          </p>
        </div>
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/assets')}
            className="btn-primary hidden sm:flex"
          >
            <Plus className="w-4 h-4" /> Register Asset
          </button>
          <button
            onClick={() => navigate('/bookings')}
            className="btn-secondary hidden sm:flex"
          >
            <Calendar className="w-4 h-4" /> Book Resource
          </button>
          <button
            onClick={() => navigate('/maintenance')}
            className="btn-secondary hidden sm:flex"
          >
            <Wrench className="w-4 h-4" /> Raise Request
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Assets Available"    value={kpis?.assetsAvailable}  icon={Package}        color="text-green-600"  bg="bg-green-50"  />
        <KPICard label="Assets Allocated"    value={kpis?.assetsAllocated}  icon={Users}          color="text-blue-600"   bg="bg-blue-50"   />
        <KPICard label="Maintenance Today"   value={kpis?.maintenanceToday} icon={Wrench}         color="text-yellow-600" bg="bg-yellow-50" />
        <KPICard label="Active Bookings"     value={kpis?.activeBookings}   icon={Calendar}       color="text-purple-600" bg="bg-purple-50" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Pending Transfers"   value={kpis?.pendingTransfers} icon={ArrowLeftRight}  color="text-orange-600" bg="bg-orange-50" />
        <KPICard label="Upcoming Returns"    value={kpis?.upcomingReturns}  icon={Clock}           color="text-teal-600"   bg="bg-teal-50"  />
        <KPICard label="Overdue Returns"     value={kpis?.overdueReturns}   icon={AlertTriangle}   color="text-red-600"    bg="bg-red-50"
          sub={kpis?.overdueReturns > 0 ? 'Requires immediate action' : 'All on time ✓'} />
        <KPICard label="Total Monitored"     value={(kpis?.assetsAvailable || 0) + (kpis?.assetsAllocated || 0)}
          icon={TrendingUp} color="text-primary-600" bg="bg-primary-50" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Asset Distribution Pie */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Asset Distribution</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-400 text-sm">No asset data yet</div>
          )}
        </Card>

        {/* Overdue by Department Bar */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Overdue Returns by Department</h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="dept" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} name="Overdue" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">✓</div>
                <p>No overdue returns</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overdue Table */}
        {overdue.length > 0 && (
          <Card padding={false}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Overdue Returns
              </h2>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">
                {overdue.length} overdue
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {overdue.map((item) => (
                <div key={item._id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.asset?.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.asset?.assetTag} · {item.allocatedTo?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-red-500 font-medium">
                      Due: {formatDate(item.expectedReturnDate)}
                    </p>
                    <p className="text-xs text-slate-400">{item.department?.name || 'No dept'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Activity */}
        <Card padding={false}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-500" />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {activity.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-slate-400">
                No activity yet
              </div>
            ) : (
              activity.map((log) => (
                <div key={log._id} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold mt-0.5 ${MODULE_COLORS[log.module] || 'bg-slate-100 text-slate-600'}`}>
                    {log.module}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">{log.description}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{log.actorName} · {timeSince(log.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
