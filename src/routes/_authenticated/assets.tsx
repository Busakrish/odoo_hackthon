import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  mockDb,
  Asset,
  AssetCategory,
  AssetStatus,
  Employee,
  Allocation,
  AssetHistoryEvent,
} from "@/lib/mock-db";
import {
  Search,
  Plus,
  SlidersHorizontal,
  Laptop,
  Armchair,
  Car,
  Wrench,
  ChevronDown,
  ChevronUp,
  X,
  History,
  CalendarDays,
  User,
  PenSquare,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/assets")({
  head: () => ({ meta: [{ title: "Assets Directory — AssetFlow" }] }),
  component: AssetsPage,
});

const categoryIcons: Record<AssetCategory, React.ElementType> = {
  Electronics: Laptop,
  Furniture: Armchair,
  Vehicles: Car,
  Equipment: Wrench,
};

const statusColors: Record<AssetStatus, string> = {
  Available: "bg-success/10 text-success border-success/20",
  Allocated: "bg-primary/10 text-primary border-primary/20",
  Maintenance: "bg-warning/10 text-warning-foreground border-warning/20",
  Retired: "bg-muted text-muted-foreground border-border",
};

const categories: AssetCategory[] = ["Electronics", "Furniture", "Vehicles", "Equipment"];
const statuses: AssetStatus[] = ["Available", "Allocated", "Maintenance", "Retired"];

function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(() => mockDb.getAssets());
  const [employees] = useState<Employee[]>(() => mockDb.getEmployees());

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<AssetStatus | "All">("All");
  const [expandedTag, setExpandedTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Context asset state for actions
  const [activeAsset, setActiveAsset] = useState<Asset | null>(null);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // New Asset Form State
  const [assetName, setAssetName] = useState("");
  const [assetTag, setAssetTag] = useState("");
  const [assetCategory, setAssetCategory] = useState<AssetCategory>("Electronics");
  const [assetDept, setAssetDept] = useState("IT");
  const [assetValue, setAssetValue] = useState("");

  // Allocate Form State
  const [allocEmpId, setAllocEmpId] = useState("");
  const [allocDueDate, setAllocDueDate] = useState("");

  // Edit Form State
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState<AssetCategory>("Electronics");
  const [editDept, setEditDept] = useState("IT");
  const [editValue, setEditValue] = useState("");
  const [editStatus, setEditStatus] = useState<AssetStatus>("Available");

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !assetTag) {
      toast.error("Please fill in all fields.");
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
    setAssets(updatedAssets);
    mockDb.saveAssets(updatedAssets);

    // Update department asset count
    const depts = mockDb.getDepartments();
    const updatedDepts = depts.map((d) =>
      d.name === assetDept || (assetDept === "IT" && d.name === "Information Technology")
        ? { ...d, assets: d.assets + 1 }
        : d
    );
    mockDb.saveDepartments(updatedDepts);

    // Save History log
    mockDb.addHistoryEvent(assetTag, "Asset Registered", "Admin", `Asset created with initial value ₹${Number(assetValue).toLocaleString("en-IN")}`);

    toast.success(`Asset "${assetName}" registered successfully!`);
    setShowRegisterModal(false);

    // Reset Form
    setAssetName("");
    setAssetTag("");
    setAssetValue("");
  };

  const handleOpenAllocate = (asset: Asset) => {
    setActiveAsset(asset);
    setAllocEmpId("");
    setAllocDueDate("");
    setShowAllocateModal(true);
  };

  const handleOpenEdit = (asset: Asset) => {
    setActiveAsset(asset);
    setEditName(asset.name);
    setEditCategory(asset.category);
    setEditDept(asset.dept);
    setEditValue(asset.value);
    setEditStatus(asset.status);
    setShowEditModal(true);
  };

  const handleOpenHistory = (asset: Asset) => {
    setActiveAsset(asset);
    setShowHistoryModal(true);
  };

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset || !allocEmpId || !allocDueDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const selectedEmployee = employees.find((emp) => emp.id === allocEmpId)!;

    // Create allocation
    const allocations = mockDb.getAllocations();
    const newAlloc: Allocation = {
      id: `AL-${Math.floor(100 + Math.random() * 900)}`,
      tag: activeAsset.tag,
      name: activeAsset.name,
      employee: selectedEmployee.name,
      dept: selectedEmployee.dept,
      allocatedOn: new Date().toISOString().split("T")[0],
      dueBack: allocDueDate,
      status: "Active",
    };
    mockDb.saveAllocations([newAlloc, ...allocations]);

    // Update asset details
    const updated = assets.map((a) =>
      a.tag === activeAsset.tag
        ? { ...a, status: "Allocated" as const, assignedTo: selectedEmployee.name }
        : a
    );
    setAssets(updated);
    mockDb.saveAssets(updated);

    // Log history
    mockDb.addHistoryEvent(
      activeAsset.tag,
      "Allocated",
      "Admin",
      `Assigned to ${selectedEmployee.name} (Due: ${allocDueDate})`
    );

    toast.success(`Asset allocated to ${selectedEmployee.name}!`);
    setShowAllocateModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset || !editName) {
      toast.error("Please fill in asset name.");
      return;
    }

    const updated = assets.map((a) => {
      if (a.tag !== activeAsset.tag) return a;
      return {
        ...a,
        name: editName,
        category: editCategory,
        dept: editDept,
        value: editValue || "0",
        status: editStatus,
        assignedTo: editStatus === "Available" ? "—" : a.assignedTo,
      };
    });
    setAssets(updated);
    mockDb.saveAssets(updated);

    // Log history
    mockDb.addHistoryEvent(
      activeAsset.tag,
      "Modified",
      "Admin",
      `Details updated (Name: ${editName}, Department: ${editDept}, Status: ${editStatus})`
    );

    toast.success("Asset details updated successfully!");
    setShowEditModal(false);
  };

  const filtered = assets.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.tag.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.dept.toLowerCase().includes(q) ||
      a.assignedTo.toLowerCase().includes(q);
    const matchCat = selectedCategory === "All" || a.category === selectedCategory;
    const matchStat = selectedStatus === "All" || a.status === selectedStatus;
    return matchSearch && matchCat && matchStat;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Asset Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Register, search, and filter assets by tag, category, status, and department.
          </p>
        </div>
        <Button className="gap-1.5" onClick={() => setShowRegisterModal(true)}>
          <Plus className="h-4 w-4" /> Register Asset
        </Button>
      </div>

      {/* Summary Pills */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => {
          const count = assets.filter((a) => a.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setSelectedStatus(selectedStatus === s ? "All" : s)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedStatus === s
                  ? statusColors[s] + " ring-2 ring-offset-1 ring-primary/40"
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {s}
              <span className="font-bold">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Search + Filter Bar */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by tag, name, department…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="gap-1.5"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {selectedCategory !== "All" && (
            <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">1</Badge>
          )}
        </Button>
      </div>

      {/* Category Filter */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <span className="text-xs text-muted-foreground self-center">Category:</span>
          {(["All", ...categories] as const).map((cat) => {
            const Icon = cat !== "All" ? categoryIcons[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as AssetCategory | "All")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-accent"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Asset Table */}
      <Card className="shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {filtered.length} asset{filtered.length !== 1 ? "s" : ""} found
          </span>
          {(search || selectedCategory !== "All" || selectedStatus !== "All") && (
            <button
              className="text-xs text-primary hover:underline"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedStatus("All");
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tag</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Asset Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Assigned To</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((asset) => {
                const Icon = categoryIcons[asset.category];
                const expanded = expandedTag === asset.tag;
                return (
                  <>
                    <tr
                      key={asset.tag}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setExpandedTag(expanded ? null : asset.tag)}
                    >
                      <td className="px-4 py-3">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">
                          {asset.tag}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{asset.category}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[asset.status]}`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{asset.dept}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{asset.assignedTo}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {expanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </td>
                    </tr>
                    {expanded && (
                      <tr key={asset.tag + "-detail"} className="bg-muted/20">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Purchased</div>
                              <div className="text-foreground font-medium">{asset.purchased}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Value</div>
                              <div className="text-foreground font-medium">₹{Number(asset.value).toLocaleString("en-IN")}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Department</div>
                              <div className="text-foreground font-medium">{asset.dept}</div>
                            </div>
                            <div className="flex items-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEdit(asset);
                                }}
                              >
                                <PenSquare className="h-3 w-3" /> Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenHistory(asset);
                                }}
                              >
                                <History className="h-3 w-3" /> History
                              </Button>
                              {asset.status === "Available" && (
                                <Button
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenAllocate(asset);
                                  }}
                                >
                                  Allocate
                                </Button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground text-sm">
                    No assets match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              <Plus className="h-5 w-5 text-primary" />
              Register Asset
            </h2>

            <form onSubmit={handleRegisterAsset} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="asset-name">Asset Name *</Label>
                <Input
                  id="asset-name"
                  required
                  placeholder="e.g. Dell UltraSharp 32\"
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
                    placeholder="e.g. AF-0130"
                    value={assetTag}
                    onChange={(e) => setAssetTag(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="asset-value">Value (INR)</Label>
                  <Input
                    id="asset-value"
                    placeholder="e.g. 78000"
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
                <Button type="submit">Confirm Registration</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* 2. Edit Asset Modal */}
      {showEditModal && activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <PenSquare className="h-5 w-5 text-primary" />
              Edit Asset — {activeAsset.tag}
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="edit-name">Asset Name *</Label>
                <Input
                  id="edit-name"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="edit-category">Category</Label>
                  <select
                    id="edit-category"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as AssetCategory)}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-value">Value (INR)</Label>
                  <Input
                    id="edit-value"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="edit-dept">Department</Label>
                  <select
                    id="edit-dept"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={editDept}
                    onChange={(e) => setEditDept(e.target.value)}
                  >
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as AssetStatus)}
                  >
                    <option value="Available">Available</option>
                    <option value="Allocated">Allocated</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* 3. Allocate Modal */}
      {showAllocateModal && activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowAllocateModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Allocate Asset
            </h2>

            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              Allocating: <strong>{activeAsset.name}</strong> ({activeAsset.tag})
            </div>

            <form onSubmit={handleAllocateSubmit} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="alloc-emp">Select Employee *</Label>
                <select
                  id="alloc-emp"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                  value={allocEmpId}
                  onChange={(e) => setAllocEmpId(e.target.value)}
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
                <Button type="button" variant="outline" onClick={() => setShowAllocateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Confirm Allocation</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* 4. History Modal */}
      {showHistoryModal && activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowHistoryModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Asset History — {activeAsset.tag}
            </h2>

            <div className="text-xs text-muted-foreground mb-1">
              Asset: <strong className="text-foreground">{activeAsset.name}</strong>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-3.5 pr-2">
              {mockDb.getHistory(activeAsset.tag).map((event) => (
                <div key={event.id} className="relative pl-5 border-l border-border pb-1">
                  <div className="absolute left-[-4.5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{event.action}</span>
                    <span className="text-[10px] text-muted-foreground">{event.date}</span>
                  </div>
                  {event.notes && (
                    <div className="text-xs text-muted-foreground mt-0.5 font-normal leading-relaxed">
                      {event.notes}
                    </div>
                  )}
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    by {event.performedBy}
                  </div>
                </div>
              ))}
              {mockDb.getHistory(activeAsset.tag).length === 0 && (
                <div className="text-center text-xs py-6 text-muted-foreground">
                  No logs recorded for this asset.
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setShowHistoryModal(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
