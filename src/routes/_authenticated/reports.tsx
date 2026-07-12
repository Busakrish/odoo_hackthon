import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockDb } from "@/lib/mock-db";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Download,
  TrendingUp,
  TrendingDown,
  Boxes,
  ArrowLeftRight,
  CalendarClock,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports — AssetFlow" }] }),
  component: ReportsPage,
});

const bookingTrendData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 18 },
  { day: "Wed", bookings: 9 },
  { day: "Thu", bookings: 22 },
  { day: "Fri", bookings: 16 },
  { day: "Sat", bookings: 4 },
  { day: "Sun", bookings: 2 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-elevated)] px-3 py-2 text-xs">
        <div className="font-semibold text-foreground mb-1">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="text-muted-foreground">
            {p.name ?? "Value"}: <span className="font-medium text-foreground">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function ReportsPage() {
  const assets = mockDb.getAssets();
  const departments = mockDb.getDepartments();
  const bookings = mockDb.getBookings();
  const tickets = mockDb.getTickets();

  // Generate dynamic utilization data per department
  const utilizationData = departments.map((dept) => {
    // IT abbreviation matching
    const nameMatch = dept.name === "Information Technology" ? "IT" : dept.name;
    const deptAssets = assets.filter((a) => a.dept === nameMatch || a.dept === dept.name);
    const total = deptAssets.length;
    const utilized = deptAssets.filter((a) => a.status === "Allocated").length;
    const maintenance = deptAssets.filter((a) => a.status === "Maintenance").length;

    return {
      dept: nameMatch,
      total,
      utilized,
      maintenance,
    };
  });

  // Calculate dynamic Pie status chart data
  const availableCount = assets.filter((a) => a.status === "Available").length;
  const allocatedCount = assets.filter((a) => a.status === "Allocated").length;
  const maintenanceCount = assets.filter((a) => a.status === "Maintenance").length;
  const retiredCount = assets.filter((a) => a.status === "Retired").length;

  const assetStatusData = [
    { name: "Available", value: availableCount, color: "#22c55e" },
    { name: "Allocated", value: allocatedCount, color: "#6366f1" },
    { name: "Maintenance", value: maintenanceCount, color: "#f59e0b" },
    { name: "Retired", value: retiredCount, color: "#94a3b8" },
  ].filter((d) => d.value > 0); // Hide empty statuses

  // KPI Calculations
  const totalAssetsVal = assets.length;
  const activeAllocationsVal = allocatedCount;
  const openMaintenanceVal = tickets.filter((t) => t.status !== "Resolved").length;

  // Global Utilization Rate
  const totalInUse = allocatedCount;
  const totalActive = assets.filter((a) => a.status !== "Retired").length;
  const utilRate = totalActive > 0 ? Math.round((totalInUse / totalActive) * 100) : 0;

  const kpis = [
    { label: "Total Assets", value: totalAssetsVal.toString(), change: "+12", positive: true, icon: Boxes, sub: "vs last quarter" },
    { label: "Utilization Rate", value: `${utilRate}%`, change: "+3%", positive: true, icon: TrendingUp, sub: "vs last quarter" },
    { label: "Active Allocations", value: activeAllocationsVal.toString(), change: "+5", positive: true, icon: ArrowLeftRight, sub: "this month" },
    { label: "Avg Booking/Day", value: "11.9", change: "-1.2", positive: false, icon: CalendarClock, sub: "this week" },
    { label: "Open Maintenance", value: openMaintenanceVal.toString(), change: "-3", positive: true, icon: Wrench, sub: "vs last month" },
    { label: "Overdue Returns", value: "2", change: "+1", positive: false, icon: TrendingDown, sub: "flagged" },
  ];

  const handleExportCsv = () => {
    const headers = ["Department", "Total Assets", "Utilized Assets", "Utilization %", "Under Maintenance"];
    const rows = utilizationData.map((row) => {
      const utilPct = row.total > 0 ? Math.round((row.utilized / row.total) * 100) : 0;
      return [
        row.dept,
        row.total.toString(),
        row.utilized.toString(),
        `${utilPct}%`,
        row.maintenance.toString(),
      ];
    });

    mockDb.downloadCsv("asset_flow_department_utilization.csv", headers, rows);
    toast.success("Department utilization report CSV successfully downloaded!");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Asset utilization, booking trends, and status distribution.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5 text-sm" onClick={handleExportCsv}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide leading-tight">
                  {kpi.label}
                </span>
                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={`text-xs font-semibold ${kpi.positive ? "text-success" : "text-destructive"}`}
                >
                  {kpi.change}
                </span>
                <span className="text-[10px] text-muted-foreground">{kpi.sub}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Asset Utilization Bar Chart */}
        <Card className="p-5 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-4">Asset Utilization by Department</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={utilizationData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="dept"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{value}</span>
                )}
              />
              <Bar dataKey="total" name="Total" fill="var(--muted)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="utilized" name="Utilized" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Asset Status Pie Chart */}
        <Card className="p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-foreground mb-4">Asset Status Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={assetStatusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {assetStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Booking Trend Line Chart */}
      <Card className="p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold text-foreground mb-4">Resource Bookings — This Week</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={bookingTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="bookings"
              name="Bookings"
              stroke="var(--primary)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--primary)", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "var(--primary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Table */}
      <Card className="shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Department Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Total Assets</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">In Use</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Utilization</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Maintenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {utilizationData.map((row) => {
                const util = row.total > 0 ? Math.round((row.utilized / row.total) * 100) : 0;
                return (
                  <tr key={row.dept} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{row.dept}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{row.total}</td>
                    <td className="px-4 py-3 text-right text-foreground">{row.utilized}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${util}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${util >= 80 ? "text-success" : util >= 60 ? "text-warning-foreground" : "text-muted-foreground"}`}>
                          {util}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                      {row.maintenance}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
