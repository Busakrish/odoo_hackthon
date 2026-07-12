import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.js'
import MainLayout from './layouts/DashboardLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Reports from './pages/Reports.jsx'
import Notifications from './pages/Notifications.jsx'
import Loader from './components/ui/Loader.jsx'

// Placeholder pages for other team members (they will replace these)
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
      <p className="text-slate-400 mt-2 text-sm">Module under development</p>
    </div>
  </div>
)

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loader fullScreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loader fullScreen />
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { loading } = useAuth()
  if (loading) return <Loader fullScreen />

  return (
    <Routes>
      {/* Public */}
      <Route path="/login"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected - Dashboard layout */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="reports"       element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />

        {/* Other members' modules - placeholders */}
        <Route path="organization"  element={<PlaceholderPage title="Organization Setup" />} />
        <Route path="assets"        element={<PlaceholderPage title="Asset Directory" />} />
        <Route path="allocations"   element={<PlaceholderPage title="Allocation & Transfer" />} />
        <Route path="bookings"      element={<PlaceholderPage title="Resource Booking" />} />
        <Route path="maintenance"   element={<PlaceholderPage title="Maintenance Management" />} />
        <Route path="audit"         element={<PlaceholderPage title="Asset Audit" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
