import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "warning" | "destructive" | "success";
}) {
  const tones = {
    default: "bg-accent text-accent-foreground",
    warning: "bg-warning/18 text-warning-foreground",
    destructive: "bg-destructive/12 text-destructive",
    success: "bg-success/12 text-success",
  } as const;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-card transition-shadow hover:shadow-lift sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            tones[tone],
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
