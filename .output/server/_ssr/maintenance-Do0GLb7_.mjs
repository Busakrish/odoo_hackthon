import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as mockDb } from "./mock-db-C-hW-3bO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as CircleCheck, U as CalendarDays, a as User, d as Tag, k as Clock, n as Wrench, s as TriangleAlert, t as X, u as ThumbsUp, v as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/maintenance-Do0GLb7_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var priorityColor = {
	Low: "bg-muted text-muted-foreground border-border",
	Medium: "bg-warning/10 text-warning-foreground border-warning/20",
	High: "bg-orange-500/10 text-orange-600 border-orange-200",
	Critical: "bg-destructive/10 text-destructive border-destructive/20"
};
var statusIcon = {
	Pending: Clock,
	Approved: ThumbsUp,
	"In Progress": Wrench,
	Resolved: CircleCheck
};
var statusHeaderColor = {
	Pending: "border-t-warning",
	Approved: "border-t-blue-400",
	"In Progress": "border-t-orange-400",
	Resolved: "border-t-success"
};
var columns = [
	"Pending",
	"Approved",
	"In Progress",
	"Resolved"
];
function MaintenancePage() {
	const [tickets, setTickets] = (0, import_react.useState)(() => mockDb.getTickets());
	const [assets, setAssets] = (0, import_react.useState)(() => mockDb.getAssets());
	const [dragId, setDragId] = (0, import_react.useState)(null);
	const [showRequestModal, setShowRequestModal] = (0, import_react.useState)(false);
	const [formAssetTag, setFormAssetTag] = (0, import_react.useState)("");
	const [formIssue, setFormIssue] = (0, import_react.useState)("");
	const [formPriority, setFormPriority] = (0, import_react.useState)("Medium");
	const moveTicket = (id, newStatus) => {
		const updated = tickets.map((t) => {
			if (t.id !== id) return t;
			if (newStatus === "Resolved") {
				const updatedAssets = assets.map((a) => a.tag === t.tag ? {
					...a,
					status: "Available"
				} : a);
				setAssets(updatedAssets);
				mockDb.saveAssets(updatedAssets);
			}
			return {
				...t,
				status: newStatus
			};
		});
		setTickets(updated);
		mockDb.saveTickets(updated);
		toast.success(`Ticket status updated to ${newStatus}`);
	};
	const handleRaiseRequest = (e) => {
		e.preventDefault();
		if (!formAssetTag || !formIssue) {
			toast.error("Please fill in all fields.");
			return;
		}
		const selectedAsset = assets.find((a) => a.tag === formAssetTag);
		const updatedTickets = [{
			id: `MR-${Math.floor(100 + Math.random() * 900)}`,
			tag: formAssetTag,
			asset: selectedAsset.name,
			issue: formIssue,
			priority: formPriority,
			status: "Pending",
			raisedBy: "Admin",
			technician: "Unassigned",
			date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric"
			})
		}, ...tickets];
		setTickets(updatedTickets);
		mockDb.saveTickets(updatedTickets);
		if (formPriority === "High" || formPriority === "Critical") {
			const updatedAssets = assets.map((a) => a.tag === formAssetTag ? {
				...a,
				status: "Maintenance"
			} : a);
			setAssets(updatedAssets);
			mockDb.saveAssets(updatedAssets);
		}
		toast.success(`Maintenance request raised for ${selectedAsset.name}!`);
		setShowRequestModal(false);
		setFormAssetTag("");
		setFormIssue("");
	};
	const columnCounts = columns.reduce((acc, col) => ({
		...acc,
		[col]: tickets.filter((t) => t.status === col).length
	}), {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Maintenance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Track and manage asset maintenance tickets across their lifecycle."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-1.5",
					onClick: () => setShowRequestModal(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Raise Request"]
				})]
			}),
			tickets.some((t) => t.priority === "Critical" && t.status !== "Resolved") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-3 border-destructive/30 bg-destructive/5 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-destructive shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Critical issue pending:" }),
						" ",
						tickets.find((t) => t.priority === "Critical" && t.status !== "Resolved")?.asset,
						" — immediate attention required."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: columns.map((col) => {
					const Icon = statusIcon[col];
					const colTickets = tickets.filter((t) => t.status === col);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						onDragOver: (e) => e.preventDefault(),
						onDrop: () => {
							if (dragId) {
								moveTicket(dragId, col);
								setDragId(null);
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-xl border-t-4 ${statusHeaderColor[col]} bg-card shadow-[var(--shadow-card)] px-3 py-2.5`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-semibold text-sm text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-muted-foreground" }), col]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "text-xs",
										children: columnCounts[col]
									})]
								})
							}),
							colTickets.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								draggable: true,
								onDragStart: () => setDragId(ticket.id),
								onDragEnd: () => setDragId(null),
								className: `p-3.5 shadow-[var(--shadow-card)] cursor-grab active:cursor-grabbing hover:shadow-[var(--shadow-elevated)] transition-all select-none ${dragId === ticket.id ? "opacity-50 scale-95" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${priorityColor[ticket.priority]}`,
												children: ticket.priority
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground font-mono",
												children: ticket.id
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground text-sm leading-snug",
											children: ticket.issue
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }), ticket.asset]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-border pt-2 space-y-1 text-[11px] text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }),
														" Raised by ",
														ticket.raisedBy
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: ticket.technician === "Unassigned" ? "text-warning-foreground font-medium" : "",
														children: ticket.technician
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3 w-3" }),
														" ",
														ticket.date
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1",
											children: columns.filter((c) => c !== col).slice(0, 2).map((nextCol) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => moveTicket(ticket.id, nextCol),
												className: "flex-1 text-[10px] px-2 py-1 rounded border border-border text-muted-foreground hover:bg-accent transition-colors truncate",
												children: ["→ ", nextCol]
											}, nextCol))
										})
									]
								})
							}, ticket.id)),
							colTickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border-2 border-dashed border-border h-24 flex items-center justify-center text-xs text-muted-foreground",
								children: "Drop tickets here"
							})
						]
					}, col);
				})
			}),
			showRequestModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowRequestModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-primary" }), "Raise Maintenance Request"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleRaiseRequest,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "req-asset",
										children: "Select Target Asset *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "req-asset",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: formAssetTag,
										onChange: (e) => setFormAssetTag(e.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Asset --"
										}), assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
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
										htmlFor: "req-priority",
										children: "Priority"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "req-priority",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: formPriority,
										onChange: (e) => setFormPriority(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Low",
												children: "Low"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Medium",
												children: "Medium"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "High",
												children: "High"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Critical",
												children: "Critical"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "req-issue",
										children: "Issue Description *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "req-issue",
										required: true,
										rows: 3,
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary",
										placeholder: "Describe the issue in detail...",
										value: formIssue,
										onChange: (e) => setFormIssue(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowRequestModal(false),
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
export { MaintenancePage as component };
