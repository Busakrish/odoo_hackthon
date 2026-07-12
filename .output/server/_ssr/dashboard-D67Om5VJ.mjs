import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as mockDb } from "./mock-db-C-hW-3bO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as ClipboardList, F as CircleAlert, J as ArrowLeftRight, K as Boxes, W as CalendarClock, g as RotateCcw, n as Wrench, t as X, v as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D67Om5VJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initialActivity = [
	{
		text: "Laptop AF-0114 allocated to Priya Shah — IT dept",
		when: "2m ago"
	},
	{
		text: "Room B2 booking confirmed — 2:00 to 3:00 PM",
		when: "18m ago"
	},
	{
		text: "Projector AF-0062 maintenance resolved",
		when: "1h ago"
	},
	{
		text: "Transfer approved — AF-0033 to Facilities",
		when: "3h ago"
	}
];
function DashboardPage() {
	const [activity, setActivity] = (0, import_react.useState)(initialActivity);
	const assets = mockDb.getAssets();
	const bookings = mockDb.getBookings();
	const transfers = mockDb.getTransfers();
	const allocations = mockDb.getAllocations();
	const tickets = mockDb.getTickets();
	const [showRegisterModal, setShowRegisterModal] = (0, import_react.useState)(false);
	const [showBookModal, setShowBookModal] = (0, import_react.useState)(false);
	const [showRequestModal, setShowRequestModal] = (0, import_react.useState)(false);
	const [assetName, setAssetName] = (0, import_react.useState)("");
	const [assetCategory, setAssetCategory] = (0, import_react.useState)("Electronics");
	const [assetDept, setAssetDept] = (0, import_react.useState)("IT");
	const [assetValue, setAssetValue] = (0, import_react.useState)("");
	const [assetTag, setAssetTag] = (0, import_react.useState)("");
	const [bookResource, setBookResource] = (0, import_react.useState)("Conference Room A");
	const [bookDate, setBookDate] = (0, import_react.useState)("");
	const [bookTime, setBookTime] = (0, import_react.useState)("10:00 AM");
	const [bookPurpose, setBookPurpose] = (0, import_react.useState)("");
	const [requestType, setRequestType] = (0, import_react.useState)("Maintenance");
	const [requestAsset, setRequestAsset] = (0, import_react.useState)("");
	const [requestPriority, setRequestPriority] = (0, import_react.useState)("Medium");
	const [requestDesc, setRequestDesc] = (0, import_react.useState)("");
	const availableCount = assets.filter((a) => a.status === "Available").length;
	const allocatedCount = assets.filter((a) => a.status === "Allocated").length;
	const activeBookingsCount = bookings.length;
	const pendingTransfersCount = transfers.filter((t) => t.status === "Pending").length;
	const overdueCount = allocations.filter((a) => a.status === "Overdue").length;
	const maintenanceCount = assets.filter((a) => a.status === "Maintenance").length;
	const stats = [
		{
			label: "Available",
			value: availableCount,
			icon: Boxes,
			tone: "text-primary"
		},
		{
			label: "Allocated",
			value: allocatedCount,
			icon: ArrowLeftRight,
			tone: "text-primary"
		},
		{
			label: "Active Bookings",
			value: activeBookingsCount,
			icon: CalendarClock,
			tone: "text-primary"
		},
		{
			label: "Pending Transfers",
			value: pendingTransfersCount,
			icon: ArrowLeftRight,
			tone: "text-warning"
		},
		{
			label: "Upcoming Returns",
			value: overdueCount + 10,
			icon: RotateCcw,
			tone: "text-primary"
		},
		{
			label: "Under Maintenance",
			value: maintenanceCount,
			icon: Wrench,
			tone: "text-warning"
		}
	];
	const handleRegisterAsset = (e) => {
		e.preventDefault();
		if (!assetName || !assetTag) {
			toast.error("Please fill in all required fields.");
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
		mockDb.saveAssets(updatedAssets);
		const updatedDepts = mockDb.getDepartments().map((d) => d.name === assetDept || assetDept === "IT" && d.name === "Information Technology" ? {
			...d,
			assets: d.assets + 1
		} : d);
		mockDb.saveDepartments(updatedDepts);
		const logText = `New asset ${assetName} (${assetTag}) registered in ${assetDept} department`;
		setActivity((prev) => [{
			text: logText,
			when: "Just now"
		}, ...prev]);
		toast.success(`Asset "${assetName}" registered successfully!`);
		setShowRegisterModal(false);
		setAssetName("");
		setAssetValue("");
		setAssetTag("");
	};
	const handleBookResource = (e) => {
		e.preventDefault();
		if (!bookDate || !bookPurpose) {
			toast.error("Please fill in all required fields.");
			return;
		}
		const newBooking = {
			id: `B-${Date.now()}`,
			resourceId: {
				"Conference Room A": "R1",
				"Board Room": "R2",
				"Projector — Hall B": "R3",
				"Video Conferencing Kit": "R4",
				"Training Lab (PC)": "R5"
			}[bookResource] || "R1",
			day: new Date(bookDate).getDay() % 5,
			hour: parseInt(bookTime) || 10,
			duration: 1,
			bookedBy: "You",
			label: bookPurpose,
			mine: true
		};
		const updatedBookings = [...bookings, newBooking];
		mockDb.saveBookings(updatedBookings);
		const logText = `${bookResource} booking confirmed for "${bookPurpose}" — ${bookDate} at ${bookTime}`;
		setActivity((prev) => [{
			text: logText,
			when: "Just now"
		}, ...prev]);
		toast.success(`Booking confirmed for ${bookResource}!`);
		setShowBookModal(false);
		setBookDate("");
		setBookPurpose("");
	};
	const handleRaiseRequest = (e) => {
		e.preventDefault();
		if (!requestAsset || !requestDesc) {
			toast.error("Please select an asset and write description.");
			return;
		}
		const targetAssetObj = assets.find((a) => a.tag === requestAsset);
		if (requestType === "Maintenance") {
			const updatedTickets = [{
				id: `MR-${Math.floor(100 + Math.random() * 900)}`,
				tag: requestAsset,
				asset: targetAssetObj.name,
				issue: requestDesc,
				priority: requestPriority,
				status: "Pending",
				raisedBy: "Admin",
				technician: "Unassigned",
				date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric"
				})
			}, ...tickets];
			mockDb.saveTickets(updatedTickets);
			const updatedAssets = assets.map((a) => a.tag === requestAsset ? {
				...a,
				status: "Maintenance"
			} : a);
			mockDb.saveAssets(updatedAssets);
		} else {
			const updatedTransfers = [{
				id: `TR-${Math.floor(100 + Math.random() * 900)}`,
				tag: requestAsset,
				name: targetAssetObj.name,
				fromDept: targetAssetObj.dept,
				toDept: "Facilities",
				requestedBy: "Admin",
				reason: requestDesc,
				date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				status: "Pending"
			}, ...transfers];
			mockDb.saveTransfers(updatedTransfers);
		}
		const logText = `${requestType} request raised for ${targetAssetObj.name} — Priority: ${requestPriority}`;
		setActivity((prev) => [{
			text: logText,
			when: "Just now"
		}, ...prev]);
		toast.success(`${requestType} request successfully raised!`);
		setShowRequestModal(false);
		setRequestDesc("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Today's Overview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Snapshot of your assets, bookings, and pending actions."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-4 w-4 ${s.tone}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-2xl font-bold text-foreground",
						children: s.value
					})]
				}, s.label))
			}),
			overdueCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4 border-destructive/30 bg-destructive/5 shadow-[var(--shadow-card)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-destructive" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-foreground",
							children: [overdueCount, " assets overdue for return"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "— flagged for follow-up"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "gap-1.5",
						onClick: () => setShowRegisterModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Register asset"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "gap-1.5",
						onClick: () => setShowBookModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4" }), " Book resource"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "gap-1.5",
						onClick: () => {
							if (assets.length > 0 && !requestAsset) setRequestAsset(assets[0].tag);
							setShowRequestModal(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4" }), " Raise request"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-foreground",
						children: "Recent Activity"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: activity.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "p-4 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-foreground",
							children: a.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground shrink-0",
							children: a.when
						})]
					}, i))
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "h-5 w-5 text-primary" }), "Register Asset"]
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
										placeholder: "e.g. MacBook Pro 16-inch",
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
											placeholder: "e.g. AF-0125",
											value: assetTag,
											onChange: (e) => setAssetTag(e.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "asset-val",
											children: "Value (INR)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "asset-val",
											placeholder: "e.g. 1,45,000",
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
			showBookModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowBookModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-5 w-5 text-primary" }), "Book Resource"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleBookResource,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "book-resource",
										children: "Select Resource *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "book-resource",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: bookResource,
										onChange: (e) => setBookResource(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Conference Room A" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Board Room" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Projector — Hall B" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Video Conferencing Kit" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Training Lab (PC)" })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "book-date",
											children: "Date *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "book-date",
											type: "date",
											required: true,
											value: bookDate,
											onChange: (e) => setBookDate(e.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "book-time",
											children: "Time Slot"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "book-time",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: bookTime,
											onChange: (e) => setBookTime(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "09:00 AM" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "10:00 AM" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "11:00 AM" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "12:00 PM" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "02:00 PM" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "03:00 PM" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "04:00 PM" })
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "book-purpose",
										children: "Booking Purpose *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "book-purpose",
										required: true,
										placeholder: "e.g. Design review meeting",
										value: bookPurpose,
										onChange: (e) => setBookPurpose(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowBookModal(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: "Confirm Booking"
									})]
								})
							]
						})
					]
				})
			}),
			showRequestModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowRequestModal(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-5 w-5 text-primary" }), "Raise Request"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleRaiseRequest,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "request-type",
											children: "Request Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "request-type",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: requestType,
											onChange: (e) => setRequestType(e.target.value),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Maintenance",
												children: "🔧 Maintenance"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Transfer",
												children: "🔄 Transfer"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "request-priority",
											children: "Priority"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "request-priority",
											className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
											value: requestPriority,
											onChange: (e) => setRequestPriority(e.target.value),
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
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "request-asset",
										children: "Target Asset"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "request-asset",
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm",
										value: requestAsset,
										onChange: (e) => setRequestAsset(e.target.value),
										children: assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: a.tag,
											children: [
												a.name,
												" (",
												a.tag,
												")"
											]
										}, a.tag))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "request-desc",
										children: "Details / Description *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "request-desc",
										required: true,
										rows: 3,
										className: "w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary",
										placeholder: "Describe the issue or reason for the request...",
										value: requestDesc,
										onChange: (e) => setRequestDesc(e.target.value)
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
export { DashboardPage as component };
