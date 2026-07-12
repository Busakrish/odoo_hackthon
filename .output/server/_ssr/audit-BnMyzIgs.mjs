import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as mockDb } from "./mock-db-C-hW-3bO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { N as CircleQuestionMark, O as Download, P as CircleCheck, h as Search, s as TriangleAlert, y as Play } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-BnMyzIgs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var auditStatusConfig = {
	Match: {
		color: "bg-success/10 text-success border-success/20",
		icon: CircleCheck,
		label: "Match"
	},
	Discrepancy: {
		color: "bg-destructive/10 text-destructive border-destructive/20",
		icon: TriangleAlert,
		label: "Discrepancy"
	},
	Unverified: {
		color: "bg-muted text-muted-foreground border-border",
		icon: CircleQuestionMark,
		label: "Unverified"
	}
};
function AuditPage() {
	const [auditItems, setAuditItems] = (0, import_react.useState)(() => mockDb.getAuditItems());
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const handleStartNewAudit = () => {
		const reset = auditItems.map((item) => ({
			...item,
			actualLocation: "—",
			actualDept: "—",
			auditStatus: "Unverified",
			verifiedBy: "—"
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
			"Verified By"
		];
		const rows = auditItems.map((item) => [
			item.tag,
			item.name,
			item.expectedLocation,
			item.actualLocation,
			item.expectedDept,
			item.actualDept,
			item.auditStatus,
			item.verifiedBy
		]);
		mockDb.downloadCsv("asset_flow_audit_report.csv", headers, rows);
		toast.success("Audit report CSV successfully downloaded!");
	};
	const matched = auditItems.filter((i) => i.auditStatus === "Match").length;
	const discrepancies = auditItems.filter((i) => i.auditStatus === "Discrepancy").length;
	const unverified = auditItems.filter((i) => i.auditStatus === "Unverified").length;
	const total = auditItems.length;
	const progress = total > 0 ? Math.round(matched / total * 100) : 0;
	const filtered = auditItems.filter((item) => {
		const matchFilter = filter === "All" || item.auditStatus === filter;
		const q = search.toLowerCase();
		const matchSearch = item.tag.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.expectedDept.toLowerCase().includes(q);
		return matchFilter && matchSearch;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Asset Audit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Audit cycle checklist with auto-detected discrepancies and verification status."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "gap-1.5",
						onClick: handleExportReport,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export Report"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "gap-1.5",
						onClick: handleStartNewAudit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Start New Audit"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-5 shadow-[var(--shadow-card)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-foreground",
									children: "Audit Progress — Q3 2025"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-bold text-primary",
									children: [progress, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-3 rounded-full bg-muted overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary transition-all duration-700",
									style: { width: `${progress}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 mt-3 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [matched, " matched"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-destructive font-medium",
										children: [discrepancies, " discrepancies"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [unverified, " unverified"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [total, " total"] })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3 shrink-0",
						children: [
							"Match",
							"Discrepancy",
							"Unverified"
						].map((s) => {
							const conf = auditStatusConfig[s];
							const count = auditItems.filter((i) => i.auditStatus === s).length;
							const Icon = conf.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex flex-col items-center px-4 py-3 rounded-xl border ${conf.color}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 mb-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-bold",
										children: count
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-wide mt-0.5",
										children: s
									})
								]
							}, s);
						})
					})]
				})
			}),
			discrepancies > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-3 border-destructive/30 bg-destructive/5 flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-destructive shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [discrepancies, " discrepancies detected"] }), " — assets found at unexpected locations or departments. Please investigate and update records."]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "w-full border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground bg-background",
						placeholder: "Search by tag, name, department…",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						"All",
						"Match",
						"Discrepancy",
						"Unverified"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(f),
						className: `px-3 py-2 rounded-md text-xs font-medium border transition-all ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-accent"}`,
						children: f
					}, f))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-[var(--shadow-card)] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell",
									children: "Expected Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell",
									children: "Actual Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell",
									children: "Dept. Match"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell",
									children: "Verified By"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filtered.map((item) => {
								const conf = auditStatusConfig[item.auditStatus];
								const Icon = conf.icon;
								const deptMismatch = item.expectedDept !== item.actualDept && item.actualDept !== "—";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: `transition-colors ${item.auditStatus === "Discrepancy" ? "bg-destructive/5 hover:bg-destructive/10" : "hover:bg-muted/30"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-foreground",
												children: item.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "text-[11px] text-muted-foreground font-mono",
												children: item.tag
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground text-xs hidden md:table-cell",
											children: item.expectedLocation
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-xs hidden md:table-cell",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: item.expectedLocation !== item.actualLocation && item.actualLocation !== "—" ? "text-destructive font-medium" : item.actualLocation === "—" ? "text-muted-foreground italic" : "text-foreground",
												children: item.actualLocation
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 hidden lg:table-cell",
											children: item.actualDept === "—" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground italic",
												children: "—"
											}) : deptMismatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-destructive font-medium",
												children: [
													item.expectedDept,
													" → ",
													item.actualDept
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-success font-medium",
												children: [item.expectedDept, " ✓"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${conf.color}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), conf.label]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell",
											children: item.verifiedBy
										})
									]
								}, item.tag);
							}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "px-4 py-10 text-center text-muted-foreground text-sm",
								children: "No items match your filters."
							}) })]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Showing ",
						filtered.length,
						" of ",
						total,
						" items"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last synced: Jul 12, 2025 — 12:30 PM" })]
				})]
			})
		]
	});
}
//#endregion
export { AuditPage as component };
