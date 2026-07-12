import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  CheckCircle2,
  CalendarClock,
  ArrowLeftRight,
  Wrench,
  Info,
  User,
  Boxes,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({ meta: [{ title: "Notifications — AssetFlow" }] }),
  component: NotificationsPage,
});

type NotifCategory = "Alert" | "Approval" | "Booking" | "Transfer" | "Info";
type NotifGroup = "Today" | "Yesterday" | "Older";

type Notification = {
  id: string;
  category: NotifCategory;
  title: string;
  body: string;
  time: string;
  group: NotifGroup;
  read: boolean;
  actionLabel?: string;
};

const categoryConfig: Record<NotifCategory, { icon: React.ElementType; color: string; badge: string }> = {
  Alert: { icon: AlertTriangle, color: "text-destructive", badge: "bg-destructive/10 text-destructive border-destructive/20" },
  Approval: { icon: CheckCircle2, color: "text-success", badge: "bg-success/10 text-success border-success/20" },
  Booking: { icon: CalendarClock, color: "text-primary", badge: "bg-primary/10 text-primary border-primary/20" },
  Transfer: { icon: ArrowLeftRight, color: "text-warning-foreground", badge: "bg-warning/10 text-warning-foreground border-warning/20" },
  Info: { icon: Info, color: "text-muted-foreground", badge: "bg-muted text-muted-foreground border-border" },
};

const initialNotifications: Notification[] = [
  { id: "N01", category: "Alert", title: "3 assets overdue for return", body: "AF-0033, AF-0019, and 1 more are past their due-back date. Please recall or extend.", time: "10 min ago", group: "Today", read: false, actionLabel: "View Allocations" },
  { id: "N02", category: "Approval", title: "Transfer request approved", body: "iPad Pro 12.9\" (AF-0019) transfer from Operations → HR has been approved by Arjun Mehta.", time: "45 min ago", group: "Today", read: false },
  { id: "N03", category: "Booking", title: "Booking confirmed — Conference Room A", body: "Your booking for Product Review on Wed, Jul 16 at 2:00 PM has been confirmed.", time: "1h ago", group: "Today", read: false },
  { id: "N04", category: "Alert", title: "Critical maintenance ticket raised", body: "UPS 10kVA (AF-0022) reported battery failure — raised by Arjun Mehta. Requires immediate action.", time: "2h ago", group: "Today", read: false, actionLabel: "View Ticket" },
  { id: "N05", category: "Transfer", title: "Transfer request needs your approval", body: "Cisco Switch 24-Port (AF-0033) transfer from IT → Facilities — requested by Meera Nair.", time: "3h ago", group: "Today", read: true, actionLabel: "Review Request" },
  { id: "N06", category: "Info", title: "Audit cycle Q3 started", body: "The Q3 2025 asset audit has been initiated by Admin. Please verify assets in your department by Jul 25.", time: "5h ago", group: "Today", read: true },
  { id: "N07", category: "Approval", title: "Transfer request rejected", body: "Sony Camcorder (AF-0044) transfer from Marketing → IT has been rejected. Reason: Not required.", time: "Yesterday, 4:12 PM", group: "Yesterday", read: true },
  { id: "N08", category: "Booking", title: "Client Demo booking reminder", body: "Your Video Conferencing Kit booking is tomorrow, Fri Jul 18 at 1:00 PM.", time: "Yesterday, 2:00 PM", group: "Yesterday", read: true },
  { id: "N09", category: "Alert", title: "Projector AF-0007 misplaced", body: "Audit detected Epson Projector EB-2250U is in Finance instead of Marketing AV Closet.", time: "Yesterday, 11:30 AM", group: "Yesterday", read: true },
  { id: "N10", category: "Info", title: "New asset registered", body: "Dell Latitude 5520 (AF-0001) registered by Arjun Mehta and allocated to Priya Shah (IT).", time: "Jun 12, 2025", group: "Older", read: true },
  { id: "N11", category: "Booking", title: "Booking cancelled — Board Room", body: "All-Hands Meeting on Tue Jul 15 has been cancelled by Sneha Patel.", time: "Jun 10, 2025", group: "Older", read: true },
  { id: "N12", category: "Approval", title: "Maintenance resolved", body: "Projector AF-0062 lamp replacement completed. Asset is now available for use.", time: "Jun 28, 2025", group: "Older", read: true },
];

const GROUPS: NotifGroup[] = ["Today", "Yesterday", "Older"];
const CATEGORY_FILTERS = ["All", "Alert", "Approval", "Booking", "Transfer", "Info"] as const;

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filtered = notifications.filter(
    (n) => activeFilter === "All" || n.category === activeFilter
  );

  const groupedFiltered = GROUPS.reduce(
    (acc, group) => {
      const items = filtered.filter((n) => n.group === group);
      if (items.length > 0) acc[group] = items;
      return acc;
    },
    {} as Partial<Record<NotifGroup, Notification[]>>
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Alerts, approvals, bookings — filtered by category.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" className="gap-1.5 text-sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {CATEGORY_FILTERS.map((cat) => {
          const unread =
            cat === "All"
              ? unreadCount
              : notifications.filter((n) => !n.read && n.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:bg-accent"
              }`}
            >
              {cat !== "All" && (() => {
                const Icon = categoryConfig[cat as NotifCategory].icon;
                return <Icon className="h-3 w-3" />;
              })()}
              {cat === "All" ? (
                <><Bell className="h-3 w-3" /> All</>
              ) : cat}
              {unread > 0 && (
                <span className={`h-4 w-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  activeFilter === cat ? "bg-white/20 text-white" : "bg-destructive/10 text-destructive"
                }`}>
                  {unread}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification Groups */}
      {Object.entries(groupedFiltered).length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center shadow-[var(--shadow-card)]">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Bell className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-foreground">No notifications</h2>
          <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {GROUPS.map((group) => {
            const items = groupedFiltered[group];
            if (!items) return null;
            return (
              <div key={group}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {group}
                </h2>
                <div className="space-y-2">
                  {items.map((notif) => {
                    const conf = categoryConfig[notif.category];
                    const Icon = conf.icon;
                    return (
                      <Card
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                        className={`p-4 shadow-[var(--shadow-card)] cursor-pointer hover:shadow-[var(--shadow-elevated)] transition-all ${
                          !notif.read
                            ? "border-primary/20 bg-primary/5"
                            : "hover:bg-muted/20"
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              !notif.read ? "bg-primary/10" : "bg-muted"
                            }`}
                          >
                            <Icon className={`h-4 w-4 ${conf.color}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-foreground text-sm">
                                  {notif.title}
                                </span>
                                {!notif.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${conf.badge}`}
                                >
                                  {notif.category}
                                </span>
                                <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                                  {notif.time}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {notif.body}
                            </p>
                            {notif.actionLabel && (
                              <button
                                className="mt-2 text-xs font-medium text-primary hover:underline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markRead(notif.id);
                                }}
                              >
                                {notif.actionLabel} →
                              </button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
