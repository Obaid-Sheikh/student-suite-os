import { cn } from "@/lib/utils";
import type { EventType, TaskPriority, TaskStatus } from "@/data/types";
import { CircleDashed, Clock3, CheckCircle2, AlertTriangle } from "lucide-react";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";

const statusStyles: Record<TaskStatus, string> = {
  "not-started": "border-border bg-muted text-muted-foreground",
  "in-progress": "border-accent bg-accent text-accent-foreground",
  submitted: "border-transparent bg-success/12 text-success [&_svg]:text-success",
  overdue: "border-transparent bg-destructive/12 text-destructive [&_svg]:text-destructive",
};

const statusLabels: Record<TaskStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  submitted: "Submitted",
  overdue: "Overdue",
};

const statusIcons: Record<TaskStatus, typeof CircleDashed> = {
  "not-started": CircleDashed,
  "in-progress": Clock3,
  submitted: CheckCircle2,
  overdue: AlertTriangle,
};

export function StatusBadge({ status, className }: { status: TaskStatus; className?: string }) {
  const Icon = statusIcons[status];
  return (
    <span className={cn(base, statusStyles[status], className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {statusLabels[status]}
    </span>
  );
}

const priorityStyles: Record<TaskPriority, string> = {
  low: "border-border bg-secondary text-secondary-foreground",
  medium: "border-transparent bg-warning/18 text-warning-foreground",
  high: "border-transparent bg-destructive/12 text-destructive",
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: TaskPriority;
  className?: string;
}) {
  return (
    <span className={cn(base, priorityStyles[priority], className)}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          priority === "high" && "bg-destructive",
          priority === "medium" && "bg-warning",
          priority === "low" && "bg-muted-foreground",
        )}
        aria-hidden
      />
      {priority === "high" ? "High" : priority === "medium" ? "Medium" : "Low"}
    </span>
  );
}

export const eventTypeLabels: Record<EventType, string> = {
  lecture: "Lecture",
  lab: "Lab",
  deadline: "Deadline",
  exam: "Exam",
  meeting: "Meeting",
};

export function EventTypeBadge({ type, className }: { type: EventType; className?: string }) {
  const styles: Record<EventType, string> = {
    lecture: "border-accent bg-accent text-accent-foreground",
    lab: "border-border bg-secondary text-secondary-foreground",
    deadline: "border-transparent bg-destructive/12 text-destructive",
    exam: "border-transparent bg-warning/18 text-warning-foreground",
    meeting: "border-transparent bg-success/12 text-success",
  };
  const glyphs: Record<EventType, string> = {
    lecture: "▤",
    lab: "◈",
    deadline: "▲",
    exam: "★",
    meeting: "●",
  };
  return (
    <span className={cn(base, styles[type], className)}>
      <span aria-hidden className="text-[10px] leading-none">
        {glyphs[type]}
      </span>
      {eventTypeLabels[type]}
    </span>
  );
}
