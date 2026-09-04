import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckSquare,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";

export const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/classroom", label: "Classroom", icon: GraduationCap },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function CampusLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="h-4.5 w-4.5" aria-hidden />
      </span>
      {!compact && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          Campus<span className="text-primary">OS</span>
        </span>
      )}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
          activeProps={{ className: "font-semibold" }}
        >
          <item.icon className="h-4.5 w-4.5 shrink-0" aria-hidden />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b px-5">
        <CampusLogo />
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <p className="px-3 pt-2 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          Workspace
        </p>
        <SidebarNav />
      </div>
      <div className="border-t p-4">
        <div className="rounded-lg bg-accent p-3">
          <p className="text-xs font-semibold text-accent-foreground">
            Prototype mode
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Showing sample academic data. Connect Google in Settings later.
          </p>
        </div>
      </div>
    </aside>
  );
}
