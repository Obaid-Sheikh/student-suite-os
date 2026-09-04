import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, BookOpen, Filter, AlertCircle } from "lucide-react";
import { campusService } from "@/services/campusService";
import { CourseCard } from "@/components/campus/course-card";
import { FilterTabs, type FilterOption } from "@/components/campus/filter-tabs";
import { StatusBadge, PriorityBadge } from "@/components/campus/status-badge";
import { EmptyState, LoadingState } from "@/components/campus/states";
import { Button } from "@/components/ui/button";
import { type TaskStatus } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/classroom")({
  head: () => ({
    meta: [
      { title: "Google Classroom — CampusOS" },
      {
        name: "description",
        content: "Your Google Classroom courses and assignments in one place.",
      },
    ],
  }),
  component: ClassroomPage,
});

const filterOptions: FilterOption<TaskStatus | "all">[] = [
  { value: "all", label: "All" },
  { value: "not-started", label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "submitted", label: "Submitted" },
  { value: "overdue", label: "Overdue" },
];

function ClassroomPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: campusService.getCourses,
  });

  const {
    data: assignments,
    isLoading: assignmentsLoading,
    isError: assignmentsError,
  } = useQuery({
    queryKey: ["assignments"],
    queryFn: campusService.getAssignments,
  });

  if (coursesError || assignmentsError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Classroom load failed"
          description="We couldn't load your course data. Please try again."
          action={
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (coursesLoading || assignmentsLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Google Classroom
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your courses and classwork in one place.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-xl border bg-card animate-pulse" />
          ))}
        </div>
        <LoadingState rows={5} />
      </div>
    );
  }

  const filteredAssignments = assignments?.filter(
    (a) => statusFilter === "all" || a.status === statusFilter,
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Google Classroom
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your courses and classwork in one place.
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium text-foreground">Your Courses</h3>
        </div>
        {courses && courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No courses found"
            description="You don't have any active courses in your Google Classroom."
          />
        )}
      </section>

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium text-foreground">Recent Classwork</h3>
          </div>
          <FilterTabs
            options={filterOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            ariaLabel="Filter assignments by status"
          />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          {filteredAssignments && filteredAssignments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Assignment
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Course
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
                      Priority
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
                      Status
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id} className="transition-colors hover:bg-secondary/60">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-foreground">{assignment.title}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <PriorityBadge priority={assignment.priority} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <StatusBadge status={assignment.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <p className="text-sm text-muted-foreground tabular-nums">
                          {assignment.dueDate}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={Filter}
              title="No assignments match the filter"
              description="Try changing your filter to see more classwork."
            />
          )}
        </div>
      </section>
    </div>
  );
}
