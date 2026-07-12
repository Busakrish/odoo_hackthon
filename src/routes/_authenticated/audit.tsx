import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockDb, AuditItem, AuditStatus } from "@/lib/mock-db";
import {
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Download,
  Play,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/audit")({
  head: () => ({ meta: [{ title: "Audit — AssetFlow" }] }),
  component: AuditPage,
});

const auditStatusConfig: Record<AuditStatus, { color: string; icon: React.ElementType; label: string }> = {
  Match: { color: "bg-success/10 text-success border-success/20", icon: CheckCircle2, label: "Match" },
  Discrepancy: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertTriangle, label: "Discrepancy" },
  Unverified: { color: "bg-muted text-muted-foreground border-border", icon: HelpCircle, label: "Unverified" },
};

function AuditPage() {
  const [auditItems, setAuditItems] = useState<AuditItem[]>(() => mockDb.getAuditItems());
  const [filter, setFilter] = useState<AuditStatus | "All">("All");
  const [search, setSearch] = useState("");

  const handleStartNewAudit = () => {
    // Reset all items to unverified
    const reset = auditItems.map((item) => ({
      ...item,
      actualLocation: "—",
      actualDept: "—",
      auditStatus: "Unverified" as const,
      verifiedBy: "—",
    }));

    setAuditItems(reset);
    mockDb.saveAuditItems(reset);
    toast.success("New Q3 2025 Audit cycle successfully started!");
  };

  const handleExportReport = () => {
    const headers = [
      "Asset Tag",
      "Asset Name",
      "Expected Location",
      "Actual Location",
      "Expected Dept",
      "Actual Dept",
      "Audit Status",
      "Verified By",
    ];

    const rows = auditItems.map((item) => [
      item.tag,
      item.name,
      item.expectedLocation,
      item.actualLocation,
      item.expectedDept,
      item.actualDept,
      item.auditStatus,
      item.verifiedBy,
    ]);

    mockDb.downloadCsv("asset_flow_audit_report.csv", headers, rows);
    toast.success("Audit report CSV successfully downloaded!");
  };

  const matched = auditItems.filter((i) => i.auditStatus === "Match").length;
  const discrepancies = auditItems.filter((i) => i.auditStatus === "Discrepancy").length;
  const unverified = auditItems.filter((i) => i.auditStatus === "Unverified").length;
  const total = auditItems.length;
  const progress = total > 0 ? Math.round((matched / total) * 100) : 0;

  const filtered = auditItems.filter((item) => {
    const matchFilter = filter === "All" || item.auditStatus === filter;
    const q = search.toLowerCase();
    const matchSearch =
      item.tag.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.expectedDept.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Asset Audit</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Audit cycle checklist with auto-detected discrepancies and verification status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5" onClick={handleExportReport}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button className="gap-1.5" onClick={handleStartNewAudit}>
            <Play className="h-4 w-4" /> Start New Audit
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Audit Progress — Q3 2025</span>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span>{matched} matched</span>
              <span className="text-destructive font-medium">{discrepancies} discrepancies</span>
              <span>{unverified} unverified</span>
              <span>{total} total</span>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            {(["Match", "Discrepancy", "Unverified"] as AuditStatus[]).map((s) => {
              const conf = auditStatusConfig[s];
              const count = auditItems.filter((i) => i.auditStatus === s).length;
              const Icon = conf.icon;
              return (
                <div key={s} className={`flex flex-col items-center px-4 py-3 rounded-xl border ${conf.color}`}>
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-2xl font-bold">{count}</span>
                  <span className="text-[10px] uppercase tracking-wide mt-0.5">{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Discrepancy Alert */}
      {discrepancies > 0 && (
        <Card className="p-3 border-destructive/30 bg-destructive/5 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
          <div className="text-sm text-foreground">
            <strong>{discrepancies} discrepancies detected</strong> — assets found at unexpected locations or departments.
            Please investigate and update records.
          </div>
        </Card>
      )}

      {/* Filter + Search */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="w-full border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground bg-background"
            placeholder="Search by tag, name, department…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {(["All", "Match", "Discrepancy", "Unverified"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-md text-xs font-medium border transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Checklist Table */}
      <Card className="shadow-[var(--shadow-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Asset</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Expected Location</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Actual Location</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Dept. Match</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Verified By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => {
                const conf = auditStatusConfig[item.auditStatus];
                const Icon = conf.icon;
                const deptMismatch = item.expectedDept !== item.actualDept && item.actualDept !== "—";
                return (
                  <tr
                    key={item.tag}
                    className={`transition-colors ${
                      item.auditStatus === "Discrepancy"
                        ? "bg-destructive/5 hover:bg-destructive/10"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <code className="text-[11px] text-muted-foreground font-mono">{item.tag}</code>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">{item.expectedLocation}</td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell">
                      <span
                        className={
                          item.expectedLocation !== item.actualLocation && item.actualLocation !== "—"
                            ? "text-destructive font-medium"
                            : item.actualLocation === "—"
                            ? "text-muted-foreground italic"
                            : "text-foreground"
                        }
                      >
                        {item.actualLocation}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {item.actualDept === "—" ? (
                        <span className="text-xs text-muted-foreground italic">—</span>
                      ) : deptMismatch ? (
                        <span className="text-xs text-destructive font-medium">
                          {item.expectedDept} → {item.actualDept}
                        </span>
                      ) : (
                        <span className="text-xs text-success font-medium">{item.expectedDept} ✓</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${conf.color}`}>
                        <Icon className="h-3 w-3" />
                        {conf.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{item.verifiedBy}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground text-sm">
                    No items match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
          <span>Showing {filtered.length} of {total} items</span>
          <span>Last synced: Jul 12, 2025 — 12:30 PM</span>
        </div>
      </Card>
    </div>
  );
}
