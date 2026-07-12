import { Plus, CalendarClock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Badge from '../../components/common/Badge.jsx';

const FEATURE_CARDS = [
  {
    title: 'Calendar View',
    description: 'Visualize all resource bookings on an interactive monthly calendar.',
    badge: { label: 'Pending', variant: 'warning' },
  },
  {
    title: 'Resource Reservation',
    description: 'Book meeting rooms, vehicles, and equipment with conflict detection.',
    badge: { label: 'Pending', variant: 'warning' },
  },
  {
    title: 'Approval Workflow',
    description: 'Manager approval flow for high-value resource bookings.',
    badge: { label: 'Pending', variant: 'warning' },
  },
  {
    title: 'Booking History',
    description: 'Complete log of all past and upcoming resource reservations.',
    badge: { label: 'Pending', variant: 'warning' },
  },
];

function BookingPage() {
  return (
    <div>
      <PageHeader
        title="Resource Booking"
        description="Reserve shared resources — rooms, vehicles, and equipment — with calendar-based scheduling."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Resource Booking' }]}
        actions={
          <Button
            leftIcon={<Plus size={16} />}
            disabled
            title="Available in Task 2"
          >
            New Booking
          </Button>
        }
      />

      {/* ── Feature Overview Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {FEATURE_CARDS.map(({ title, description, badge }) => (
          <Card key={title} hover className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <CalendarClock size={18} className="text-warning" />
              </div>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Calendar Placeholder ── */}
      <Card>
        <Card.Header>
          <Card.Title>Booking Calendar</Card.Title>
          <Badge variant="warning">React Big Calendar — Task 2</Badge>
        </Card.Header>
        <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center h-72">
          <div className="text-center">
            <CalendarClock size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">Booking Calendar</p>
            <p className="text-xs text-slate-400 mt-1">
              React Big Calendar will be integrated in Task 2
            </p>
          </div>
        </div>
      </Card>

      {/* ── Booking List Placeholder ── */}
      <Card className="mt-4">
        <Card.Header>
          <Card.Title>Booking Records</Card.Title>
          <Badge variant="info">Module Setup</Badge>
        </Card.Header>
        <EmptyState
          title="Resource Booking"
          description="This module will manage resource bookings and scheduling. Full implementation coming in Task 2."
          icon={<CalendarClock size={24} className="text-slate-400" />}
          action={
            <Button variant="outline" size="sm" disabled>
              Implementation in progress
            </Button>
          }
        />
      </Card>
    </div>
  );
}

export default BookingPage;
