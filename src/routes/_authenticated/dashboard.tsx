import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  mockDb,
  Asset,
  AssetCategory,
  Booking,
  Ticket,
  Transfer,
  Allocation,
  Priority,
} from "@/lib/mock-db";
import {
  Boxes,
  ArrowLeftRight,
  CalendarClock,
  RotateCcw,
  AlertCircle,
  Plus,
  Wrench,
  ClipboardList,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AssetFlow" },
      { name: "description", content: "Today's overview of assets, allocations, bookings, and pending actions." },
    ],
  }),
  component: DashboardPage,
});

const initialActivity = [
  { text: "Laptop AF-0114 allocated to Priya Shah — IT dept", when: "2m ago" },
  { text: "Room B2 booking confirmed — 2:00 to 3:00 PM", when: "18m ago" },
  { text: "Projector AF-0062 maintenance resolved", when: "1h ago" },
  { text: "Transfer approved — AF-0033 to Facilities", when: "3h ago" },
];

function DashboardPage() {
  const [activity, setActivity] = useState(initialActivity);

  // Load live DB states
  const assets = mockDb.getAssets();
  const bookings = mockDb.getBookings();
  const transfers = mockDb.getTransfers();
  const allocations = mockDb.getAllocations();
  const tickets = mockDb.getTickets();

  // Modal display states
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Form states
  const [assetName, setAssetName] = useState("");
  const [assetCategory, setAssetCategory] = useState<AssetCategory>("Electronics");
  const [assetDept, setAssetDept] = useState("IT");
  const [assetValue, setAssetValue] = useState("");
  const [assetTag, setAssetTag] = useState("");

  const [bookResource, setBookResource] = useState("Conference Room A");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("10:00 AM");
  const [bookPurpose, setBookPurpose] = useState("");

  const [requestType, setRequestType] = useState("Maintenance");
  const [requestAsset, setRequestAsset] = useState("");
  const [requestPriority, setRequestPriority] = useState<Priority>("Medium");
  const [requestDesc, setRequestDesc] = useState("");

  // Statistics Computations
  const availableCount = assets.filter((a) => a.status === "Available").length;
  const allocatedCount = assets.filter((a) => a.status === "Allocated").length;
  const activeBookingsCount = bookings.length;
  const pendingTransfersCount = transfers.filter((t) => t.status === "Pending").length;
  const overdueCount = allocations.filter((a) => a.status === "Overdue").length;
  const maintenanceCount = assets.filter((a) => a.status === "Maintenance").length;

  const stats = [
    { label: "Available", value: availableCount, icon: Boxes, tone: "text-primary" },
    { label: "Allocated", value: allocatedCount, icon: ArrowLeftRight, tone: "text-primary" },
    { label: "Active Bookings", value: activeBookingsCount, icon: CalendarClock, tone: "text-primary" },
    { label: "Pending Transfers", value: pendingTransfersCount, icon: ArrowLeftRight, tone: "text-warning" },
    { label: "Upcoming Returns", value: overdueCount + 10, icon: RotateCcw, tone: "text-primary" },
    { label: "Under Maintenance", value: maintenanceCount, icon: Wrench, tone: "text-warning" },
  ];

  // Form handlers
  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !assetTag) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newAsset: Asset = {
      tag: assetTag,
      name: assetName,
      category: assetCategory,
      status: "Available",
      dept: assetDept,
      assignedTo: "—",
      purchased: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      value: assetValue || "0",
    };

    // Save Asset
    const updatedAssets = [newAsset, ...assets];
    mockDb.saveAssets(updatedAssets);

    // Update department assets count
    const depts = mockDb.getDepartments();
    const updatedDepts = depts.map((d) =>
      d.name === assetDept || (assetDept === "IT" && d.name === "Information Technology")
        ? { ...d, assets: d.assets + 1 }
        : d
    );
    mockDb.saveDepartments(updatedDepts);

    // Add activity log
    const logText = `New asset ${assetName} (${assetTag}) registered in ${assetDept} department`;
    setActivity((prev) => [{ text: logText, when: "Just now" }, ...prev]);

    toast.success(`Asset "${assetName}" registered successfully!`);
    setShowRegisterModal(false);

    // Reset Form
    setAssetName("");
    setAssetValue("");
    setAssetTag("");
  };

  const handleBookResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDate || !bookPurpose) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const resMap: Record<string, string> = {
      "Conference Room A": "R1",
      "Board Room": "R2",
      "Projector — Hall B": "R3",
      "Video Conferencing Kit": "R4",
      "Training Lab (PC)": "R5",
    };

    const newBooking: Booking = {
      id: `B-${Date.now()}`,
      resourceId: resMap[bookResource] || "R1",
      day: new Date(bookDate).getDay() % 5, // fallback map Mon-Fri
      hour: parseInt(bookTime) || 10,
      duration: 1,
      bookedBy: "You",
      label: bookPurpose,
      mine: true,
    };

    // Save booking
    const updatedBookings = [...bookings, newBooking];
    mockDb.saveBookings(updatedBookings);

    // Add activity log
    const logText = `${bookResource} booking confirmed for "${bookPurpose}" — ${bookDate} at ${bookTime}`;
    setActivity((prev) => [{ text: logText, when: "Just now" }, ...prev]);

    toast.success(`Booking confirmed for ${bookResource}!`);
    setShowBookModal(false);

    // Reset Form
    setBookDate("");
    setBookPurpose("");
  };

  const handleRaiseRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestAsset || !requestDesc) {
      toast.error("Please select an asset and write description.");
      return;
    }

    const targetAssetObj = assets.find((a) => a.tag === requestAsset)!;

    if (requestType === "Maintenance") {
      const newTicket: Ticket = {
        id: `MR-${Math.floor(100 + Math.random() * 900)}`,
        tag: requestAsset,
        asset: targetAssetObj.name,
        issue: requestDesc,
        priority: requestPriority,
        status: "Pending",
        raisedBy: "Admin",
        technician: "Unassigned",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      };

      // Save ticket
      const updatedTickets = [newTicket, ...tickets];
      mockDb.saveTickets(updatedTickets);

      // Update asset status to Maintenance
      const updatedAssets = assets.map((a) =>
        a.tag === requestAsset ? { ...a, status: "Maintenance" as const } : a
      );
      mockDb.saveAssets(updatedAssets);
    } else {
      // Transfer request
      const newTransfer: Transfer = {
        id: `TR-${Math.floor(100 + Math.random() * 900)}`,
        tag: requestAsset,
        name: targetAssetObj.name,
        fromDept: targetAssetObj.dept,
        toDept: "Facilities", // Default target for quick actions
        requestedBy: "Admin",
        reason: requestDesc,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      };

      const updatedTransfers = [newTransfer, ...transfers];
      mockDb.saveTransfers(updatedTransfers);
    }

    // Add activity log
    const logText = `${requestType} request raised for ${targetAssetObj.name} — Priority: ${requestPriority}`;
    setActivity((prev) => [{ text: logText, when: "Just now" }, ...prev]);

    toast.success(`${requestType} request successfully raised!`);
    setShowRequestModal(false);

    // Reset Form
    setRequestDesc("");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Today's Overview</h1>
        <p className="text-sm text-muted-foreground">Snapshot of your assets, bookings, and pending actions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Warning Alert Banner */}
      {overdueCount > 0 && (
        <Card className="p-4 border-destructive/30 bg-destructive/5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">{overdueCount} assets overdue for return</span>
            <span className="text-sm text-muted-foreground">— flagged for follow-up</span>
          </div>
        </Card>
      )}

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button className="gap-1.5" onClick={() => setShowRegisterModal(true)}>
          <Plus className="h-4 w-4" /> Register asset
        </Button>
        <Button variant="outline" className="gap-1.5" onClick={() => setShowBookModal(true)}>
          <CalendarClock className="h-4 w-4" /> Book resource
        </Button>
        <Button variant="outline" className="gap-1.5" onClick={() => {
          if (assets.length > 0 && !requestAsset) setRequestAsset(assets[0].tag);
          setShowRequestModal(true);
        }}>
          <ClipboardList className="h-4 w-4" /> Raise request
        </Button>
      </div>

      {/* Recent Activity Card */}
      <Card className="shadow-[var(--shadow-card)]">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Activity</h2>
        </div>
        <ul className="divide-y divide-border">
          {activity.map((a, i) => (
            <li key={i} className="p-4 flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">{a.text}</span>
              <span className="text-xs text-muted-foreground shrink-0">{a.when}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 1. Register Asset Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <Boxes className="h-5 w-5 text-primary" />
              Register Asset
            </h2>

            <form onSubmit={handleRegisterAsset} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="asset-name">Asset Name *</Label>
                <Input
                  id="asset-name"
                  required
                  placeholder="e.g. MacBook Pro 16-inch"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="asset-tag">Asset Tag *</Label>
                  <Input
                    id="asset-tag"
                    required
                    placeholder="e.g. AF-0125"
                    value={assetTag}
                    onChange={(e) => setAssetTag(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="asset-val">Value (INR)</Label>
                  <Input
                    id="asset-val"
                    placeholder="e.g. 1,45,000"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="asset-category">Category</Label>
                  <select
                    id="asset-category"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value as AssetCategory)}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="asset-dept">Department</Label>
                  <select
                    id="asset-dept"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={assetDept}
                    onChange={(e) => setAssetDept(e.target.value)}
                  >
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowRegisterModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Confirm Registration
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* 2. Book Resource Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowBookModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Book Resource
            </h2>

            <form onSubmit={handleBookResource} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="book-resource">Select Resource *</Label>
                <select
                  id="book-resource"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                  value={bookResource}
                  onChange={(e) => setBookResource(e.target.value)}
                >
                  <option>Conference Room A</option>
                  <option>Board Room</option>
                  <option>Projector — Hall B</option>
                  <option>Video Conferencing Kit</option>
                  <option>Training Lab (PC)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="book-date">Date *</Label>
                  <Input
                    id="book-date"
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="book-time">Time Slot</Label>
                  <select
                    id="book-time"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                  >
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="book-purpose">Booking Purpose *</Label>
                <Input
                  id="book-purpose"
                  required
                  placeholder="e.g. Design review meeting"
                  value={bookPurpose}
                  onChange={(e) => setBookPurpose(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowBookModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* 3. Raise Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Raise Request
            </h2>

            <form onSubmit={handleRaiseRequest} className="space-y-3.5 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="request-type">Request Type</Label>
                  <select
                    id="request-type"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                  >
                    <option value="Maintenance">🔧 Maintenance</option>
                    <option value="Transfer">🔄 Transfer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="request-priority">Priority</Label>
                  <select
                    id="request-priority"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={requestPriority}
                    onChange={(e) => setRequestPriority(e.target.value as Priority)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="request-asset">Target Asset</Label>
                <select
                  id="request-asset"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                  value={requestAsset}
                  onChange={(e) => setRequestAsset(e.target.value)}
                >
                  {assets.map((a) => (
                    <option key={a.tag} value={a.tag}>
                      {a.name} ({a.tag})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="request-desc">Details / Description *</Label>
                <textarea
                  id="request-desc"
                  required
                  rows={3}
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Describe the issue or reason for the request..."
                  value={requestDesc}
                  onChange={(e) => setRequestDesc(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowRequestModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}