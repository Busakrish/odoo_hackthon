import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { mockDb, Allocation, Transfer, Asset, Employee, AllocStatus, TransferStatus } from "@/lib/mock-db";
import {
  Plus,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Building2,
  CalendarDays,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/allocation")({
  head: () => ({ meta: [{ title: "Allocation & Transfer — AssetFlow" }] }),
  component: AllocationPage,
});

const allocStatusColor: Record<AllocStatus, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
  Returned: "bg-muted text-muted-foreground border-border",
};

const transferStatusColor: Record<TransferStatus, string> = {
  Pending: "bg-warning/10 text-warning-foreground border-warning/20",
  Approved: "bg-success/10 text-success border-success/20",
  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

function AllocationPage() {
  const [tab, setTab] = useState<"allocations" | "transfers">("allocations");
  const [allocations, setAllocations] = useState<Allocation[]>(() => mockDb.getAllocations());
  const [transfers, setTransfers] = useState<Transfer[]>(() => mockDb.getTransfers());
  const [assets, setAssets] = useState<Asset[]>(() => mockDb.getAssets());
  const [employees] = useState<Employee[]>(() => mockDb.getEmployees());

  // Modals display states
  const [showAllocModal, setShowAllocModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Form states
  const [allocAssetTag, setAllocAssetTag] = useState("");
  const [allocEmployeeId, setAllocEmployeeId] = useState("");
  const [allocDueDate, setAllocDueDate] = useState("");

  const [transferAssetTag, setTransferAssetTag] = useState("");
  const [transferToDept, setTransferToDept] = useState("Finance");
  const [transferReason, setTransferReason] = useState("");

  // Filter available assets for allocation
  const availableAssets = assets.filter((a) => a.status === "Available");
  const allocatedAssets = assets.filter((a) => a.status === "Allocated");

  const handleCreateAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocAssetTag || !allocEmployeeId || !allocDueDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const selectedAsset = assets.find((a) => a.tag === allocAssetTag)!;
    const selectedEmployee = employees.find((emp) => emp.id === allocEmployeeId)!;

    const newAlloc: Allocation = {
      id: `AL-${Math.floor(100 + Math.random() * 900)}`,
      tag: allocAssetTag,
      name: selectedAsset.name,
      employee: selectedEmployee.name,
      dept: selectedEmployee.dept,
      allocatedOn: new Date().toISOString().split("T")[0],
      dueBack: allocDueDate,
      status: "Active",
    };

    // Save allocation
    const updatedAllocs = [newAlloc, ...allocations];
    setAllocations(updatedAllocs);
    mockDb.saveAllocations(updatedAllocs);

    // Update asset status to Allocated
    const updatedAssets = assets.map((a) =>
      a.tag === allocAssetTag ? { ...a, status: "Allocated" as const, assignedTo: selectedEmployee.name } : a
    );
    setAssets(updatedAssets);
    mockDb.saveAssets(updatedAssets);

    toast.success(`Allocated ${selectedAsset.name} to ${selectedEmployee.name}!`);
    setShowAllocModal(false);
    setAllocAssetTag("");
    setAllocEmployeeId("");
    setAllocDueDate("");
  };

  const handleRequestTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAssetTag || !transferReason) {
      toast.error("Please fill in all fields.");
      return;
    }

    const selectedAsset = assets.find((a) => a.tag === transferAssetTag)!;

    const newTransfer: Transfer = {
      id: `TR-${Math.floor(100 + Math.random() * 900)}`,
      tag: transferAssetTag,
      name: selectedAsset.name,
      fromDept: selectedAsset.dept,
      toDept: transferToDept,
      requestedBy: selectedAsset.assignedTo !== "—" ? selectedAsset.assignedTo : "Admin",
      reason: transferReason,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    const updatedTransfers = [newTransfer, ...transfers];
    setTransfers(updatedTransfers);
    mockDb.saveTransfers(updatedTransfers);

    toast.success(`Transfer request submitted for ${selectedAsset.name}!`);
    setShowTransferModal(false);
    setTransferAssetTag("");
    setTransferReason("");
  };

  const handleTransferDecision = (id: string, decision: "Approved" | "Rejected") => {
    const updatedTransfers = transfers.map((t) => {
      if (t.id !== id) return t;

      if (decision === "Approved") {
        // Update the asset's department
        const updatedAssets = assets.map((a) =>
          a.tag === t.tag ? { ...a, dept: t.toDept } : a
        );
        setAssets(updatedAssets);
        mockDb.saveAssets(updatedAssets);

        // Update active allocation's department if exists
        const updatedAllocs = allocations.map((al) =>
          al.tag === t.tag && al.status === "Active" ? { ...al, dept: t.toDept } : al
        );
        setAllocations(updatedAllocs);
        mockDb.saveAllocations(updatedAllocs);
      }

      return { ...t, status: decision };
    });

    setTransfers(updatedTransfers);
    mockDb.saveTransfers(updatedTransfers);

    toast.success(`Transfer request ${decision.toLowerCase()}!`);
  };

  const overdueCount = allocations.filter((a) => a.status === "Overdue").length;
  const pendingCount = transfers.filter((t) => t.status === "Pending").length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Allocation & Transfer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Assign assets, submit transfer requests, and view allocation history.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5" onClick={() => setShowTransferModal(true)}>
            <ArrowLeftRight className="h-4 w-4" /> Request Transfer
          </Button>
          <Button className="gap-1.5" onClick={() => setShowAllocModal(true)}>
            <Plus className="h-4 w-4" /> New Allocation
          </Button>
        </div>
      </div>

      {/* Alert Banners */}
      {overdueCount > 0 && (
        <Card className="p-3 border-destructive/30 bg-destructive/5 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
          <span className="text-sm text-foreground">
            <strong>{overdueCount} allocation{overdueCount > 1 ? "s" : ""}</strong> are overdue for return — flagged for follow-up.
          </span>
        </Card>
      )}
      {pendingCount > 0 && tab === "transfers" && (
        <Card className="p-3 border-warning/30 bg-warning/5 flex items-center gap-2">
          <Clock className="h-4 w-4 text-warning-foreground shrink-0" />
          <span className="text-sm text-foreground">
            <strong>{pendingCount} transfer request{pendingCount > 1 ? "s" : ""}</strong> pending your approval.
          </span>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["allocations", "transfers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "allocations" ? "Active Allocations" : "Transfer Requests"}
            {t === "allocations" && overdueCount > 0 && (
              <Badge className="ml-2 bg-destructive/10 text-destructive border-destructive/20 text-[10px] h-4 px-1">
                {overdueCount}
              </Badge>
            )}
            {t === "transfers" && pendingCount > 0 && (
              <Badge className="ml-2 bg-warning/10 text-warning-foreground border-warning/20 text-[10px] h-4 px-1">
                {pendingCount}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Allocations Table */}
      {tab === "allocations" && (
        <Card className="shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Asset</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Assigned To</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Department</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Allocated On</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Due Back</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allocations.map((a) => (
                  <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-foreground">{a.name}</div>
                        <code className="text-[11px] text-muted-foreground font-mono">{a.tag}</code>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                          {a.employee.split(" ").map((n) => n[0]).join("")}
                        </div>
                        {a.employee}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.dept}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">{a.allocatedOn}</td>
                    <td className="px-4 py-3 text-xs hidden lg:table-cell">
                      <span className={a.status === "Overdue" ? "text-destructive font-semibold" : "text-muted-foreground"}>
                        {a.dueBack}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${allocStatusColor[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {a.status !== "Returned" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => {
                            // Recall asset
                            const updatedAllocs = allocations.map((al) =>
                              al.id === a.id ? { ...al, status: "Returned" as const } : al
                            );
                            setAllocations(updatedAllocs);
                            mockDb.saveAllocations(updatedAllocs);

                            const updatedAssets = assets.map((asset) =>
                              asset.tag === a.tag ? { ...asset, status: "Available" as const, assignedTo: "—" } : asset
                            );
                            setAssets(updatedAssets);
                            mockDb.saveAssets(updatedAssets);

                            toast.success(`Asset ${a.name} recalled!`);
                          }}
                        >
                          Recall
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Transfer Requests */}
      {tab === "transfers" && (
        <div className="space-y-3">
          {transfers.map((t) => (
            <Card
              key={t.id}
              className="p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{t.tag}</code>
                    <span className="font-semibold text-foreground">{t.name}</span>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${transferStatusColor[t.status]}`}>
                      {t.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {t.fromDept} → {t.toDept}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {t.requestedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {t.date}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{t.reason}"</p>
                </div>
                {t.status === "Pending" && (
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
                      onClick={() => handleTransferDecision(t.id, "Rejected")}
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1 text-xs bg-success text-success-foreground hover:bg-success/90"
                      onClick={() => handleTransferDecision(t.id, "Approved")}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* New Allocation Modal */}
      {showAllocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowAllocModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              New Allocation
            </h2>

            {availableAssets.length === 0 ? (
              <div className="text-center text-sm py-4 text-muted-foreground">
                No available assets to allocate. Register an asset first!
              </div>
            ) : (
              <form onSubmit={handleCreateAllocation} className="space-y-3.5 text-sm">
                <div className="space-y-1">
                  <Label htmlFor="alloc-asset">Select Asset *</Label>
                  <select
                    id="alloc-asset"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={allocAssetTag}
                    onChange={(e) => setAllocAssetTag(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Asset --</option>
                    {availableAssets.map((a) => (
                      <option key={a.tag} value={a.tag}>
                        {a.name} ({a.tag})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="alloc-emp">Select Employee *</Label>
                  <select
                    id="alloc-emp"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={allocEmployeeId}
                    onChange={(e) => setAllocEmployeeId(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Employee --</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.dept})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="alloc-due">Due Date *</Label>
                  <Input
                    id="alloc-due"
                    type="date"
                    required
                    value={allocDueDate}
                    onChange={(e) => setAllocDueDate(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <Button type="button" variant="outline" onClick={() => setShowAllocModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Allocate Asset</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* Request Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowTransferModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
              Request Transfer
            </h2>

            {allocatedAssets.length === 0 ? (
              <div className="text-center text-sm py-4 text-muted-foreground">
                No active allocated assets to transfer.
              </div>
            ) : (
              <form onSubmit={handleRequestTransfer} className="space-y-3.5 text-sm">
                <div className="space-y-1">
                  <Label htmlFor="trans-asset">Select Asset *</Label>
                  <select
                    id="trans-asset"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={transferAssetTag}
                    onChange={(e) => setTransferAssetTag(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Asset --</option>
                    {allocatedAssets.map((a) => (
                      <option key={a.tag} value={a.tag}>
                        {a.name} ({a.tag}) — {a.dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="trans-dept">Transfer to Department</Label>
                  <select
                    id="trans-dept"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={transferToDept}
                    onChange={(e) => setTransferToDept(e.target.value)}
                  >
                    <option value="Information Technology">IT</option>
                    <option value="Human Resources">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="trans-reason">Transfer Reason *</Label>
                  <Input
                    id="trans-reason"
                    required
                    placeholder="e.g. Employee transferring departments"
                    value={transferReason}
                    onChange={(e) => setTransferReason(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <Button type="button" variant="outline" onClick={() => setShowTransferModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
