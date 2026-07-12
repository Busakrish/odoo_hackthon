import {
  Package,
  ArrowLeftRight,
  CalendarClock,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Card from '../../components/common/Card.jsx';
import LoadingSkeleton from '../../components/common/LoadingSkeleton.jsx';
import Badge from '../../components/common/Badge.jsx';

const STAT_CARDS = [
  { label: 'Total Assets',      value: '—', icon: Package,       variant: 'info',    delta: null },
  { label: 'Active Allocations',value: '—', icon: ArrowLeftRight,variant: 'success', delta: null },
  { label: 'Active Bookings',   value: '—', icon: CalendarClock, variant: 'warning', delta: null },
  { label: 'Open Maintenance',  value: '—', icon: Wrench,        variant: 'danger',  delta: null },
];

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of all asset operations across your organization."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map(({ label, value, icon: Icon, variant }) => (
          <Card key={label} hover>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">{label}</span>
              <div
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center
                  ${variant === 'info'    ? 'bg-primary/10 text-primary' : ''}
                  ${variant === 'success' ? 'bg-success/10 text-success' : ''}
                  ${variant === 'warning' ? 'bg-warning/10 text-warning' : ''}
                  ${variant === 'danger'  ? 'bg-danger/10  text-danger'  : ''}
                `}
              >
                <Icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-1">Live data coming soon</p>
          </Card>
        ))}
      </div>

      {/* ── Placeholder Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <Card.Header>
            <Card.Title>Recent Allocations</Card.Title>
            <Badge variant="info">Coming soon</Badge>
          </Card.Header>
          <LoadingSkeleton rows={4} type="table" />
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Upcoming Bookings</Card.Title>
            <Badge variant="warning">Coming soon</Badge>
          </Card.Header>
          <LoadingSkeleton rows={4} type="table" />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
