import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, ChevronRight, Info, AlertCircle } from "lucide-react";
import { campusService } from "@/services/campusService";
import { Calendar } from "@/components/ui/calendar";
import { EventItem } from "@/components/campus/event-item";
import { EmptyState, LoadingState } from "@/components/campus/states";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/calendar")({
  head: () => ({
    meta: [
      { title: "Academic Calendar — CampusOS" },
      {
        name: "description",
        content: "Your academic schedule, lectures, labs and deadlines.",
      },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date("2026-09-04"));

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: campusService.getCalendarEvents,
  });

  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Calendar load failed"
          description="We couldn't load your academic events. Please try again."
          action={
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Calendar
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your academic schedule and deadlines.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="h-80 rounded-xl border bg-card animate-pulse" />
          </div>
          <div className="lg:col-span-7">
            <LoadingState rows={5} />
          </div>
        </div>
      </div>
    );
  }

  const selectedDateStr = date?.toISOString().split("T")[0];
  const selectedDayEvents = events?.filter((e) => e.date === selectedDateStr) || [];
  const upcomingEvents = events?.filter((e) => e.date > (selectedDateStr || "")) || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Calendar
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Your academic schedule and deadlines.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border bg-card p-4 shadow-card">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                classNames={{
                  months: "w-full",
                  month: "w-full space-y-4",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative w-full",
                  day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100 mx-auto"),
                }}
              />
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Event Types</h4>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Lecture", color: "bg-primary" },
                  { label: "Lab", color: "bg-muted-foreground" },
                  { label: "Deadline", color: "bg-destructive" },
                  { label: "Exam", color: "bg-warning" },
                  { label: "Meeting", color: "bg-success" },
                ].map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-3 text-xs text-muted-foreground"
                  >
                    <span className={cn("h-2 w-2 rounded-full", t.color)} />
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-7 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select a date"}
              </h3>
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                {selectedDayEvents.length} {selectedDayEvents.length === 1 ? "event" : "events"}
              </span>
            </div>

            {selectedDayEvents.length > 0 ? (
              <ul className="space-y-3">
                {selectedDayEvents.map((event) => (
                  <EventItem key={event.id} event={event} showDate={false} />
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={CalendarDays}
                title="No events today"
                description="There are no scheduled events for the selected date."
              />
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-foreground">Upcoming Events</h3>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingEvents.slice(0, 5).map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={Clock}
                title="No upcoming events"
                description="Your schedule is clear for the coming days."
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
