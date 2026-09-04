import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlarmClock,
  ArrowRight,
  CalendarClock,
  CheckSquare,
  GraduationCap,
  ListChecks,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "@/components/campus/stat-card";
import { TaskItem } from "@/components/campus/task-item";
import { EventItem } from "@/components/campus/event-item";
import { EmptyState, LoadingState } from "@/components/campus/states";
import { campusService } from "@/services/campusService";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Overview — CampusOS" },
      {
        name: "description",
        content:
          "Your academic day at a glance: today's schedule, upcoming tasks, courses and deadlines.",
      },
      { property: "og:title", content: "Overview — CampusOS" },
      {
        property: "og:description",
        content: "Today's schedule, upcoming tasks, courses and deadlines in one view.",
      },
    ],
  }),
  component: DashboardPage,
});

function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border bg-card shadow-card", className)}>
      <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ViewAll({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}

function DashboardPage() {
  const { data: profile, isError: profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: campusService.getProfile,
  });

  const { data: stats, isError: statsError } = useQuery({
    queryKey: ["stats"],
    queryFn: campusService.getStats,
  });

  const { data: schedule, isError: scheduleError } = useQuery({
    queryKey: ["schedule"],
    queryFn: campusService.getTodaySchedule,
  });

  const { data: tasks, isError: tasksError } = useQuery({
    queryKey: ["tasks"],
    queryFn: campusService.getTasks,
  });

  const { data: courses, isError: coursesError } = useQuery({
    queryKey: ["courses"],
    queryFn: campusService.getCourses,
  });

  const { data: events, isError: eventsError } = useQuery({
    queryKey: ["events"],
    queryFn: campusService.getCalendarEvents,
  });

  const isLoading = !profile || !stats || !schedule || !tasks || !courses || !events;
  const isError =
    profileError || statsError || scheduleError || tasksError || coursesError || eventsError;

  if (isError) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Something went wrong"
          description="We couldn't load your dashboard data. Please try again later."
          action={
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Retry
            </button>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 w-1/3 animate-pulse rounded-lg bg-muted" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl border bg-card animate-pulse" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 h-64 rounded-xl border bg-card animate-pulse" />
          <div className="h-64 rounded-xl border bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  const upcomingTasks = tasks.filter((t) => !t.completed).slice(0, 4);
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Good morning, {profile.firstName} 👋
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening with your academics today.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Active courses"
          value={stats.activeCourses}
          hint="This semester"
          icon={GraduationCap}
        />
        <StatCard
          label="Pending tasks"
          value={stats.pendingTasks}
          hint="2 due this week"
          icon={CheckSquare}
          tone="warning"
        />
        <StatCard
          label="Today's events"
          value={stats.todaysEvents}
          hint="Next at 10:15"
          icon={CalendarClock}
          tone="success"
        />
        <StatCard
          label="Upcoming deadlines"
          value={stats.upcomingDeadlines}
          hint="Within 7 days"
          icon={AlarmClock}
          tone="destructive"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Today's schedule"
          description={todayFormatted}
          className="lg:col-span-2"
          action={<ViewAll to="/calendar" label="Calendar" />}
        >
          <ol className="divide-y">
            {schedule.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 px-5 py-3.5 transition-colors hover:bg-secondary/60"
              >
                <div className="w-14 shrink-0 pt-0.5 text-sm font-medium text-muted-foreground tabular-nums">
                  {item.time}
                </div>
                <div className="relative flex shrink-0 flex-col items-center">
                  <span
                    className={cn(
                      "mt-1.5 h-2.5 w-2.5 rounded-full ring-4",
                      item.status === "now"
                        ? "bg-primary ring-accent"
                        : item.status === "done"
                          ? "bg-muted-foreground/50 ring-secondary"
                          : "bg-border ring-secondary",
                    )}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        item.status === "done" ? "text-muted-foreground" : "text-foreground",
                      )}
                    >
                      {item.title}
                    </p>
                    {item.status === "now" ? (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                        Now
                      </span>
                    ) : null}
                    {item.status === "done" ? (
                      <span className="text-[11px] font-medium text-muted-foreground">Done</span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.courseName} · {item.location}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>

        <SectionCard
          title="Upcoming tasks"
          description="Next few things due"
          action={<ViewAll to="/tasks" label="All tasks" />}
        >
          {upcomingTasks.length === 0 ? (
            <EmptyState
              icon={ListChecks}
              title="Nothing pending"
              description="You're all caught up for now."
            />
          ) : (
            <ul>
              {upcomingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Classroom snapshot"
          description="Courses with open classwork"
          action={<ViewAll to="/classroom" label="Classroom" />}
        >
          <ul className="divide-y">
            {courses.map((course) => (
              <li
                key={course.id}
                className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-semibold text-accent-foreground">
                  {course.code.split("-")[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{course.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {course.instructor} · {course.code}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 text-xs font-medium",
                    course.pendingAssignments > 0 ? "text-foreground" : "text-success",
                  )}
                >
                  {course.pendingAssignments > 0 ? `${course.pendingAssignments} pending` : "Clear"}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Upcoming calendar"
          description="Next events on your schedule"
          action={<ViewAll to="/calendar" label="Calendar" />}
        >
          <ul className="space-y-2 p-4">
            {events.slice(0, 4).map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
