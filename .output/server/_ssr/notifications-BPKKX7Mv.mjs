import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { B as CheckCheck, E as Info, J as ArrowLeftRight, P as CircleCheck, W as CalendarClock, q as Bell, s as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BPKKX7Mv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categoryConfig = {
	Alert: {
		icon: TriangleAlert,
		color: "text-destructive",
		badge: "bg-destructive/10 text-destructive border-destructive/20"
	},
	Approval: {
		icon: CircleCheck,
		color: "text-success",
		badge: "bg-success/10 text-success border-success/20"
	},
	Booking: {
		icon: CalendarClock,
		color: "text-primary",
		badge: "bg-primary/10 text-primary border-primary/20"
	},
	Transfer: {
		icon: ArrowLeftRight,
		color: "text-warning-foreground",
		badge: "bg-warning/10 text-warning-foreground border-warning/20"
	},
	Info: {
		icon: Info,
		color: "text-muted-foreground",
		badge: "bg-muted text-muted-foreground border-border"
	}
};
var initialNotifications = [
	{
		id: "N01",
		category: "Alert",
		title: "3 assets overdue for return",
		body: "AF-0033, AF-0019, and 1 more are past their due-back date. Please recall or extend.",
		time: "10 min ago",
		group: "Today",
		read: false,
		actionLabel: "View Allocations"
	},
	{
		id: "N02",
		category: "Approval",
		title: "Transfer request approved",
		body: "iPad Pro 12.9\" (AF-0019) transfer from Operations → HR has been approved by Arjun Mehta.",
		time: "45 min ago",
		group: "Today",
		read: false
	},
	{
		id: "N03",
		category: "Booking",
		title: "Booking confirmed — Conference Room A",
		body: "Your booking for Product Review on Wed, Jul 16 at 2:00 PM has been confirmed.",
		time: "1h ago",
		group: "Today",
		read: false
	},
	{
		id: "N04",
		category: "Alert",
		title: "Critical maintenance ticket raised",
		body: "UPS 10kVA (AF-0022) reported battery failure — raised by Arjun Mehta. Requires immediate action.",
		time: "2h ago",
		group: "Today",
		read: false,
		actionLabel: "View Ticket"
	},
	{
		id: "N05",
		category: "Transfer",
		title: "Transfer request needs your approval",
		body: "Cisco Switch 24-Port (AF-0033) transfer from IT → Facilities — requested by Meera Nair.",
		time: "3h ago",
		group: "Today",
		read: true,
		actionLabel: "Review Request"
	},
	{
		id: "N06",
		category: "Info",
		title: "Audit cycle Q3 started",
		body: "The Q3 2025 asset audit has been initiated by Admin. Please verify assets in your department by Jul 25.",
		time: "5h ago",
		group: "Today",
		read: true
	},
	{
		id: "N07",
		category: "Approval",
		title: "Transfer request rejected",
		body: "Sony Camcorder (AF-0044) transfer from Marketing → IT has been rejected. Reason: Not required.",
		time: "Yesterday, 4:12 PM",
		group: "Yesterday",
		read: true
	},
	{
		id: "N08",
		category: "Booking",
		title: "Client Demo booking reminder",
		body: "Your Video Conferencing Kit booking is tomorrow, Fri Jul 18 at 1:00 PM.",
		time: "Yesterday, 2:00 PM",
		group: "Yesterday",
		read: true
	},
	{
		id: "N09",
		category: "Alert",
		title: "Projector AF-0007 misplaced",
		body: "Audit detected Epson Projector EB-2250U is in Finance instead of Marketing AV Closet.",
		time: "Yesterday, 11:30 AM",
		group: "Yesterday",
		read: true
	},
	{
		id: "N10",
		category: "Info",
		title: "New asset registered",
		body: "Dell Latitude 5520 (AF-0001) registered by Arjun Mehta and allocated to Priya Shah (IT).",
		time: "Jun 12, 2025",
		group: "Older",
		read: true
	},
	{
		id: "N11",
		category: "Booking",
		title: "Booking cancelled — Board Room",
		body: "All-Hands Meeting on Tue Jul 15 has been cancelled by Sneha Patel.",
		time: "Jun 10, 2025",
		group: "Older",
		read: true
	},
	{
		id: "N12",
		category: "Approval",
		title: "Maintenance resolved",
		body: "Projector AF-0062 lamp replacement completed. Asset is now available for use.",
		time: "Jun 28, 2025",
		group: "Older",
		read: true
	}
];
var GROUPS = [
	"Today",
	"Yesterday",
	"Older"
];
var CATEGORY_FILTERS = [
	"All",
	"Alert",
	"Approval",
	"Booking",
	"Transfer",
	"Info"
];
function NotificationsPage() {
	const [notifications, setNotifications] = (0, import_react.useState)(initialNotifications);
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("All");
	const unreadCount = notifications.filter((n) => !n.read).length;
	const markAllRead = () => {
		setNotifications((prev) => prev.map((n) => ({
			...n,
			read: true
		})));
	};
	const markRead = (id) => {
		setNotifications((prev) => prev.map((n) => n.id === id ? {
			...n,
			read: true
		} : n));
	};
	const filtered = notifications.filter((n) => activeFilter === "All" || n.category === activeFilter);
	const groupedFiltered = GROUPS.reduce((acc, group) => {
		const items = filtered.filter((n) => n.group === group);
		if (items.length > 0) acc[group] = items;
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-bold text-foreground flex items-center gap-2",
					children: ["Notifications", unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "bg-primary text-primary-foreground text-xs",
						children: [unreadCount, " new"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Alerts, approvals, bookings — filtered by category."
				})] }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "gap-1.5 text-sm",
					onClick: markAllRead,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), " Mark all as read"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto pb-1",
				children: CATEGORY_FILTERS.map((cat) => {
					const unread = cat === "All" ? unreadCount : notifications.filter((n) => !n.read && n.category === cat).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveFilter(cat),
						className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-all ${activeFilter === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-accent"}`,
						children: [
							cat !== "All" && (() => {
								const Icon = categoryConfig[cat].icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" });
							})(),
							cat === "All" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3 w-3" }), " All"] }) : cat,
							unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `h-4 w-4 rounded-full text-[10px] flex items-center justify-center font-bold ${activeFilter === cat ? "bg-white/20 text-white" : "bg-destructive/10 text-destructive"}`,
								children: unread
							})
						]
					}, cat);
				})
			}),
			Object.entries(groupedFiltered).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-12 flex flex-col items-center justify-center text-center shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-6 w-6 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-foreground",
						children: "No notifications"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "You're all caught up!"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: GROUPS.map((group) => {
					const items = groupedFiltered[group];
					if (!items) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
						children: group
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: items.map((notif) => {
							const conf = categoryConfig[notif.category];
							const Icon = conf.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								onClick: () => markRead(notif.id),
								className: `p-4 shadow-[var(--shadow-card)] cursor-pointer hover:shadow-[var(--shadow-elevated)] transition-all ${!notif.read ? "border-primary/20 bg-primary/5" : "hover:bg-muted/20"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-9 w-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${!notif.read ? "bg-primary/10" : "bg-muted"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${conf.color}` })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground text-sm",
														children: notif.title
													}), !notif.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shrink-0" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 shrink-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${conf.badge}`,
														children: notif.category
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] text-muted-foreground whitespace-nowrap",
														children: notif.time
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground mt-1 leading-relaxed",
												children: notif.body
											}),
											notif.actionLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "mt-2 text-xs font-medium text-primary hover:underline",
												onClick: (e) => {
													e.stopPropagation();
													markRead(notif.id);
												},
												children: [notif.actionLabel, " →"]
											})
										]
									})]
								})
							}, notif.id);
						})
					})] }, group);
				})
			})
		]
	});
}
//#endregion
export { NotificationsPage as component };
