import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockDb, Ticket, TicketStatus, Priority, Asset } from "@/lib/mock-db";
import {
  Plus,
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ThumbsUp,
  User,
  CalendarDays,
  Tag,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — AssetFlow" }] }),
  component: MaintenancePage,
});

const priorityColor: Record<Priority, string> = {
  Low: "bg-muted text-muted-foreground border-border",
  Medium: "bg-warning/10 text-warning-foreground border-warning/20",
  High: "bg-orange-500/10 text-orange-600 border-orange-200",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusIcon: Record<TicketStatus, React.ElementType> = {
  Pending: Clock,
  Approved: ThumbsUp,
  "In Progress": Wrench,
  Resolved: CheckCircle2,
};

const statusHeaderColor: Record<TicketStatus, string> = {
  Pending: "border-t-warning",
  Approved: "border-t-blue-400",
  "In Progress": "border-t-orange-400",
  Resolved: "border-t-success",
};

const columns: TicketStatus[] = ["Pending", "Approved", "In Progress", "Resolved"];

function MaintenancePage() {
  const [tickets, setTickets] = useState<Ticket[]>(() => mockDb.getTickets());
  const [assets, setAssets] = useState<Asset[]>(() => mockDb.getAssets());
  const [dragId, setDragId] = useState<string | null>(null);

  // Modal display states
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Form states
  const [formAssetTag, setFormAssetTag] = useState("");
  const [formIssue, setFormIssue] = useState("");
  const [formPriority, setFormPriority] = useState<Priority>("Medium");

  const moveTicket = (id: string, newStatus: TicketStatus) => {
    const updated = tickets.map((t) => {
      if (t.id !== id) return t;

      // If resolving the ticket, sync asset back to Available
      if (newStatus === "Resolved") {
        const updatedAssets = assets.map((a) =>
          a.tag === t.tag ? { ...a, status: "Available" as const } : a
        );
        setAssets(updatedAssets);
        mockDb.saveAssets(updatedAssets);
      }

      return { ...t, status: newStatus };
    });

    setTickets(updated);
    mockDb.saveTickets(updated);
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const handleRaiseRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAssetTag || !formIssue) {
      toast.error("Please fill in all fields.");
      return;
    }

    const selectedAsset = assets.find((a) => a.tag === formAssetTag)!;

    const newTicket: Ticket = {
      id: `MR-${Math.floor(100 + Math.random() * 900)}`,
      tag: formAssetTag,
      asset: selectedAsset.name,
      issue: formIssue,
      priority: formPriority,
      status: "Pending",
      raisedBy: "Admin",
      technician: "Unassigned",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };

    // Save ticket
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    mockDb.saveTickets(updatedTickets);

    // Update asset status to Maintenance if priority is High or Critical
    if (formPriority === "High" || formPriority === "Critical") {
      const updatedAssets = assets.map((a) =>
        a.tag === formAssetTag ? { ...a, status: "Maintenance" as const } : a
      );
      setAssets(updatedAssets);
      mockDb.saveAssets(updatedAssets);
    }

    toast.success(`Maintenance request raised for ${selectedAsset.name}!`);
    setShowRequestModal(false);
    setFormAssetTag("");
    setFormIssue("");
  };

  const columnCounts = columns.reduce(
    (acc, col) => ({ ...acc, [col]: tickets.filter((t) => t.status === col).length }),
    {} as Record<TicketStatus, number>
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage asset maintenance tickets across their lifecycle.
          </p>
        </div>
        <Button className="gap-1.5" onClick={() => setShowRequestModal(true)}>
          <Plus className="h-4 w-4" /> Raise Request
        </Button>
      </div>

      {/* Critical Alert */}
      {tickets.some((t) => t.priority === "Critical" && t.status !== "Resolved") && (
        <Card className="p-3 border-destructive/30 bg-destructive/5 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
          <span className="text-sm text-foreground">
            <strong>Critical issue pending:</strong>{" "}
            {tickets.find((t) => t.priority === "Critical" && t.status !== "Resolved")?.asset} — immediate attention required.
          </span>
        </Card>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const Icon = statusIcon[col];
          const colTickets = tickets.filter((t) => t.status === col);
          return (
            <div
              key={col}
              className="flex flex-col gap-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) {
                  moveTicket(dragId, col);
                  setDragId(null);
                }
              }}
            >
              {/* Column Header */}
              <div className={`rounded-xl border-t-4 ${statusHeaderColor[col]} bg-card shadow-[var(--shadow-card)] px-3 py-2.5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {col}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {columnCounts[col]}
                  </Badge>
                </div>
              </div>

              {/* Tickets */}
              {colTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  draggable
                  onDragStart={() => setDragId(ticket.id)}
                  onDragEnd={() => setDragId(null)}
                  className={`p-3.5 shadow-[var(--shadow-card)] cursor-grab active:cursor-grabbing hover:shadow-[var(--shadow-elevated)] transition-all select-none ${
                    dragId === ticket.id ? "opacity-50 scale-95" : ""
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-1">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${priorityColor[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">{ticket.id}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm leading-snug">{ticket.issue}</div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        {ticket.asset}
                      </div>
                    </div>
                    <div className="border-t border-border pt-2 space-y-1 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" /> Raised by {ticket.raisedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Wrench className="h-3 w-3" />
                        <span className={ticket.technician === "Unassigned" ? "text-warning-foreground font-medium" : ""}>
                          {ticket.technician}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {ticket.date}
                      </div>
                    </div>
                    {/* Quick Move Buttons */}
                    <div className="flex gap-1">
                      {columns
                        .filter((c) => c !== col)
                        .slice(0, 2)
                        .map((nextCol) => (
                          <button
                            key={nextCol}
                            onClick={() => moveTicket(ticket.id, nextCol)}
                            className="flex-1 text-[10px] px-2 py-1 rounded border border-border text-muted-foreground hover:bg-accent transition-colors truncate"
                          >
                            → {nextCol}
                          </button>
                        ))}
                    </div>
                  </div>
                </Card>
              ))}

              {colTickets.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-border h-24 flex items-center justify-center text-xs text-muted-foreground">
                  Drop tickets here
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Raise Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Raise Maintenance Request
            </h2>

            <form onSubmit={handleRaiseRequest} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="req-asset">Select Target Asset *</Label>
                <select
                  id="req-asset"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                  value={formAssetTag}
                  onChange={(e) => setFormAssetTag(e.target.value)}
                  required
                >
                  <option value="">-- Choose Asset --</option>
                  {assets.map((a) => (
                    <option key={a.tag} value={a.tag}>
                      {a.name} ({a.tag})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="req-priority">Priority</Label>
                <select
                  id="req-priority"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                  value={formPriority}
                  onChange={(e) => setFormPriority(e.target.value as Priority)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="req-issue">Issue Description *</Label>
                <textarea
                  id="req-issue"
                  required
                  rows={3}
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Describe the issue in detail..."
                  value={formIssue}
                  onChange={(e) => setFormIssue(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowRequestModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
