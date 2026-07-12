import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockDb, AppRole, Department, Employee } from "@/lib/mock-db";
import {
  Building2,
  Users,
  Plus,
  Search,
  Mail,
  Shield,
  UserPlus,
  ChevronRight,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/organization")({
  head: () => ({ meta: [{ title: "Organization Setup — AssetFlow" }] }),
  component: OrganizationPage,
});

const roleBadge: Record<AppRole, string> = {
  admin: "bg-destructive/10 text-destructive border-destructive/20",
  manager: "bg-warning/10 text-warning-foreground border-warning/20",
  employee: "bg-primary/10 text-primary border-primary/20",
};

function OrganizationPage() {
  const [departments, setDepartments] = useState<Department[]>(() => mockDb.getDepartments());
  const [employees, setEmployees] = useState<Employee[]>(() => mockDb.getEmployees());

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Modals Visibility
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Modals Form State
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptHead, setNewDeptHead] = useState("");

  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empRole, setEmpRole] = useState<AppRole>("employee");
  const [empDept, setEmpDept] = useState("Information Technology");

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || !newDeptHead) {
      toast.error("Please fill in all fields.");
      return;
    }

    const colors = [
      "bg-blue-500/10 text-blue-600 border-blue-200",
      "bg-purple-500/10 text-purple-600 border-purple-200",
      "bg-green-500/10 text-green-600 border-green-200",
      "bg-orange-500/10 text-orange-600 border-orange-200",
      "bg-pink-500/10 text-pink-600 border-pink-200",
      "bg-cyan-500/10 text-cyan-600 border-cyan-200",
    ];

    const newDept: Department = {
      id: Date.now(),
      name: newDeptName,
      head: newDeptHead,
      employees: 0,
      assets: 0,
      color: colors[departments.length % colors.length],
    };

    const updated = [...departments, newDept];
    setDepartments(updated);
    mockDb.saveDepartments(updated);

    toast.success(`Department "${newDeptName}" added successfully!`);
    setShowDeptModal(false);
    setNewDeptName("");
    setNewDeptHead("");
  };

  const handleInviteEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !empEmail) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newEmp: Employee = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: empName,
      email: empEmail,
      role: empRole,
      dept: empDept,
      joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };

    // Save employee
    const updatedEmployees = [...employees, newEmp];
    setEmployees(updatedEmployees);
    mockDb.saveEmployees(updatedEmployees);

    // Update department employees count
    const updatedDepts = departments.map((d) =>
      d.name === empDept ? { ...d, employees: d.employees + 1 } : d
    );
    setDepartments(updatedDepts);
    mockDb.saveDepartments(updatedDepts);

    toast.success(`Employee "${empName}" invited successfully!`);
    setShowEmployeeModal(false);
    setEmpName("");
    setEmpEmail("");
    setEmpRole("employee");
  };

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept ? e.dept === selectedDept : true;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Organization Setup</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage departments, categories, and employee accounts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5" onClick={() => setShowDeptModal(true)}>
            <Plus className="h-4 w-4" /> Add Department
          </Button>
          <Button className="gap-1.5" onClick={() => setShowEmployeeModal(true)}>
            <UserPlus className="h-4 w-4" /> Invite Employee
          </Button>
        </div>
      </div>

      {/* Department Cards */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Departments ({departments.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() =>
                setSelectedDept(selectedDept === dept.name ? null : dept.name)
              }
              className={`text-left w-full rounded-xl border p-4 transition-all shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] ${
                selectedDept === dept.name
                  ? "ring-2 ring-primary bg-primary/5"
                  : "bg-card hover:bg-accent/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${dept.color}`}
                >
                  <Building2 className="h-4 w-4" />
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-muted-foreground mt-1 shrink-0 transition-transform ${
                    selectedDept === dept.name ? "rotate-90 text-primary" : ""
                  }`}
                />
              </div>
              <div className="mt-3">
                <div className="font-semibold text-foreground text-sm">{dept.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Head: {dept.head}</div>
              </div>
              <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {dept.employees} employees
                </span>
                <span>{dept.assets} assets</span>
              </div>
            </button>
          ))}
        </div>
        {selectedDept && (
          <p className="text-xs text-primary mt-2">
            Showing employees in <strong>{selectedDept}</strong> — click again to clear filter
          </p>
        )}
      </div>

      {/* Employee Table */}
      <Card className="shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Employees
            <Badge variant="secondary" className="ml-1">{filtered.length}</Badge>
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search name, email, dept…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Employee</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Department</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs shrink-0">
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-foreground flex items-center gap-1.5">
                          {emp.name}
                          {emp.role === "admin" && (
                            <Shield className="h-3 w-3 text-destructive" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{emp.dept}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${roleBadge[emp.role]}`}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">{emp.joined}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <Mail className="h-3 w-3" />
                      <span className="hidden sm:inline">Email</span>
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground text-sm">
                    No employees match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Department Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowDeptModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Add Department
            </h2>

            <form onSubmit={handleAddDepartment} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="dept-name">Department Name *</Label>
                <Input
                  id="dept-name"
                  required
                  placeholder="e.g. Engineering"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="dept-head">Department Head *</Label>
                <Input
                  id="dept-head"
                  required
                  placeholder="e.g. Vikram Tech"
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowDeptModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Department</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Invite Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowEmployeeModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Invite Employee
            </h2>

            <form onSubmit={handleInviteEmployee} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <Label htmlFor="emp-name">Full Name *</Label>
                <Input
                  id="emp-name"
                  required
                  placeholder="e.g. Priya Shah"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="emp-email">Email Address *</Label>
                <Input
                  id="emp-email"
                  type="email"
                  required
                  placeholder="e.g. priya@company.com"
                  value={empEmail}
                  onChange={(e) => setEmpEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="emp-role">Role</Label>
                  <select
                    id="emp-role"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value as AppRole)}
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="emp-dept">Department</Label>
                  <select
                    id="emp-dept"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    value={empDept}
                    onChange={(e) => setEmpDept(e.target.value)}
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowEmployeeModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Invite Employee</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
