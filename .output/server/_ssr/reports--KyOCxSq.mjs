import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as mockDb } from "./mock-db-C-hW-3bO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { J as ArrowLeftRight, K as Boxes, O as Download, W as CalendarClock, c as TrendingUp, l as TrendingDown, n as Wrench } from "../_libs/lucide-react.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as BarChart, o as Line, p as Legend, r as LineChart, s as CartesianGrid, t as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports--KyOCxSq.js
var import_jsx_runtime = require_jsx_runtime();
var bookingTrendData = [
	{
		day: "Mon",
		bookings: 12
	},
	{
		day: "Tue",
		bookings: 18
	},
	{
		day: "Wed",
		bookings: 9
	},
	{
		day: "Thu",
		bookings: 22
	},
	{
		day: "Fri",
		bookings: 16
	},
	{
		day: "Sat",
		bookings: 4
	},
	{
		day: "Sun",
		bookings: 2
	}
];
var CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card shadow-[var(--shadow-elevated)] px-3 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold text-foreground mb-1",
			children: label
		}), payload.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-muted-foreground",
			children: [
				p.name ?? "Value",
				": ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: p.value
				})
			]
		}, i))]
	});
	return null;
};
function ReportsPage() {
	const assets = mockDb.getAssets();
	const departments = mockDb.getDepartments();
	mockDb.getBookings();
	const tickets = mockDb.getTickets();
	const utilizationData = departments.map((dept) => {
		const nameMatch = dept.name === "Information Technology" ? "IT" : dept.name;
		const deptAssets = assets.filter((a) => a.dept === nameMatch || a.dept === dept.name);
		return {
			dept: nameMatch,
			total: deptAssets.length,
			utilized: deptAssets.filter((a) => a.status === "Allocated").length,
			maintenance: deptAssets.filter((a) => a.status === "Maintenance").length
		};
	});
	const availableCount = assets.filter((a) => a.status === "Available").length;
	const allocatedCount = assets.filter((a) => a.status === "Allocated").length;
	const maintenanceCount = assets.filter((a) => a.status === "Maintenance").length;
	const retiredCount = assets.filter((a) => a.status === "Retired").length;
	const assetStatusData = [
		{
			name: "Available",
			value: availableCount,
			color: "#22c55e"
		},
		{
			name: "Allocated",
			value: allocatedCount,
			color: "#6366f1"
		},
		{
			name: "Maintenance",
			value: maintenanceCount,
			color: "#f59e0b"
		},
		{
			name: "Retired",
			value: retiredCount,
			color: "#94a3b8"
		}
	].filter((d) => d.value > 0);
	const totalAssetsVal = assets.length;
	const activeAllocationsVal = allocatedCount;
	const openMaintenanceVal = tickets.filter((t) => t.status !== "Resolved").length;
	const totalInUse = allocatedCount;
	const totalActive = assets.filter((a) => a.status !== "Retired").length;
	const utilRate = totalActive > 0 ? Math.round(totalInUse / totalActive * 100) : 0;
	const kpis = [
		{
			label: "Total Assets",
			value: totalAssetsVal.toString(),
			change: "+12",
			positive: true,
			icon: Boxes,
			sub: "vs last quarter"
		},
		{
			label: "Utilization Rate",
			value: `${utilRate}%`,
			change: "+3%",
			positive: true,
			icon: TrendingUp,
			sub: "vs last quarter"
		},
		{
			label: "Active Allocations",
			value: activeAllocationsVal.toString(),
			change: "+5",
			positive: true,
			icon: ArrowLeftRight,
			sub: "this month"
		},
		{
			label: "Avg Booking/Day",
			value: "11.9",
			change: "-1.2",
			positive: false,
			icon: CalendarClock,
			sub: "this week"
		},
		{
			label: "Open Maintenance",
			value: openMaintenanceVal.toString(),
			change: "-3",
			positive: true,
			icon: Wrench,
			sub: "vs last month"
		},
		{
			label: "Overdue Returns",
			value: "2",
			change: "+1",
			positive: false,
			icon: TrendingDown,
			sub: "flagged"
		}
	];
	const handleExportCsv = () => {
		const headers = [
			"Department",
			"Total Assets",
			"Utilized Assets",
			"Utilization %",
			"Under Maintenance"
		];
		const rows = utilizationData.map((row) => {
			const utilPct = row.total > 0 ? Math.round(row.utilized / row.total * 100) : 0;
			return [
				row.dept,
				row.total.toString(),
				row.utilized.toString(),
				`${utilPct}%`,
				row.maintenance.toString()
			];
		});
		mockDb.downloadCsv("asset_flow_department_utilization.csv", headers, rows);
		toast.success("Department utilization report CSV successfully downloaded!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Reports & Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Asset utilization, booking trends, and status distribution."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "gap-1.5 text-sm",
						onClick: handleExportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export CSV"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3",
				children: kpis.map((kpi) => {
					const Icon = kpi.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 shadow-[var(--shadow-card)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wide leading-tight",
									children: kpi.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-muted-foreground shrink-0" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold text-foreground",
								children: kpi.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs font-semibold ${kpi.positive ? "text-success" : "text-destructive"}`,
									children: kpi.change
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: kpi.sub
								})]
							})
						]
					}, kpi.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 shadow-[var(--shadow-card)] lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-foreground mb-4",
						children: "Asset Utilization by Department"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 220,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: utilizationData,
							barCategoryGap: "30%",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "dept",
									tick: {
										fontSize: 11,
										fill: "var(--muted-foreground)"
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fontSize: 11,
										fill: "var(--muted-foreground)"
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { formatter: (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 11,
										color: "var(--muted-foreground)"
									},
									children: value
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "total",
									name: "Total",
									fill: "var(--muted)",
									radius: [
										4,
										4,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "utilized",
									name: "Utilized",
									fill: "var(--primary)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-foreground mb-4",
						children: "Asset Status Distribution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 220,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: assetStatusData,
								cx: "50%",
								cy: "50%",
								innerRadius: 55,
								outerRadius: 85,
								paddingAngle: 3,
								dataKey: "value",
								children: assetStatusData.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									fill: entry.color,
									strokeWidth: 0
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { formatter: (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 11,
									color: "var(--muted-foreground)"
								},
								children: value
							}) })
						] })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-foreground mb-4",
					children: "Resource Bookings — This Week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: bookingTrendData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tick: {
									fontSize: 11,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fontSize: 11,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "bookings",
								name: "Bookings",
								stroke: "var(--primary)",
								strokeWidth: 2.5,
								dot: {
									r: 4,
									fill: "var(--primary)",
									strokeWidth: 0
								},
								activeDot: {
									r: 6,
									fill: "var(--primary)"
								}
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-[var(--shadow-card)] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-foreground text-sm",
						children: "Department Summary"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Department"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 font-medium text-muted-foreground",
									children: "Total Assets"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 font-medium text-muted-foreground",
									children: "In Use"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 font-medium text-muted-foreground",
									children: "Utilization"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell",
									children: "Maintenance"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: utilizationData.map((row) => {
								const util = row.total > 0 ? Math.round(row.utilized / row.total * 100) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-medium text-foreground",
											children: row.dept
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right text-muted-foreground",
											children: row.total
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right text-foreground",
											children: row.utilized
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-16 h-1.5 rounded-full bg-muted overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full rounded-full bg-primary",
														style: { width: `${util}%` }
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `text-xs font-medium ${util >= 80 ? "text-success" : util >= 60 ? "text-warning-foreground" : "text-muted-foreground"}`,
													children: [util, "%"]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right text-muted-foreground hidden md:table-cell",
											children: row.maintenance
										})
									]
								}, row.dept);
							})
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
