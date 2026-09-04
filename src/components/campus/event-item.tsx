import { Clock, MapPin } from "lucide-react";
import type { CalendarEvent } from "@/data/types";
import { EventTypeBadge } from "./status-badge";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function EventItem({
  event,
  showDate = true,
}: {
  event: CalendarEvent;
  showDate?: boolean;
}) {
  const borderTone: Record<CalendarEvent["type"], string> = {
    lecture: "border-l-primary",
    lab: "border-l-muted-foreground",
    deadline: "border-l-destructive",
    exam: "border-l-warning",
    meeting: "border-l-success",
  };

  return (
    <li
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-l-4 bg-card px-4 py-3 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        borderTone[event.type],
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {showDate ? <span>{formatDate(event.date)}</span> : null}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {event.time}
            {event.endTime ? `–${event.endTime}` : ""}
          </span>
          {event.location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {event.location}
            </span>
          ) : null}
          {event.courseName ? <span>{event.courseName}</span> : null}
        </div>
      </div>
      <EventTypeBadge type={event.type} className="self-start sm:self-auto" />
    </li>
  );
}
