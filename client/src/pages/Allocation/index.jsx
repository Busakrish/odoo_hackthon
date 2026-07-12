import { Plus, ArrowLeftRight } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Badge from '../../components/common/Badge.jsx';

const FEATURE_CARDS = [
  {
    title: 'Asset Allocation',
    description: 'Assign assets to employees or departments with full tracking.',
    badge: { label: 'Pending',  variant: 'warning' },
  },
  {
    title: 'Asset Transfer',
    description: 'Transfer assets between departments or locations seamlessly.',
    badge: { label: 'Pending', variant: 'warning' },
  },
  {
    title: 'Return Management',
    description: 'Record asset returns, condition checks, and re-availability.',
    badge: { label: 'Pending', variant: 'warning' },
  },
  {
    title: 'Allocation History',
    description: 'Full audit trail of every allocation and transfer event.',
    badge: { label: 'Pending', variant: 'warning' },
  },
];

function AllocationPage() {
  return (
    <div>
      <PageHeader
        title="Allocation & Transfer"
        description="Manage asset assignments, transfers between departments, and return workflows."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Allocation & Transfer' }]}
        actions={
          <Button
            leftIcon={<Plus size={16} />}
            disabled
            title="Available in Task 2"
          >
            New Allocation
          </Button>
        }
      />

      {/* ── Feature Overview Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {FEATURE_CARDS.map(({ title, description, badge }) => (
          <Card key={title} hover className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ArrowLeftRight size={18} className="text-primary" />
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

      {/* ── Main Placeholder Area ── */}
      <Card>
        <Card.Header>
          <Card.Title>Allocation Records</Card.Title>
          <Badge variant="info">Module Setup</Badge>
        </Card.Header>
        <EmptyState
          title="Allocation Management"
          description="This module will manage asset allocation and transfers. Full implementation coming in Task 2."
          icon={<ArrowLeftRight size={24} className="text-slate-400" />}
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

export default AllocationPage;
