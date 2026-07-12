import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// Pages
import Dashboard    from '../pages/Dashboard/index.jsx';
import Allocation   from '../pages/Allocation/index.jsx';
import Booking      from '../pages/Booking/index.jsx';
import NotFound     from '../pages/NotFound/index.jsx';

// Placeholder pages for other modules (implemented by other developers)
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
      <span className="text-primary text-xl">🚧</span>
    </div>
    <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
    <p className="text-sm text-slate-400 mt-1">This module is being built by another team member.</p>
  </div>
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Layout — all authenticated pages live inside */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          {/* ── Our Modules ── */}
          <Route path="allocation" element={<Allocation />} />
          <Route path="booking"    element={<Booking />} />

          {/* ── Other Modules (stub routes so sidebar links don't 404) ── */}
          <Route path="org-setup"     element={<ComingSoon title="Organization Setup" />} />
          <Route path="assets"        element={<ComingSoon title="Assets" />} />
          <Route path="maintenance"   element={<ComingSoon title="Maintenance" />} />
          <Route path="audit"         element={<ComingSoon title="Audit" />} />
          <Route path="reports"       element={<ComingSoon title="Reports" />} />
          <Route path="notifications" element={<ComingSoon title="Notifications" />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
