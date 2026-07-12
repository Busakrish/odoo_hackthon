import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Placeholder Pages
const Login = () => <div className="p-4 text-xl">Login Page</div>;
const Dashboard = () => <div className="p-4 text-xl">Dashboard Page</div>;
const Assets = () => <div className="p-4 text-xl">Assets Page</div>;
const Bookings = () => <div className="p-4 text-xl">Bookings Page</div>;
const Maintenance = () => <div className="p-4 text-xl">Maintenance Page</div>;
const Reports = () => <div className="p-4 text-xl">Reports Page</div>;
const OrganizationSetup = () => <div className="p-4 text-xl">Organization Setup Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/organization-setup" element={<OrganizationSetup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
