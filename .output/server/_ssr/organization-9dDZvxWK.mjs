import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as mockDb } from "./mock-db-C-hW-3bO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as Building2, L as ChevronRight, S as Mail, h as Search, i as Users, m as Shield, o as UserPlus, t as X, v as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/organization-9dDZvxWK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roleBadge = {
	admin: "bg-destructive/10 text-destructive border-destructive/20",
	manager: "bg-warning/10 text-warning-foreground border-warning/20",
	employee: "bg-primary/10 text-primary border-primary/20"
};
function OrganizationPage() {
	const [departments, setDepartments] = (0, import_react.useState)(() => mockDb.getDepartments());
	const [employees, setEmployees] = (0, import_react.useState)(() => mockDb.getEmployees());
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedDept, setSelectedDept] = (0, import_react.useState)(null);
	const [showDeptModal, setShowDeptModal] = (0, import_react.useState)(false);
	const [showEmployeeModal, setShowEmployeeModal] = (0, import_react.useState)(false);
	const [newDeptName, setNewDeptName] = (0, import_react.useState)("");
	const [newDeptHead, setNewDeptHead] = (0, import_react.useState)("");
	const [empName, setEmpName] = (0, import_react.useState)("");
	const [empEmail, setEmpEmail] = (0, import_react.useState)("");
	const [empRole, setEmpRole] = (0, import_react.useState)("employee");
	const [empDept, setEmpDept] = (0, import_react.useState)("Information Technology");
	const handleAddDepartment = (e) => {
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
			"bg-cyan-500/10 text-cyan-600 border-cyan-200"
		];
		const newDept = {
			id: Date.now(),
			name: newDeptName,
			head: newDeptHead,
			employees: 0,
			assets: 0,
			color: colors[departments.length % colors.length]
		};
		const updated = [...departments, newDept];
		setDepartments(updated);
		mockDb.saveDepartments(updated);
		toast.success(`Department "${newDeptName}" added successfully!`);
		setShowDeptModal(false);
		setNewDeptName("");
		setNewDeptHead("");
	};
	const handleInviteEmployee = (e) => {
		e.preventDefault();
		if (!empName || !empEmail) {
			toast.error("Please fill in all fields.");
			return;
		}
		const newEmp = {
			id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
			name: empName,
			email: empEmail,
			role: empRole,
			dept: empDept,
			joined: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric"
			})
		};
		const updatedEmployees = [...employees, newEmp];
		setEmployees(updatedEmployees);
		mockDb.saveEmployees(updatedEmployees);
		const updatedDepts = departments.map((d) => d.name === empDept ? {
			...d,
			employees: d.employees + 1
		} : d);
		setDepartments(updatedDepts);
		mockDb.saveDepartments(updatedDepts);
		toast.success(`Employee "${empName}" invited successfully!`);
		setShowEmployeeModal(false);
		setEmpName("");
		setEmpEmail("");
		setEmpRole("employee");
	};
	const filtered = employees.filter((e) => {
		const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase());
		const matchesDept = selectedDept ? e.dept === selectedDept : true;
		return matchesSearch && matchesDept;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Organization Setup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Manage departments, categories, and employee accounts."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "gap-1.5",
						onClick: () => setShowDeptModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Department"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "gap-1.5",
						onClick: () => setShowEmployeeModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Invite Employee"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
					children: [
						"Departments (",
						departments.length,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
					children: departments.map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedDept(selectedDept === dept.name ? null : dept.name),
						className: `text-left w-full rounded-xl border p-4 transition-all shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] ${selectedDept === dept.name ? "ring-2 ring-primary bg-primary/5" : "bg-card hover:bg-accent/30"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${dept.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 text-muted-foreground mt-1 shrink-0 transition-transform ${selectedDept === dept.name ? "rotate-90 text-primary" : ""}` })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-foreground text-sm",
									children: dept.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: ["Head: ", dept.head]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-4 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
										" ",
										dept.employees,
										" employees"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [dept.assets, " assets"] })]
							})
						]
					}, dept.id))
				}),
				selectedDept && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-primary mt-2",
					children: [
						"Showing employees in ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedDept }),
						" — click again to clear filter"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-[var(--shadow-card)] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-border flex items-center justify-between gap-3 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-semibold text-foreground flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
							"Employees",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "ml-1",
								children: filtered.length
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-9",
							placeholder: "Search name, email, dept…",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Employee"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell",
									children: "Department"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell",
									children: "Joined"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filtered.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs shrink-0",
												children: emp.name.split(" ").map((n) => n[0]).join("")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-medium text-foreground flex items-center gap-1.5",
												children: [emp.name, emp.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3 text-destructive" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: emp.email
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground hidden sm:table-cell",
										children: emp.dept
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 hidden md:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${roleBadge[emp.role]}`,
											children: emp.role
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell",
										children: emp.joined
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-7 gap-1 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Email"
											})]
										})
									})
								]
							}, emp.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 5,
								className: "px-4 py-10 text-center text-muted-foreground text-sm",
								children: "No employees match your search."
							}) })]
						})]
					})
				})]
			}),
			showDeptModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowDeptModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5 text-primary" }), "Add Department"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAddDepartment,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "dept-name",
										children: "Department Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "dept-name",
										required: true,
										placeholder: "e.g. Engineering",
										value: newDeptName,
										onChange: (e) => setNewDeptName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "dept-head",
										children: "Department Head *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "dept-head",
										required: true,
										placeholder: "e.g. Vikram Tech",
										value: newDeptHead,
										onChange: (e) => setNewDeptHead(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowDeptModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Add Department"
									})]
								})
							]
						})
					]
				})
			}),
			showEmployeeModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowEmployeeModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5 text-primary" }), "Invite Employee"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleInviteEmployee,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "emp-name",
										children: "Full Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "emp-name",
										required: true,
										placeholder: "e.g. Priya Shah",
										value: empName,
										onChange: (e) => setEmpName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "emp-email",
										children: "Email Address *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "emp-email",
										type: "email",
										required: true,
										placeholder: "e.g. priya@company.com",
										value: empEmail,
										onChange: (e) => setEmpEmail(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "emp-role",
											children: "Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "emp-role",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: empRole,
											onChange: (e) => setEmpRole(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "employee",
													children: "Employee"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "manager",
													children: "Manager"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "admin",
													children: "Admin"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "emp-dept",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: "emp-dept",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: empDept,
											onChange: (e) => setEmpDept(e.target.value),
											children: departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: d.name,
												children: d.name
											}, d.id))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowEmployeeModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Invite Employee"
									})]
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { OrganizationPage as component };
