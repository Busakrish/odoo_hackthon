import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as mockDb } from "./mock-db-C-hW-3bO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as ChevronRight, R as ChevronLeft, W as CalendarClock, _ as Presentation, i as Users, k as Clock, r as Video, t as X, v as Plus, x as Monitor } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking-DThPhXZZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var resources = [
	{
		id: "R1",
		name: "Conference Room A",
		icon: Users,
		capacity: "8 pax",
		type: "Room"
	},
	{
		id: "R2",
		name: "Board Room",
		icon: Users,
		capacity: "20 pax",
		type: "Room"
	},
	{
		id: "R3",
		name: "Projector — Hall B",
		icon: Presentation,
		capacity: "1 unit",
		type: "Equipment"
	},
	{
		id: "R4",
		name: "Video Conferencing Kit",
		icon: Video,
		capacity: "1 unit",
		type: "Equipment"
	},
	{
		id: "R5",
		name: "Training Lab (PC)",
		icon: Monitor,
		capacity: "24 seats",
		type: "Lab"
	}
];
var HOURS = [
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17
];
var DAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri"
];
var DATES = [
	"Jul 14",
	"Jul 15",
	"Jul 16",
	"Jul 17",
	"Jul 18"
];
function formatHour(h) {
	return h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`;
}
function BookingPage() {
	const [selectedResource, setSelectedResource] = (0, import_react.useState)("R1");
	const [bookings, setBookings] = (0, import_react.useState)(() => mockDb.getBookings());
	const [showDialog, setShowDialog] = (0, import_react.useState)(false);
	const [formResourceId, setFormResourceId] = (0, import_react.useState)("R1");
	const [formDayIdx, setFormDayIdx] = (0, import_react.useState)(0);
	const [formHour, setFormHour] = (0, import_react.useState)(9);
	const [formPurpose, setFormPurpose] = (0, import_react.useState)("");
	const [formDuration, setFormDuration] = (0, import_react.useState)(1);
	const resourceBookings = bookings.filter((b) => b.resourceId === selectedResource);
	function getCellBooking(day, hour) {
		return resourceBookings.find((b) => b.day === day && hour >= b.hour && hour < b.hour + b.duration);
	}
	function isStartOfBooking(b, hour) {
		return b.hour === hour;
	}
	const handleBookingSubmit = (e) => {
		e.preventDefault();
		if (!formPurpose) {
			toast.error("Please enter booking details / purpose.");
			return;
		}
		const conflicting = bookings.find((b) => b.resourceId === formResourceId && b.day === formDayIdx && (formHour >= b.hour && formHour < b.hour + b.duration || b.hour >= formHour && b.hour < formHour + formDuration));
		if (conflicting) {
			toast.error(`Slot conflict detected! Already booked by ${conflicting.bookedBy} for "${conflicting.label}".`);
			return;
		}
		const newBooking = {
			id: `B-${Date.now()}`,
			resourceId: formResourceId,
			day: formDayIdx,
			hour: formHour,
			duration: formDuration,
			bookedBy: "You",
			label: formPurpose,
			mine: true
		};
		const updatedBookings = [...bookings, newBooking];
		setBookings(updatedBookings);
		mockDb.saveBookings(updatedBookings);
		toast.success("Booking confirmed successfully!");
		setShowDialog(false);
		setFormPurpose("");
		setFormDuration(1);
	};
	const myBookings = bookings.filter((b) => b.mine);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Resource Booking"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Book rooms and shared assets by time slot. Conflicting slots are blocked automatically."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-1.5",
					onClick: () => setShowDialog(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Book a Slot"]
				})]
			}),
			myBookings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2",
				children: "My Upcoming Bookings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 flex-wrap",
				children: myBookings.map((b) => {
					const res = resources.find((r) => r.id === b.resourceId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-3 flex items-center gap-3 shadow-[var(--shadow-card)] min-w-52",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-medium text-foreground text-sm flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-xs text-destructive hover:underline ml-2",
								onClick: () => {
									const updated = bookings.filter((x) => x.id !== b.id);
									setBookings(updated);
									mockDb.saveBookings(updated);
									toast.success("Booking cancelled.");
								},
								children: "Cancel"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								res.name,
								" · ",
								DAYS[b.day],
								", ",
								DATES[b.day],
								" · ",
								formatHour(b.hour)
							]
						})] })]
					}, b.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2",
				children: "Resources"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 flex-wrap",
				children: resources.map((r) => {
					const Icon = r.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedResource(r.id),
						className: `flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${selectedResource === r.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-accent"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-[10px] h-4 px-1",
								children: r.type
							})
						]
					}, r.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3 rounded bg-primary/20 border border-primary/30" }), "My Booking"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3 rounded bg-muted border border-border" }), "Booked by Others"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3 rounded bg-success/20 border border-success/30" }), "Available"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-[var(--shadow-card)] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-b border-border flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }),
							resources.find((r) => r.id === selectedResource)?.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-normal",
								children: "— Week of Jul 14, 2025"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-7 w-7 p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-7 w-7 p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-20 px-3 py-2.5 text-left text-muted-foreground font-medium bg-muted/40 border-b border-r border-border",
							children: "Time"
						}), DAYS.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "px-3 py-2.5 text-center font-medium bg-muted/40 border-b border-r border-border last:border-r-0 min-w-[120px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-foreground",
								children: day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground font-normal",
								children: DATES[i]
							})]
						}, day))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: HOURS.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-0 text-muted-foreground border-r border-border align-top pt-2 w-20",
								children: formatHour(hour)
							}), DAYS.map((_, dayIdx) => {
								const booking = getCellBooking(dayIdx, hour);
								if (booking && !isStartOfBooking(booking, hour)) return null;
								if (booking && isStartOfBooking(booking, hour)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									rowSpan: booking.duration,
									className: "px-2 py-1.5 border-r border-border last:border-r-0 align-top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-md p-2 h-full min-h-[2.5rem] ${booking.mine ? "bg-primary/15 border border-primary/30 text-primary" : "bg-muted border border-border text-muted-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold truncate",
											children: booking.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] opacity-70 mt-0.5 truncate",
											children: booking.bookedBy
										})]
									})
								}, dayIdx);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5 border-r border-border last:border-r-0 cursor-pointer group",
									onClick: () => {
										setFormResourceId(selectedResource);
										setFormDayIdx(dayIdx);
										setFormHour(hour);
										setShowDialog(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-md h-full min-h-[2.5rem] bg-success/5 border border-dashed border-success/30 group-hover:bg-success/10 group-hover:border-success/50 transition-all flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3 text-success/50 group-hover:text-success transition-colors" })
									})
								}, dayIdx);
							})]
						}, hour)) })]
					})
				})]
			}),
			showDialog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowDialog(false),
							className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-foreground text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-5 w-5 text-primary" }), "Book a Slot"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleBookingSubmit,
							className: "space-y-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-muted-foreground text-xs font-medium",
										children: "Resource"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm",
										value: formResourceId,
										onChange: (e) => setFormResourceId(e.target.value),
										children: resources.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: r.id,
											children: r.name
										}, r.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-muted-foreground text-xs font-medium",
											children: "Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: "w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm",
											value: formDayIdx,
											onChange: (e) => setFormDayIdx(Number(e.target.value)),
											children: DAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: i,
												children: [
													d,
													", ",
													DATES[i]
												]
											}, d))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-muted-foreground text-xs font-medium",
											children: "Start Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: "w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm",
											value: formHour,
											onChange: (e) => setFormHour(Number(e.target.value)),
											children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: h,
												children: formatHour(h)
											}, h))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-muted-foreground text-xs font-medium",
											children: "Duration (Hours)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: "w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm",
											value: formDuration,
											onChange: (e) => setFormDuration(Number(e.target.value)),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 1,
													children: "1 hour"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 2,
													children: "2 hours"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 3,
													children: "3 hours"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 4,
													children: "4 hours"
												})
											]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-muted-foreground text-xs font-medium",
										children: "Purpose / Title *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										className: "w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm",
										placeholder: "e.g. Weekly Review Meeting",
										value: formPurpose,
										onChange: (e) => setFormPurpose(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowDialog(false),
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
			})
		]
	});
}
//#endregion
export { BookingPage as component };
