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
import { D as History, H as Car, I as ChevronUp, T as Laptop, U as CalendarDays, Y as Armchair, f as SquarePen, h as Search, n as Wrench, p as SlidersHorizontal, t as X, v as Plus, z as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-CJONOwbP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categoryIcons = {
	Electronics: Laptop,
	Furniture: Armchair,
	Vehicles: Car,
	Equipment: Wrench
};
var statusColors = {
	Available: "bg-success/10 text-success border-success/20",
	Allocated: "bg-primary/10 text-primary border-primary/20",
	Maintenance: "bg-warning/10 text-warning-foreground border-warning/20",
	Retired: "bg-muted text-muted-foreground border-border"
};
var categories = [
	"Electronics",
	"Furniture",
	"Vehicles",
	"Equipment"
];
var statuses = [
	"Available",
	"Allocated",
	"Maintenance",
	"Retired"
];
function AssetsPage() {
	const [assets, setAssets] = (0, import_react.useState)(() => mockDb.getAssets());
	const [employees] = (0, import_react.useState)(() => mockDb.getEmployees());
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [selectedStatus, setSelectedStatus] = (0, import_react.useState)("All");
	const [expandedTag, setExpandedTag] = (0, import_react.useState)(null);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [showRegisterModal, setShowRegisterModal] = (0, import_react.useState)(false);
	const [activeAsset, setActiveAsset] = (0, import_react.useState)(null);
	const [showAllocateModal, setShowAllocateModal] = (0, import_react.useState)(false);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [showHistoryModal, setShowHistoryModal] = (0, import_react.useState)(false);
	const [assetName, setAssetName] = (0, import_react.useState)("");
	const [assetTag, setAssetTag] = (0, import_react.useState)("");
	const [assetCategory, setAssetCategory] = (0, import_react.useState)("Electronics");
	const [assetDept, setAssetDept] = (0, import_react.useState)("IT");
	const [assetValue, setAssetValue] = (0, import_react.useState)("");
	const [allocEmpId, setAllocEmpId] = (0, import_react.useState)("");
	const [allocDueDate, setAllocDueDate] = (0, import_react.useState)("");
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editCategory, setEditCategory] = (0, import_react.useState)("Electronics");
	const [editDept, setEditDept] = (0, import_react.useState)("IT");
	const [editValue, setEditValue] = (0, import_react.useState)("");
	const [editStatus, setEditStatus] = (0, import_react.useState)("Available");
	const handleRegisterAsset = (e) => {
		e.preventDefault();
		if (!assetName || !assetTag) {
			toast.error("Please fill in all fields.");
			return;
		}
		const updatedAssets = [{
			tag: assetTag,
			name: assetName,
			category: assetCategory,
			status: "Available",
			dept: assetDept,
			assignedTo: "—",
			purchased: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric"
			}),
			value: assetValue || "0"
		}, ...assets];
		setAssets(updatedAssets);
		mockDb.saveAssets(updatedAssets);
		const updatedDepts = mockDb.getDepartments().map((d) => d.name === assetDept || assetDept === "IT" && d.name === "Information Technology" ? {
			...d,
			assets: d.assets + 1
		} : d);
		mockDb.saveDepartments(updatedDepts);
		mockDb.addHistoryEvent(assetTag, "Asset Registered", "Admin", `Asset created with initial value ₹${Number(assetValue).toLocaleString("en-IN")}`);
		toast.success(`Asset "${assetName}" registered successfully!`);
		setShowRegisterModal(false);
		setAssetName("");
		setAssetTag("");
		setAssetValue("");
	};
	const handleOpenAllocate = (asset) => {
		setActiveAsset(asset);
		setAllocEmpId("");
		setAllocDueDate("");
		setShowAllocateModal(true);
	};
	const handleOpenEdit = (asset) => {
		setActiveAsset(asset);
		setEditName(asset.name);
		setEditCategory(asset.category);
		setEditDept(asset.dept);
		setEditValue(asset.value);
		setEditStatus(asset.status);
		setShowEditModal(true);
	};
	const handleOpenHistory = (asset) => {
		setActiveAsset(asset);
		setShowHistoryModal(true);
	};
	const handleAllocateSubmit = (e) => {
		e.preventDefault();
		if (!activeAsset || !allocEmpId || !allocDueDate) {
			toast.error("Please fill in all required fields.");
			return;
		}
		const selectedEmployee = employees.find((emp) => emp.id === allocEmpId);
		const allocations = mockDb.getAllocations();
		const newAlloc = {
			id: `AL-${Math.floor(100 + Math.random() * 900)}`,
			tag: activeAsset.tag,
			name: activeAsset.name,
			employee: selectedEmployee.name,
			dept: selectedEmployee.dept,
			allocatedOn: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			dueBack: allocDueDate,
			status: "Active"
		};
		mockDb.saveAllocations([newAlloc, ...allocations]);
		const updated = assets.map((a) => a.tag === activeAsset.tag ? {
			...a,
			status: "Allocated",
			assignedTo: selectedEmployee.name
		} : a);
		setAssets(updated);
		mockDb.saveAssets(updated);
		mockDb.addHistoryEvent(activeAsset.tag, "Allocated", "Admin", `Assigned to ${selectedEmployee.name} (Due: ${allocDueDate})`);
		toast.success(`Asset allocated to ${selectedEmployee.name}!`);
		setShowAllocateModal(false);
	};
	const handleEditSubmit = (e) => {
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
				assignedTo: editStatus === "Available" ? "—" : a.assignedTo
			};
		});
		setAssets(updated);
		mockDb.saveAssets(updated);
		mockDb.addHistoryEvent(activeAsset.tag, "Modified", "Admin", `Details updated (Name: ${editName}, Department: ${editDept}, Status: ${editStatus})`);
		toast.success("Asset details updated successfully!");
		setShowEditModal(false);
	};
	const filtered = assets.filter((a) => {
		const q = search.toLowerCase();
		const matchSearch = a.tag.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.dept.toLowerCase().includes(q) || a.assignedTo.toLowerCase().includes(q);
		const matchCat = selectedCategory === "All" || a.category === selectedCategory;
		const matchStat = selectedStatus === "All" || a.status === selectedStatus;
		return matchSearch && matchCat && matchStat;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Asset Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Register, search, and filter assets by tag, category, status, and department."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-1.5",
					onClick: () => setShowRegisterModal(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Register Asset"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: statuses.map((s) => {
					const count = assets.filter((a) => a.status === s).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedStatus(selectedStatus === s ? "All" : s),
						className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedStatus === s ? statusColors[s] + " ring-2 ring-offset-1 ring-primary/40" : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"}`,
						children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: count
						})]
					}, s);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						placeholder: "Search by tag, name, department…",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "gap-1.5",
					onClick: () => setShowFilters(!showFilters),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" }),
						"Filters",
						selectedCategory !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]",
							children: "1"
						})
					]
				})]
			}),
			showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-150",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground self-center",
					children: "Category:"
				}), ["All", ...categories].map((cat) => {
					const Icon = cat !== "All" ? categoryIcons[cat] : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedCategory(cat),
						className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-accent"}`,
						children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), cat]
					}, cat);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-[var(--shadow-card)] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-border flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold text-foreground",
						children: [
							filtered.length,
							" asset",
							filtered.length !== 1 ? "s" : "",
							" found"
						]
					}), (search || selectedCategory !== "All" || selectedStatus !== "All") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-xs text-primary hover:underline",
						onClick: () => {
							setSearch("");
							setSelectedCategory("All");
							setSelectedStatus("All");
						},
						children: "Clear all filters"
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
									children: "Tag"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Asset Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell",
									children: "Department"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell",
									children: "Assigned To"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filtered.map((asset) => {
								const Icon = categoryIcons[asset.category];
								const expanded = expandedTag === asset.tag;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30 transition-colors cursor-pointer",
									onClick: () => setExpandedTag(expanded ? null : asset.tag),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground",
												children: asset.tag
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-primary" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-foreground",
													children: asset.name
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground hidden sm:table-cell",
											children: asset.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[asset.status]}`,
												children: asset.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground hidden md:table-cell",
											children: asset.dept
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground hidden lg:table-cell",
											children: asset.assignedTo
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground",
											children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
										})
									]
								}, asset.tag), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "bg-muted/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 7,
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground uppercase tracking-wide mb-1",
													children: "Purchased"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-foreground font-medium",
													children: asset.purchased
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground uppercase tracking-wide mb-1",
													children: "Value"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-foreground font-medium",
													children: ["₹", Number(asset.value).toLocaleString("en-IN")]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground uppercase tracking-wide mb-1",
													children: "Department"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-foreground font-medium",
													children: asset.dept
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-end gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															size: "sm",
															variant: "outline",
															className: "text-xs h-7 gap-1",
															onClick: (e) => {
																e.stopPropagation();
																handleOpenEdit(asset);
															},
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3 w-3" }), " Edit"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															size: "sm",
															variant: "outline",
															className: "text-xs h-7 gap-1",
															onClick: (e) => {
																e.stopPropagation();
																handleOpenHistory(asset);
															},
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3 w-3" }), " History"]
														}),
														asset.status === "Available" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "sm",
															className: "text-xs h-7",
															onClick: (e) => {
																e.stopPropagation();
																handleOpenAllocate(asset);
															},
															children: "Allocate"
														})
													]
												})
											]
										})
									})
								}, asset.tag + "-detail")] });
							}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "px-4 py-10 text-center text-muted-foreground text-sm",
								children: "No assets match your filters."
							}) })]
						})]
					})
				})]
			}),
			showRegisterModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowRegisterModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-primary" }), "Register Asset"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleRegisterAsset,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "asset-name",
										children: "Asset Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "asset-name",
										required: true,
										placeholder: "e.g. Dell UltraSharp 32\\",
										value: assetName,
										onChange: (e) => setAssetName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "asset-tag",
											children: "Asset Tag *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "asset-tag",
											required: true,
											placeholder: "e.g. AF-0130",
											value: assetTag,
											onChange: (e) => setAssetTag(e.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "asset-value",
											children: "Value (INR)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "asset-value",
											placeholder: "e.g. 78000",
											value: assetValue,
											onChange: (e) => setAssetValue(e.target.value)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "asset-category",
											children: "Category"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "asset-category",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: assetCategory,
											onChange: (e) => setAssetCategory(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Electronics",
													children: "Electronics"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Furniture",
													children: "Furniture"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Vehicles",
													children: "Vehicles"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Equipment",
													children: "Equipment"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "asset-dept",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "asset-dept",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: assetDept,
											onChange: (e) => setAssetDept(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "IT",
													children: "IT"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "HR",
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
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowRegisterModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Confirm Registration"
									})]
								})
							]
						})
					]
				})
			}),
			showEditModal && activeAsset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowEditModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-5 w-5 text-primary" }),
								"Edit Asset — ",
								activeAsset.tag
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleEditSubmit,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-name",
										children: "Asset Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-name",
										required: true,
										value: editName,
										onChange: (e) => setEditName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "edit-category",
											children: "Category"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "edit-category",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: editCategory,
											onChange: (e) => setEditCategory(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Electronics",
													children: "Electronics"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Furniture",
													children: "Furniture"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Vehicles",
													children: "Vehicles"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Equipment",
													children: "Equipment"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "edit-value",
											children: "Value (INR)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "edit-value",
											value: editValue,
											onChange: (e) => setEditValue(e.target.value)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "edit-dept",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "edit-dept",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: editDept,
											onChange: (e) => setEditDept(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "IT",
													children: "IT"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "HR",
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
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "edit-status",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "edit-status",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: editStatus,
											onChange: (e) => setEditStatus(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Available",
													children: "Available"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Allocated",
													children: "Allocated"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Maintenance",
													children: "Maintenance"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Retired",
													children: "Retired"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowEditModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Save Changes"
									})]
								})
							]
						})
					]
				})
			}),
			showAllocateModal && activeAsset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAllocateModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5 text-primary" }), "Allocate Asset"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground bg-muted p-2 rounded",
							children: [
								"Allocating: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeAsset.name }),
								" (",
								activeAsset.tag,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAllocateSubmit,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "alloc-emp",
										children: "Select Employee *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "alloc-emp",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: allocEmpId,
										onChange: (e) => setAllocEmpId(e.target.value),
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
										onClick: () => setShowAllocateModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Confirm Allocation"
									})]
								})
							]
						})
					]
				})
			}),
			showHistoryModal && activeAsset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowHistoryModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5 text-primary" }),
								"Asset History — ",
								activeAsset.tag
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mb-1",
							children: ["Asset: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: activeAsset.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-h-60 overflow-y-auto space-y-3.5 pr-2",
							children: [mockDb.getHistory(activeAsset.tag).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative pl-5 border-l border-border pb-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[-4.5px] top-1.5 h-2 w-2 rounded-full bg-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: event.action
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: event.date
										})]
									}),
									event.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground mt-0.5 font-normal leading-relaxed",
										children: event.notes
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: ["by ", event.performedBy]
									})
								]
							}, event.id)), mockDb.getHistory(activeAsset.tag).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center text-xs py-6 text-muted-foreground",
								children: "No logs recorded for this asset."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setShowHistoryModal(false),
								children: "Close"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AssetsPage as component };
