import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts'
import { reportService } from '../services/reportService.js'
import { useAuth } from '../hooks/useAuth.js'
import Card from '../components/ui/Card.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import Loader from '../components/ui/Loader.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { BarChart3, Download, TrendingUp, Package, Wrench, Building2, Calendar, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#A855F7', '#06B6D4', '#F97316']

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

function SectionHeader({ icon: Icon, title, color = 'text-primary-600', bg = 'bg-primary-50' }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4`}>
      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
    </div>
  )
}

export default function Reports() {
  const { user }   = useAuth()
  const [data, setData] = useState({
    utilization: [],
    maintenance: [],
    allocation:  [],
    heatmap:     [],
    retirement:  [],
  })
  const [loading, setLoading] = useState(true)

  const allowed = ['admin', 'asset_manager', 'department_head'].includes(user?.role)

  useEffect(() => {
    if (!allowed) { setLoading(false); return }
    const fetchAll = async () => {
      try {
        const [u, m, a, h, r] = await Promise.all([
          reportService.getAssetUtilization(),
          reportService.getMaintenanceFrequency(),
          reportService.getDepartmentAllocation(),
          reportService.getBookingHeatmap(),
          reportService.getRetirementDue(),
        ])
        setData({ utilization: u, maintenance: m, allocation: a, heatmap: h, retirement: r })
      } catch {
        toast.error('Failed to load reports')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [allowed])

  const exportCSV = (rows, filename) => {
    if (!rows.length) return
    const keys = Object.keys(rows[0])
    const csv  = [keys.join(','), ...rows.map((r) => keys.map((k) => `"${r[k] ?? ''}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  if (!allowed) {
    return (
      <div className="flex items-center justify-center h-96">
        <EmptyState
          title="Access Restricted"
          description="Reports are available to Admin, Asset Manager, and Department Head roles only."
          icon={BarChart3}
        />
      </div>
    )
  }

  if (loading) return <Loader />

  // Prepare pie data for utilization
  const pieData = data.utilization.map((d) => ({ name: d._id, value: d.count }))

  // Prepare bar data for maintenance
  const maintData = data.maintenance.map((d) => ({ category: d._id, requests: d.count }))

  // Dept allocation bar
  const deptData = data.allocation.map((d) => ({ dept: d._id, assets: d.count }))

  // Heatmap — show peak hours (filter 8am-8pm)
  const heatData = data.heatmap
    .filter((h) => h.hour >= 8 && h.hour <= 20)
    .map((h) => ({ hour: `${h.hour}:00`, bookings: h.count }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Operational insights for your organization</p>
        </div>
      </div>

      {/* Row 1: Asset Utilization + Maintenance Frequency */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Asset Utilization Pie */}
        <Card>
          <SectionHeader icon={Package} title="Asset Utilization by Status" color="text-blue-600" bg="bg-blue-50" />
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [v + ' assets', n]} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No asset data" />
          )}
        </Card>

        {/* Maintenance Frequency Bar */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionHeader icon={Wrench} title="Maintenance Frequency by Category" color="text-yellow-600" bg="bg-yellow-50" />
            <button
              onClick={() => exportCSV(maintData, 'maintenance_frequency.csv')}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          {maintData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={maintData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="requests" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No maintenance data" />
          )}
        </Card>
      </div>

      {/* Row 2: Department Allocation + Booking Heatmap */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dept Allocation */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionHeader icon={Building2} title="Department-wise Allocation" color="text-green-600" bg="bg-green-50" />
            <button
              onClick={() => exportCSV(deptData, 'dept_allocation.csv')}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          {deptData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                <YAxis type="category" dataKey="dept" tick={{ fontSize: 11, fill: '#64748B' }} width={80} />
                <Tooltip />
                <Bar dataKey="assets" fill="#22C55E" radius={[0, 4, 4, 0]} name="Assets" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No allocation data" />
          )}
        </Card>

        {/* Booking Heatmap */}
        <Card>
          <SectionHeader icon={Calendar} title="Booking Heatmap (Peak Hours)" color="text-purple-600" bg="bg-purple-50" />
          {heatData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={heatData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#A855F7" strokeWidth={2} dot={{ r: 3, fill: '#A855F7' }} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No booking data" />
          )}
        </Card>
      </div>

      {/* Retirement Due Table */}
      <Card padding={false}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="text-sm font-semibold text-slate-700">Assets Due for Retirement</h2>
          </div>
          <button
            onClick={() => exportCSV(
              data.retirement.map((a) => ({
                name: a.name,
                assetTag: a.assetTag,
                condition: a.condition,
                status: a.status,
                acquisitionDate: formatDate(a.acquisitionDate),
              })),
              'retirement_due.csv'
            )}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        {data.retirement.length === 0 ? (
          <EmptyState title="No assets flagged for retirement" description="Assets older than 5 years or in poor condition will appear here." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['Asset', 'Tag', 'Condition', 'Status', 'Acquired', 'Category', 'Department'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.retirement.map((asset) => (
                  <tr key={asset._id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{asset.name}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{asset.assetTag}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        asset.condition === 'poor' ? 'bg-red-100 text-red-700' :
                        asset.condition === 'fair' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>{asset.condition}</span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={asset.status} /></td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(asset.acquisitionDate)}</td>
                    <td className="px-4 py-3 text-slate-500">{asset.category?.name || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{asset.department?.name || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
