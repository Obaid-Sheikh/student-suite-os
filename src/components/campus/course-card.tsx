import { GraduationCap, User } from "lucide-react";
import type { Course } from "@/data/types";
import { cn } from "@/lib/utils";

const accentBar: Record<Course["accent"], string> = {
  indigo: "bg-primary",
  teal: "bg-success",
  amber: "bg-warning",
  rose: "bg-destructive",
  violet: "bg-accent-foreground",
};

export function CourseCard({ course }: { course: Course }) {
  const progress =
    course.totalAssignments === 0
      ? 0
      : Math.round(
          ((course.totalAssignments - course.pendingAssignments) /
            course.totalAssignments) *
            100,
        );

  return (
    <article className="group overflow-hidden rounded-xl border bg-card shadow-card transition-shadow hover:shadow-lift">
      <div className={cn("h-1.5 w-full", accentBar[course.accent])} aria-hidden />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {course.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              {course.code} · {course.section}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <GraduationCap className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" aria-hidden />
          {course.instructor}
        </p>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full", accentBar[course.accent])}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span
            className={cn(
              "font-medium",
              course.pendingAssignments > 0
                ? "text-foreground"
                : "text-success",
            )}
          >
            {course.pendingAssignments > 0
              ? `${course.pendingAssignments} pending`
              : "All caught up"}
          </span>
          <span className="text-xs text-muted-foreground">
            {course.totalAssignments} total
          </span>
        </div>
      </div>
    </article>
  );
}
