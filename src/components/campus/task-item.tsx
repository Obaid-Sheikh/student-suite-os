import { CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PriorityBadge } from "./status-badge";
import type { Task } from "@/data/types";
import { cn } from "@/lib/utils";

export function TaskItem({ task, onToggle }: { task: Task; onToggle?: (id: string) => void }) {
  return (
    <li className="flex flex-col gap-3 border-b px-4 py-3.5 last:border-b-0 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {onToggle ? (
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
            className="mt-0.5"
          />
        ) : (
          <span
            className={cn(
              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
              task.overdue
                ? "bg-destructive"
                : task.priority === "high"
                  ? "bg-warning"
                  : "bg-primary",
            )}
            aria-hidden
          />
        )}
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm font-medium text-foreground",
              task.completed && "text-muted-foreground line-through",
            )}
          >
            {task.title}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{task.subject}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pl-8 sm:justify-end sm:pl-0">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs",
            task.overdue && !task.completed
              ? "font-medium text-destructive"
              : "text-muted-foreground",
          )}
        >
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          {task.dueDate}
        </span>
        <PriorityBadge priority={task.priority} />
      </div>
    </li>
  );
}
