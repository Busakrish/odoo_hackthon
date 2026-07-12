import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockDb, Booking } from "@/lib/mock-db";
import {
  CalendarClock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Users,
  Video,
  Presentation,
  Clock,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/booking")({
  head: () => ({ meta: [{ title: "Resource Booking — AssetFlow" }] }),
  component: BookingPage,
});

const resources = [
  { id: "R1", name: "Conference Room A", icon: Users, capacity: "8 pax", type: "Room" },
  { id: "R2", name: "Board Room", icon: Users, capacity: "20 pax", type: "Room" },
  { id: "R3", name: "Projector — Hall B", icon: Presentation, capacity: "1 unit", type: "Equipment" },
  { id: "R4", name: "Video Conferencing Kit", icon: Video, capacity: "1 unit", type: "Equipment" },
  { id: "R5", name: "Training Lab (PC)", icon: Monitor, capacity: "24 seats", type: "Lab" },
];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DATES = ["Jul 14", "Jul 15", "Jul 16", "Jul 17", "Jul 18"];

function formatHour(h: number) {
  return h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`;
}

function BookingPage() {
  const [selectedResource, setSelectedResource] = useState("R1");
  const [bookings, setBookings] = useState<Booking[]>(() => mockDb.getBookings());
  const [showDialog, setShowDialog] = useState(false);

  // Form States
  const [formResourceId, setFormResourceId] = useState("R1");
  const [formDayIdx, setFormDayIdx] = useState(0);
  const [formHour, setFormHour] = useState(9);
  const [formPurpose, setFormPurpose] = useState("");
  const [formDuration, setFormDuration] = useState(1);

  const resourceBookings = bookings.filter((b) => b.resourceId === selectedResource);

  function getCellBooking(day: number, hour: number): Booking | undefined {
    return resourceBookings.find(
      (b) => b.day === day && hour >= b.hour && hour < b.hour + b.duration
    );
  }

  function isStartOfBooking(b: Booking, hour: number) {
    return b.hour === hour;
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPurpose) {
      toast.error("Please enter booking details / purpose.");
      return;
    }

    // Check for conflict
    const conflicting = bookings.find(
      (b) =>
        b.resourceId === formResourceId &&
        b.day === formDayIdx &&
        ((formHour >= b.hour && formHour < b.hour + b.duration) ||
          (b.hour >= formHour && b.hour < formHour + formDuration))
    );

    if (conflicting) {
      toast.error(`Slot conflict detected! Already booked by ${conflicting.bookedBy} for "${conflicting.label}".`);
      return;
    }

    const newBooking: Booking = {
      id: `B-${Date.now()}`,
      resourceId: formResourceId,
      day: formDayIdx,
      hour: formHour,
      duration: formDuration,
      bookedBy: "You",
      label: formPurpose,
      mine: true,
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

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resource Booking</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Book rooms and shared assets by time slot. Conflicting slots are blocked automatically.
          </p>
        </div>
        <Button className="gap-1.5" onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4" /> Book a Slot
        </Button>
      </div>

      {/* My Upcoming Bookings */}
      {myBookings.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">My Upcoming Bookings</h2>
          <div className="flex gap-3 flex-wrap">
            {myBookings.map((b) => {
              const res = resources.find((r) => r.id === b.resourceId)!;
              return (
                <Card key={b.id} className="p-3 flex items-center gap-3 shadow-[var(--shadow-card)] min-w-52">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <CalendarClock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm flex items-center justify-between gap-2">
                      <span>{b.label}</span>
                      <button
                        className="text-xs text-destructive hover:underline ml-2"
                        onClick={() => {
                          const updated = bookings.filter((x) => x.id !== b.id);
                          setBookings(updated);
                          mockDb.saveBookings(updated);
                          toast.success("Booking cancelled.");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {res.name} · {DAYS[b.day]}, {DATES[b.day]} · {formatHour(b.hour)}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Resource Selector */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Resources</h2>
        <div className="flex gap-2 flex-wrap">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedResource(r.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  selectedResource === r.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{r.name}</span>
                <Badge variant="secondary" className="text-[10px] h-4 px-1">
                  {r.type}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-primary/20 border border-primary/30" />
          My Booking
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-muted border border-border" />
          Booked by Others
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-success/20 border border-success/30" />
          Available
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <Card className="shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {resources.find((r) => r.id === selectedResource)?.name}
            <span className="text-muted-foreground font-normal">— Week of Jul 14, 2025</span>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="w-20 px-3 py-2.5 text-left text-muted-foreground font-medium bg-muted/40 border-b border-r border-border">
                  Time
                </th>
                {DAYS.map((day, i) => (
                  <th
                    key={day}
                    className="px-3 py-2.5 text-center font-medium bg-muted/40 border-b border-r border-border last:border-r-0 min-w-[120px]"
                  >
                    <div className="text-foreground">{day}</div>
                    <div className="text-muted-foreground font-normal">{DATES[i]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour} className="border-b border-border last:border-b-0">
                  <td className="px-3 py-0 text-muted-foreground border-r border-border align-top pt-2 w-20">
                    {formatHour(hour)}
                  </td>
                  {DAYS.map((_, dayIdx) => {
                    const booking = getCellBooking(dayIdx, hour);
                    if (booking && !isStartOfBooking(booking, hour)) {
                      return null; // Rendered by the start cell with rowSpan
                    }
                    if (booking && isStartOfBooking(booking, hour)) {
                      return (
                        <td
                          key={dayIdx}
                          rowSpan={booking.duration}
                          className="px-2 py-1.5 border-r border-border last:border-r-0 align-top"
                        >
                          <div
                            className={`rounded-md p-2 h-full min-h-[2.5rem] ${
                              booking.mine
                                ? "bg-primary/15 border border-primary/30 text-primary"
                                : "bg-muted border border-border text-muted-foreground"
                            }`}
                          >
                            <div className="font-semibold truncate">{booking.label}</div>
                            <div className="text-[10px] opacity-70 mt-0.5 truncate">{booking.bookedBy}</div>
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={dayIdx}
                        className="px-2 py-1.5 border-r border-border last:border-r-0 cursor-pointer group"
                        onClick={() => {
                          setFormResourceId(selectedResource);
                          setFormDayIdx(dayIdx);
                          setFormHour(hour);
                          setShowDialog(true);
                        }}
                      >
                        <div className="rounded-md h-full min-h-[2.5rem] bg-success/5 border border-dashed border-success/30 group-hover:bg-success/10 group-hover:border-success/50 transition-all flex items-center justify-center">
                          <Plus className="h-3 w-3 text-success/50 group-hover:text-success transition-colors" />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Book Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <Card className="w-full max-w-sm p-6 space-y-4 shadow-[var(--shadow-elevated)] border relative bg-card">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Book a Slot
            </h2>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <label className="text-muted-foreground text-xs font-medium">Resource</label>
                <select
                  className="w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm"
                  value={formResourceId}
                  onChange={(e) => setFormResourceId(e.target.value)}
                >
                  {resources.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs font-medium">Date</label>
                  <select
                    className="w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm"
                    value={formDayIdx}
                    onChange={(e) => setFormDayIdx(Number(e.target.value))}
                  >
                    {DAYS.map((d, i) => (
                      <option key={d} value={i}>{d}, {DATES[i]}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs font-medium">Start Time</label>
                  <select
                    className="w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm"
                    value={formHour}
                    onChange={(e) => setFormHour(Number(e.target.value))}
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h}>{formatHour(h)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs font-medium">Duration (Hours)</label>
                  <select
                    className="w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm"
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                  >
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground text-xs font-medium">Purpose / Title *</label>
                <input
                  required
                  className="w-full border border-border rounded-md px-3 py-2 text-foreground bg-background text-sm"
                  placeholder="e.g. Weekly Review Meeting"
                  value={formPurpose}
                  onChange={(e) => setFormPurpose(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                <Button type="submit">Confirm Booking</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
