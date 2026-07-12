import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button.jsx';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={36} className="text-danger" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-black text-slate-200 mb-2">404</h1>

        {/* Message */}
        <h2 className="text-xl font-bold text-slate-700 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action */}
        <Button
          leftIcon={<Home size={16} />}
          onClick={() => navigate('/')}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
