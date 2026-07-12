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
import { G as Building2, J as ArrowLeftRight, M as CircleX, P as CircleCheck, U as CalendarDays, a as User, k as Clock, s as TriangleAlert, t as X, v as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/allocation-0rBISJ5X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var allocStatusColor = {
	Active: "bg-success/10 text-success border-success/20",
	Overdue: "bg-destructive/10 text-destructive border-destructive/20",
	Returned: "bg-muted text-muted-foreground border-border"
};
var transferStatusColor = {
	Pending: "bg-warning/10 text-warning-foreground border-warning/20",
	Approved: "bg-success/10 text-success border-success/20",
	Rejected: "bg-destructive/10 text-destructive border-destructive/20"
};
function AllocationPage() {
	const [tab, setTab] = (0, import_react.useState)("allocations");
	const [allocations, setAllocations] = (0, import_react.useState)(() => mockDb.getAllocations());
	const [transfers, setTransfers] = (0, import_react.useState)(() => mockDb.getTransfers());
	const [assets, setAssets] = (0, import_react.useState)(() => mockDb.getAssets());
	const [employees] = (0, import_react.useState)(() => mockDb.getEmployees());
	const [showAllocModal, setShowAllocModal] = (0, import_react.useState)(false);
	const [showTransferModal, setShowTransferModal] = (0, import_react.useState)(false);
	const [allocAssetTag, setAllocAssetTag] = (0, import_react.useState)("");
	const [allocEmployeeId, setAllocEmployeeId] = (0, import_react.useState)("");
	const [allocDueDate, setAllocDueDate] = (0, import_react.useState)("");
	const [transferAssetTag, setTransferAssetTag] = (0, import_react.useState)("");
	const [transferToDept, setTransferToDept] = (0, import_react.useState)("Finance");
	const [transferReason, setTransferReason] = (0, import_react.useState)("");
	const availableAssets = assets.filter((a) => a.status === "Available");
	const allocatedAssets = assets.filter((a) => a.status === "Allocated");
	const handleCreateAllocation = (e) => {
		e.preventDefault();
		if (!allocAssetTag || !allocEmployeeId || !allocDueDate) {
			toast.error("Please fill in all fields.");
			return;
		}
		const selectedAsset = assets.find((a) => a.tag === allocAssetTag);
		const selectedEmployee = employees.find((emp) => emp.id === allocEmployeeId);
		const updatedAllocs = [{
			id: `AL-${Math.floor(100 + Math.random() * 900)}`,
			tag: allocAssetTag,
			name: selectedAsset.name,
			employee: selectedEmployee.name,
			dept: selectedEmployee.dept,
			allocatedOn: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			dueBack: allocDueDate,
			status: "Active"
		}, ...allocations];
		setAllocations(updatedAllocs);
		mockDb.saveAllocations(updatedAllocs);
		const updatedAssets = assets.map((a) => a.tag === allocAssetTag ? {
			...a,
			status: "Allocated",
			assignedTo: selectedEmployee.name
		} : a);
		setAssets(updatedAssets);
		mockDb.saveAssets(updatedAssets);
		toast.success(`Allocated ${selectedAsset.name} to ${selectedEmployee.name}!`);
		setShowAllocModal(false);
		setAllocAssetTag("");
		setAllocEmployeeId("");
		setAllocDueDate("");
	};
	const handleRequestTransfer = (e) => {
		e.preventDefault();
		if (!transferAssetTag || !transferReason) {
			toast.error("Please fill in all fields.");
			return;
		}
		const selectedAsset = assets.find((a) => a.tag === transferAssetTag);
		const updatedTransfers = [{
			id: `TR-${Math.floor(100 + Math.random() * 900)}`,
			tag: transferAssetTag,
			name: selectedAsset.name,
			fromDept: selectedAsset.dept,
			toDept: transferToDept,
			requestedBy: selectedAsset.assignedTo !== "—" ? selectedAsset.assignedTo : "Admin",
			reason: transferReason,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			status: "Pending"
		}, ...transfers];
		setTransfers(updatedTransfers);
		mockDb.saveTransfers(updatedTransfers);
		toast.success(`Transfer request submitted for ${selectedAsset.name}!`);
		setShowTransferModal(false);
		setTransferAssetTag("");
		setTransferReason("");
	};
	const handleTransferDecision = (id, decision) => {
		const updatedTransfers = transfers.map((t) => {
			if (t.id !== id) return t;
			if (decision === "Approved") {
				const updatedAssets = assets.map((a) => a.tag === t.tag ? {
					...a,
					dept: t.toDept
				} : a);
				setAssets(updatedAssets);
				mockDb.saveAssets(updatedAssets);
				const updatedAllocs = allocations.map((al) => al.tag === t.tag && al.status === "Active" ? {
					...al,
					dept: t.toDept
				} : al);
				setAllocations(updatedAllocs);
				mockDb.saveAllocations(updatedAllocs);
			}
			return {
				...t,
				status: decision
			};
		});
		setTransfers(updatedTransfers);
		mockDb.saveTransfers(updatedTransfers);
		toast.success(`Transfer request ${decision.toLowerCase()}!`);
	};
	const overdueCount = allocations.filter((a) => a.status === "Overdue").length;
	const pendingCount = transfers.filter((t) => t.status === "Pending").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Allocation & Transfer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Assign assets, submit transfer requests, and view allocation history."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "gap-1.5",
						onClick: () => setShowTransferModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "h-4 w-4" }), " Request Transfer"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "gap-1.5",
						onClick: () => setShowAllocModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Allocation"]
					})]
				})]
			}),
			overdueCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-3 border-destructive/30 bg-destructive/5 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-destructive shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						overdueCount,
						" allocation",
						overdueCount > 1 ? "s" : ""
					] }), " are overdue for return — flagged for follow-up."]
				})]
			}),
			pendingCount > 0 && tab === "transfers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-3 border-warning/30 bg-warning/5 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-warning-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						pendingCount,
						" transfer request",
						pendingCount > 1 ? "s" : ""
					] }), " pending your approval."]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 border-b border-border",
				children: ["allocations", "transfers"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t),
					className: `px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: [
						t === "allocations" ? "Active Allocations" : "Transfer Requests",
						t === "allocations" && overdueCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "ml-2 bg-destructive/10 text-destructive border-destructive/20 text-[10px] h-4 px-1",
							children: overdueCount
						}),
						t === "transfers" && pendingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "ml-2 bg-warning/10 text-warning-foreground border-warning/20 text-[10px] h-4 px-1",
							children: pendingCount
						})
					]
				}, t))
			}),
			tab === "allocations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-[var(--shadow-card)] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Asset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell",
									children: "Assigned To"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell",
									children: "Department"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell",
									children: "Allocated On"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell",
									children: "Due Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: allocations.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-foreground",
											children: a.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-[11px] text-muted-foreground font-mono",
											children: a.tag
										})] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 hidden sm:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0",
												children: a.employee.split(" ").map((n) => n[0]).join("")
											}), a.employee]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground hidden md:table-cell",
										children: a.dept
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell",
										children: a.allocatedOn
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-xs hidden lg:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: a.status === "Overdue" ? "text-destructive font-semibold" : "text-muted-foreground",
											children: a.dueBack
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${allocStatusColor[a.status]}`,
											children: a.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: a.status !== "Returned" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "text-xs h-7",
											onClick: () => {
												const updatedAllocs = allocations.map((al) => al.id === a.id ? {
													...al,
													status: "Returned"
												} : al);
												setAllocations(updatedAllocs);
												mockDb.saveAllocations(updatedAllocs);
												const updatedAssets = assets.map((asset) => asset.tag === a.tag ? {
													...asset,
													status: "Available",
													assignedTo: "—"
												} : asset);
												setAssets(updatedAssets);
												mockDb.saveAssets(updatedAssets);
												toast.success(`Asset ${a.name} recalled!`);
											},
											children: "Recall"
										})
									})
								]
							}, a.id))
						})]
					})
				})
			}),
			tab === "transfers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: transfers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-xs font-mono bg-muted px-1.5 py-0.5 rounded",
											children: t.tag
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: t.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${transferStatusColor[t.status]}`,
											children: t.status
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-4 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3 w-3" }),
												t.fromDept,
												" → ",
												t.toDept
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), t.requestedBy]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3 w-3" }), t.date]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground italic",
									children: [
										"\"",
										t.reason,
										"\""
									]
								})
							]
						}), t.status === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "gap-1 text-xs border-destructive/40 text-destructive hover:bg-destructive/10",
								onClick: () => handleTransferDecision(t.id, "Rejected"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), " Reject"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "gap-1 text-xs bg-success text-success-foreground hover:bg-success/90",
								onClick: () => handleTransferDecision(t.id, "Approved"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " Approve"]
							})]
						})]
					})
				}, t.id))
			}),
			showAllocModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAllocModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-primary" }), "New Allocation"]
						}),
						availableAssets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-sm py-4 text-muted-foreground",
							children: "No available assets to allocate. Register an asset first!"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCreateAllocation,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "alloc-asset",
										children: "Select Asset *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "alloc-asset",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: allocAssetTag,
										onChange: (e) => setAllocAssetTag(e.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Asset --"
										}), availableAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: a.tag,
											children: [
												a.name,
												" (",
												a.tag,
												")"
											]
										}, a.tag))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "alloc-emp",
										children: "Select Employee *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "alloc-emp",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: allocEmployeeId,
										onChange: (e) => setAllocEmployeeId(e.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Employee --"
										}), employees.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: emp.id,
											children: [
												emp.name,
												" (",
												emp.dept,
												")"
											]
										}, emp.id))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "alloc-due",
										children: "Due Date *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "alloc-due",
										type: "date",
										required: true,
										value: allocDueDate,
										onChange: (e) => setAllocDueDate(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowAllocModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Allocate Asset"
									})]
								})
							]
						})
					]
				})
			}),
			showTransferModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowTransferModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "h-5 w-5 text-primary" }), "Request Transfer"]
						}),
						allocatedAssets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-sm py-4 text-muted-foreground",
							children: "No active allocated assets to transfer."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleRequestTransfer,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "trans-asset",
										children: "Select Asset *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "trans-asset",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: transferAssetTag,
										onChange: (e) => setTransferAssetTag(e.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Asset --"
										}), allocatedAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: a.tag,
											children: [
												a.name,
												" (",
												a.tag,
												") — ",
												a.dept
											]
										}, a.tag))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "trans-dept",
										children: "Transfer to Department"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "trans-dept",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: transferToDept,
										onChange: (e) => setTransferToDept(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Information Technology",
												children: "IT"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Human Resources",
												children: "HR"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Finance",
												children: "Finance"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Facilities",
												children: "Facilities"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Operations",
												children: "Operations"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Marketing",
												children: "Marketing"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "trans-reason",
										children: "Transfer Reason *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "trans-reason",
										required: true,
										placeholder: "e.g. Employee transferring departments",
										value: transferReason,
										onChange: (e) => setTransferReason(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowTransferModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Submit Request"
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
export { AllocationPage as component };
