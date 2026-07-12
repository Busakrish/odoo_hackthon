// Mock Database Helper for Offline Local Storage Persistence

export type AppRole = "admin" | "manager" | "employee";
export type AssetStatus = "Available" | "Allocated" | "Maintenance" | "Retired";
export type AssetCategory = "Electronics" | "Furniture" | "Vehicles" | "Equipment";
export type AllocStatus = "Active" | "Overdue" | "Returned";
export type TransferStatus = "Pending" | "Approved" | "Rejected";
export type TicketStatus = "Pending" | "Approved" | "In Progress" | "Resolved";
export type Priority = "Low" | "Medium" | "High" | "Critical";
export type AuditStatus = "Match" | "Discrepancy" | "Unverified";

export interface Department {
  id: number;
  name: string;
  head: string;
  employees: number;
  assets: number;
  color: string;
}

export interface Employee {
  id: string;
  name: string;
  role: AppRole;
  dept: string;
  email: string;
  joined: string;
}

export interface Asset {
  tag: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  dept: string;
  assignedTo: string;
  purchased: string;
  value: string;
}

export interface Allocation {
  id: string;
  tag: string;
  name: string;
  employee: string;
  dept: string;
  allocatedOn: string;
  dueBack: string;
  status: AllocStatus;
}

export interface Transfer {
  id: string;
  tag: string;
  name: string;
  fromDept: string;
  toDept: string;
  requestedBy: string;
  reason: string;
  date: string;
  status: TransferStatus;
}

export interface Booking {
  id: string;
  resourceId: string;
  day: number;
  hour: number;
  duration: number;
  bookedBy: string;
  label: string;
  mine: boolean;
}

export interface Ticket {
  id: string;
  tag: string;
  asset: string;
  issue: string;
  priority: Priority;
  status: TicketStatus;
  raisedBy: string;
  technician: string;
  date: string;
}

export interface AuditItem {
  tag: string;
  name: string;
  expectedLocation: string;
  actualLocation: string;
  expectedDept: string;
  actualDept: string;
  auditStatus: AuditStatus;
  verifiedBy: string;
}

export interface AssetHistoryEvent {
  id: string;
  tag: string;
  action: string;
  performedBy: string;
  date: string;
  notes?: string;
}

// Initial Data
const defaultDepts: Department[] = [
  { id: 1, name: "Information Technology", head: "Arjun Mehta", employees: 18, assets: 52, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  { id: 2, name: "Human Resources", head: "Sneha Patel", employees: 9, assets: 14, color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  { id: 3, name: "Finance", head: "Vikram Rao", employees: 12, assets: 21, color: "bg-green-500/10 text-green-600 border-green-200" },
  { id: 4, name: "Facilities", head: "Meera Nair", employees: 7, assets: 38, color: "bg-orange-500/10 text-orange-600 border-orange-200" },
  { id: 5, name: "Operations", head: "Rahul Singh", employees: 22, assets: 45, color: "bg-cyan-500/10 text-cyan-600 border-cyan-200" },
  { id: 6, name: "Marketing", head: "Divya Sharma", employees: 11, assets: 19, color: "bg-pink-500/10 text-pink-600 border-pink-200" },
];

const defaultEmployees: Employee[] = [
  { id: "EMP-001", name: "Arjun Mehta", role: "admin", dept: "Information Technology", email: "arjun@company.com", joined: "Jan 2022" },
  { id: "EMP-002", name: "Priya Shah", role: "employee", dept: "Information Technology", email: "priya@company.com", joined: "Mar 2022" },
  { id: "EMP-003", name: "Sneha Patel", role: "manager", dept: "Human Resources", email: "sneha@company.com", joined: "Feb 2021" },
  { id: "EMP-004", name: "Vikram Rao", role: "manager", dept: "Finance", email: "vikram@company.com", joined: "Jun 2020" },
  { id: "EMP-005", name: "Meera Nair", role: "manager", dept: "Facilities", email: "meera@company.com", joined: "Sep 2021" },
  { id: "EMP-006", name: "Rahul Singh", role: "employee", dept: "Operations", email: "rahul@company.com", joined: "Nov 2022" },
  { id: "EMP-007", name: "Divya Sharma", role: "manager", dept: "Marketing", email: "divya@company.com", joined: "Apr 2021" },
  { id: "EMP-008", name: "Karan Joshi", role: "employee", dept: "Finance", email: "karan@company.com", joined: "Jul 2023" },
  { id: "EMP-009", name: "Ananya Reddy", role: "employee", dept: "Information Technology", email: "ananya@company.com", joined: "Jan 2023" },
  { id: "EMP-010", name: "Siddharth Iyer", role: "employee", dept: "Operations", email: "siddharth@company.com", joined: "Mar 2023" },
];

const defaultAssets: Asset[] = [
  { tag: "AF-0001", name: "Dell Latitude 5520", category: "Electronics", status: "Allocated", dept: "IT", assignedTo: "Priya Shah", purchased: "Jan 2023", value: "82000" },
  { tag: "AF-0002", name: "HP LaserJet Pro", category: "Electronics", status: "Available", dept: "Finance", assignedTo: "—", purchased: "Mar 2022", value: "34000" },
  { tag: "AF-0003", name: "Herman Miller Chair", category: "Furniture", status: "Allocated", dept: "HR", assignedTo: "Sneha Patel", purchased: "Jun 2021", value: "42000" },
  { tag: "AF-0004", name: "Toyota Innova (MH-01-AB-1234)", category: "Vehicles", status: "Available", dept: "Facilities", assignedTo: "—", purchased: "Sep 2020", value: "1450000" },
  { tag: "AF-0005", name: "ASUS ProArt Monitor 27\"", category: "Electronics", status: "Maintenance", dept: "IT", assignedTo: "Karan Joshi", purchased: "Nov 2022", value: "56000" },
  { tag: "AF-0006", name: "Boardroom Table (8-seater)", category: "Furniture", status: "Available", dept: "Operations", assignedTo: "—", purchased: "Feb 2020", value: "120000" },
  { tag: "AF-0007", name: "Epson Projector EB-2250U", category: "Electronics", status: "Available", dept: "Marketing", assignedTo: "—", purchased: "Aug 2022", value: "65000" },
  { tag: "AF-0008", name: "Industrial Generator 15kVA", category: "Equipment", status: "Available", dept: "Facilities", assignedTo: "—", purchased: "Jan 2019", value: "240000" },
  { tag: "AF-0009", name: "MacBook Pro M3", category: "Electronics", status: "Allocated", dept: "Marketing", assignedTo: "Divya Sharma", purchased: "Apr 2024", value: "195000" },
  { tag: "AF-0010", name: "Maruti Suzuki Eeco (MH-02-CD-5678)", category: "Vehicles", status: "Allocated", dept: "Facilities", assignedTo: "Meera Nair", purchased: "Mar 2021", value: "750000" },
  { tag: "AF-0011", name: "Ergonomic Standing Desk", category: "Furniture", status: "Available", dept: "IT", assignedTo: "—", purchased: "Dec 2022", value: "28000" },
  { tag: "AF-0012", name: "Cisco IP Phone 8845", category: "Electronics", status: "Retired", dept: "Operations", assignedTo: "—", purchased: "Jan 2018", value: "12000" },
];

const defaultAllocations: Allocation[] = [
  { id: "AL-001", tag: "AF-0001", name: "Dell Latitude 5520", employee: "Priya Shah", dept: "IT", allocatedOn: "2025-06-12", dueBack: "2025-12-12", status: "Active" },
  { id: "AL-002", tag: "AF-0003", name: "Herman Miller Chair", employee: "Sneha Patel", dept: "HR", allocatedOn: "2025-03-04", dueBack: "2026-03-04", status: "Active" },
  { id: "AL-003", tag: "AF-0009", name: "MacBook Pro M3", employee: "Divya Sharma", dept: "Marketing", allocatedOn: "2025-05-01", dueBack: "2026-05-01", status: "Active" },
  { id: "AL-004", tag: "AF-0010", name: "Maruti Eeco", employee: "Meera Nair", dept: "Facilities", allocatedOn: "2025-01-15", dueBack: "2026-01-15", status: "Active" },
  { id: "AL-005", tag: "AF-0033", name: "Cisco Switch 24-Port", employee: "Arjun Mehta", dept: "IT", allocatedOn: "2024-11-10", dueBack: "2025-06-10", status: "Overdue" },
  { id: "AL-006", tag: "AF-0019", name: "iPad Pro 12.9\"", employee: "Rahul Singh", dept: "Operations", allocatedOn: "2024-04-22", dueBack: "2025-04-22", status: "Overdue" },
  { id: "AL-007", tag: "AF-0007", name: "Epson Projector", employee: "Karan Joshi", dept: "Finance", allocatedOn: "2025-01-05", dueBack: "2025-04-05", status: "Returned" },
];

const defaultTransfers: Transfer[] = [
  { id: "TR-001", tag: "AF-0033", name: "Cisco Switch 24-Port", fromDept: "IT", toDept: "Facilities", requestedBy: "Meera Nair", reason: "Network expansion in Block B", date: "2025-07-10", status: "Pending" },
  { id: "TR-002", tag: "AF-0007", name: "Epson Projector", fromDept: "Finance", toDept: "Marketing", requestedBy: "Divya Sharma", reason: "Campaign presentation setup", date: "2025-07-08", status: "Pending" },
  { id: "TR-003", tag: "AF-0019", name: "iPad Pro 12.9\"", fromDept: "Operations", toDept: "HR", requestedBy: "Sneha Patel", reason: "Onboarding use", date: "2025-07-05", status: "Approved" },
  { id: "TR-004", tag: "AF-0044", name: "Sony Camcorder", fromDept: "Marketing", toDept: "IT", requestedBy: "Arjun Mehta", reason: "System documentation video", date: "2025-07-01", status: "Rejected" },
];

const defaultBookings: Booking[] = [
  { id: "B1", resourceId: "R1", day: 0, hour: 10, duration: 2, bookedBy: "Arjun Mehta", label: "Sprint Planning", mine: false },
  { id: "B2", resourceId: "R1", day: 2, hour: 14, duration: 1, bookedBy: "You", label: "Product Review", mine: true },
  { id: "B3", resourceId: "R2", day: 1, hour: 11, duration: 3, bookedBy: "Sneha Patel", label: "All-Hands Meeting", mine: false },
  { id: "B4", resourceId: "R3", day: 3, hour: 9, duration: 2, bookedBy: "Divya Sharma", label: "Campaign Presentation", mine: false },
  { id: "B5", resourceId: "R4", day: 4, hour: 13, duration: 1, bookedBy: "You", label: "Client Demo", mine: true },
  { id: "B6", resourceId: "R5", day: 0, hour: 9, duration: 4, bookedBy: "Rahul Singh", label: "Induction Training", mine: false },
  { id: "B7", resourceId: "R1", day: 4, hour: 10, duration: 1, bookedBy: "Vikram Rao", label: "Budget Review", mine: false },
];

const defaultTickets: Ticket[] = [
  { id: "MR-001", tag: "AF-0005", asset: "ASUS ProArt Monitor 27\"", issue: "Screen flickering at 60Hz refresh rate", priority: "High", status: "In Progress", raisedBy: "Karan Joshi", technician: "Vikram Tech", date: "Jul 8" },
  { id: "MR-002", tag: "AF-0022", asset: "UPS 10kVA Server Room", issue: "Battery backup dropping to 8 min", priority: "Critical", status: "Pending", raisedBy: "Arjun Mehta", technician: "Unassigned", date: "Jul 10" },
  { id: "MR-003", tag: "AF-0047", asset: "Air Conditioner — Hall C", issue: "Cooling inefficient, thermostat fault", priority: "Medium", status: "Approved", raisedBy: "Meera Nair", technician: "CoolTech Pvt Ltd", date: "Jul 6" },
  { id: "MR-004", tag: "AF-0031", asset: "Fingerprint Scanner — Gate 2", issue: "Reader not recognizing enrolled prints", priority: "High", status: "Pending", raisedBy: "Rahul Singh", technician: "Unassigned", date: "Jul 11" },
  { id: "MR-005", tag: "AF-0014", asset: "Laptop AF-0114 (Priya)", issue: "Charging port loose, intermittent", priority: "Low", status: "Resolved", raisedBy: "Priya Shah", technician: "Vikram Tech", date: "Jul 3" },
  { id: "MR-006", tag: "AF-0062", asset: "Epson Projector EB-2250U", issue: "Lamp replacement required", priority: "Medium", status: "Resolved", raisedBy: "Divya Sharma", technician: "ServiceDesk", date: "Jun 28" },
  { id: "MR-007", tag: "AF-0033", asset: "Cisco Switch 24-Port", issue: "Ports 12-16 not negotiating at 1G", priority: "High", status: "In Progress", raisedBy: "Arjun Mehta", technician: "NetSupport", date: "Jul 9" },
  { id: "MR-008", tag: "AF-0055", asset: "Office Printer Canon MF", issue: "Paper jam — rear tray", priority: "Low", status: "Approved", raisedBy: "Sneha Patel", technician: "PrintFix", date: "Jul 7" },
];

const defaultAuditItems: AuditItem[] = [
  { tag: "AF-0001", name: "Dell Latitude 5520", expectedLocation: "IT — Desk 12", actualLocation: "IT — Desk 12", expectedDept: "IT", actualDept: "IT", auditStatus: "Match", verifiedBy: "Arjun Mehta" },
  { tag: "AF-0002", name: "HP LaserJet Pro", expectedLocation: "Finance — Print Room", actualLocation: "Finance — Print Room", expectedDept: "Finance", actualDept: "Finance", auditStatus: "Match", verifiedBy: "Sneha Patel" },
  { tag: "AF-0003", name: "Herman Miller Chair", expectedLocation: "HR — Cabin 3", actualLocation: "HR — Cabin 3", expectedDept: "HR", actualDept: "HR", auditStatus: "Match", verifiedBy: "Sneha Patel" },
  { tag: "AF-0004", name: "Toyota Innova", expectedLocation: "Basement Parking B1", actualLocation: "Street Parking — Block A", expectedDept: "Facilities", actualDept: "Facilities", auditStatus: "Discrepancy", verifiedBy: "Meera Nair" },
  { tag: "AF-0005", name: "ASUS ProArt Monitor", expectedLocation: "IT — Lab B", actualLocation: "IT — Lab B", expectedDept: "IT", actualDept: "IT", auditStatus: "Match", verifiedBy: "Karan Joshi" },
  { tag: "AF-0007", name: "Epson Projector EB-2250U", expectedLocation: "Marketing — AV Closet", actualLocation: "Finance — Conference Room", expectedDept: "Marketing", actualDept: "Finance", auditStatus: "Discrepancy", verifiedBy: "Divya Sharma" },
  { tag: "AF-0008", name: "Industrial Generator", expectedLocation: "Basement — Gen Room", actualLocation: "Basement — Gen Room", expectedDept: "Facilities", actualDept: "Facilities", auditStatus: "Match", verifiedBy: "Meera Nair" },
  { tag: "AF-0011", name: "Ergonomic Standing Desk", expectedLocation: "IT — Desk 5", actualLocation: "—", expectedDept: "IT", actualDept: "—", auditStatus: "Unverified", verifiedBy: "—" },
];

export const mockDb = {
  getDepartments(): Department[] {
    if (typeof window === "undefined") return defaultDepts;
    const data = localStorage.getItem("mock_departments");
    if (!data) {
      localStorage.setItem("mock_departments", JSON.stringify(defaultDepts));
      return defaultDepts;
    }
    return JSON.parse(data);
  },
  saveDepartments(data: Department[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_departments", JSON.stringify(data));
    }
  },

  getEmployees(): Employee[] {
    if (typeof window === "undefined") return defaultEmployees;
    const data = localStorage.getItem("mock_employees");
    if (!data) {
      localStorage.setItem("mock_employees", JSON.stringify(defaultEmployees));
      return defaultEmployees;
    }
    return JSON.parse(data);
  },
  saveEmployees(data: Employee[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_employees", JSON.stringify(data));
    }
  },

  getAssets(): Asset[] {
    if (typeof window === "undefined") return defaultAssets;
    const data = localStorage.getItem("mock_assets");
    if (!data) {
      localStorage.setItem("mock_assets", JSON.stringify(defaultAssets));
      return defaultAssets;
    }
    return JSON.parse(data);
  },
  saveAssets(data: Asset[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_assets", JSON.stringify(data));
    }
  },

  getAllocations(): Allocation[] {
    if (typeof window === "undefined") return defaultAllocations;
    const data = localStorage.getItem("mock_allocations");
    if (!data) {
      localStorage.setItem("mock_allocations", JSON.stringify(defaultAllocations));
      return defaultAllocations;
    }
    return JSON.parse(data);
  },
  saveAllocations(data: Allocation[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_allocations", JSON.stringify(data));
    }
  },

  getTransfers(): Transfer[] {
    if (typeof window === "undefined") return defaultTransfers;
    const data = localStorage.getItem("mock_transfers");
    if (!data) {
      localStorage.setItem("mock_transfers", JSON.stringify(defaultTransfers));
      return defaultTransfers;
    }
    return JSON.parse(data);
  },
  saveTransfers(data: Transfer[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_transfers", JSON.stringify(data));
    }
  },

  getBookings(): Booking[] {
    if (typeof window === "undefined") return defaultBookings;
    const data = localStorage.getItem("mock_bookings");
    if (!data) {
      localStorage.setItem("mock_bookings", JSON.stringify(defaultBookings));
      return defaultBookings;
    }
    return JSON.parse(data);
  },
  saveBookings(data: Booking[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_bookings", JSON.stringify(data));
    }
  },

  getTickets(): Ticket[] {
    if (typeof window === "undefined") return defaultTickets;
    const data = localStorage.getItem("mock_tickets");
    if (!data) {
      localStorage.setItem("mock_tickets", JSON.stringify(defaultTickets));
      return defaultTickets;
    }
    return JSON.parse(data);
  },
  saveTickets(data: Ticket[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_tickets", JSON.stringify(data));
    }
  },

  getAuditItems(): AuditItem[] {
    if (typeof window === "undefined") return defaultAuditItems;
    const data = localStorage.getItem("mock_audit_items");
    if (!data) {
      localStorage.setItem("mock_audit_items", JSON.stringify(defaultAuditItems));
      return defaultAuditItems;
    }
    return JSON.parse(data);
  },
  saveAuditItems(data: AuditItem[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_audit_items", JSON.stringify(data));
    }
  },

  getHistory(tag: string): AssetHistoryEvent[] {
    if (typeof window === "undefined") return defaultHistory.filter((h) => h.tag === tag);
    const data = localStorage.getItem("mock_asset_history");
    let list: AssetHistoryEvent[] = [];
    if (!data) {
      localStorage.setItem("mock_asset_history", JSON.stringify(defaultHistory));
      list = defaultHistory;
    } else {
      list = JSON.parse(data);
    }
    return list.filter((h) => h.tag === tag);
  },

  addHistoryEvent(tag: string, action: string, performedBy: string, notes?: string) {
    if (typeof window === "undefined") return;
    const data = localStorage.getItem("mock_asset_history");
    const list: AssetHistoryEvent[] = data ? JSON.parse(data) : [...defaultHistory];
    const newEvent: AssetHistoryEvent = {
      id: `H-${Date.now()}`,
      tag,
      action,
      performedBy,
      date: new Date().toISOString().split("T")[0],
      notes,
    };
    list.unshift(newEvent);
    localStorage.setItem("mock_asset_history", JSON.stringify(list));
  },

  // CSV Exporter Utility
  downloadCsv(filename: string, headers: string[], rows: string[][]) {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

const defaultHistory: AssetHistoryEvent[] = [
  { id: "H-1", tag: "AF-0001", action: "Asset Registered", performedBy: "Admin", date: "2025-01-10", notes: "Dell Latitude registered with value ₹82,000" },
  { id: "H-2", tag: "AF-0001", action: "Allocated", performedBy: "Admin", date: "2025-06-12", notes: "Assigned to Priya Shah (IT department)" },
  { id: "H-3", tag: "AF-0003", action: "Asset Registered", performedBy: "Admin", date: "2025-02-15", notes: "Herman Miller Chair registered with value ₹42,000" },
  { id: "H-4", tag: "AF-0003", action: "Allocated", performedBy: "Admin", date: "2025-03-04", notes: "Assigned to Sneha Patel (HR department)" },
  { id: "H-5", tag: "AF-0005", action: "Asset Registered", performedBy: "Admin", date: "2025-01-20", notes: "ASUS ProArt Monitor registered" },
  { id: "H-6", tag: "AF-0005", action: "Allocated", performedBy: "Admin", date: "2025-03-01", notes: "Assigned to Karan Joshi" },
  { id: "H-7", tag: "AF-0005", action: "Maintenance Raised", performedBy: "Karan Joshi", date: "2025-07-08", notes: "Screen flickering issue reported" },
];
