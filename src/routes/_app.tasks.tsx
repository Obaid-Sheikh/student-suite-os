import { useState, useMemo, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus, ListChecks, Filter, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { campusService } from "@/services/campusService";
import { TaskItem } from "@/components/campus/task-item";
import { FilterTabs, type FilterOption } from "@/components/campus/filter-tabs";
import { EmptyState, LoadingState } from "@/components/campus/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Task, type TaskPriority } from "@/data/types";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — CampusOS" },
      {
        name: "description",
        content: "Manage your academic tasks and priorities.",
      },
    ],
  }),
  component: TasksPage,
});

type TaskFilter = "all" | "pending" | "completed" | "overdue";

const filterOptions: FilterOption<TaskFilter>[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
];

function TasksPage() {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: campusService.getTasks,
  });

  // Sync local tasks with initial fetch
  useEffect(() => {
    if (tasks && localTasks.length === 0) {
      setLocalTasks(tasks);
    }
  }, [tasks, localTasks.length]);

  const filteredTasks = useMemo(() => {
    return localTasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "all") return true;
      if (filter === "pending") return !t.completed;
      if (filter === "completed") return t.completed;
      if (filter === "overdue") return t.overdue && !t.completed;
      return true;
    });
  }, [localTasks, filter, searchQuery]);

  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Tasks load failed"
          description="We couldn't load your academic tasks. Please try again."
          action={
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: newTaskTitle,
      subject: newTaskSubject || "General",
      dueDate: newTaskDueDate || "No date",
      priority: newTaskPriority,
      completed: false,
      overdue: false,
    };

    setLocalTasks((prev) => [newTask, ...prev]);
    setIsDialogOpen(false);
    toast.success("Task added");

    // Reset form
    setNewTaskTitle("");
    setNewTaskSubject("");
    setNewTaskPriority("medium");
    setNewTaskDueDate("");
  };

  const handleToggleTask = (id: string) => {
    setLocalTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, overdue: !t.completed ? false : t.overdue }
          : t,
      ),
    );
    const task = localTasks.find((t) => t.id === id);
    if (task) {
      toast.success(task.completed ? "Task marked as pending" : "Task marked as complete");
    }
  };

  if (isLoading && localTasks.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tasks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep track of everything you need to get done.
          </p>
        </div>
        <LoadingState rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tasks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep track of everything you need to get done.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddTask}>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task to track your academic progress.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Task Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Finish Math Assignment"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject / Course
                  </label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics III"
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="priority" className="text-sm font-medium">
                      Priority
                    </label>
                    <Select
                      value={newTaskPriority}
                      onValueChange={(v) => setNewTaskPriority(v as TaskPriority)}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Due Date
                    </label>
                    <Input
                      id="date"
                      type="text"
                      placeholder="e.g., Sep 10, 2026"
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterTabs
          options={filterOptions}
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter tasks by status"
        />

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        {filteredTasks.length > 0 ? (
          <ul className="divide-y">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={searchQuery ? Filter : ListChecks}
            title={searchQuery ? "No results found" : "All clear!"}
            description={
              searchQuery
                ? `No tasks matching "${searchQuery}" in ${filter} view.`
                : filter === "all"
                  ? "You don't have any tasks yet. Create one to get started!"
                  : `You don't have any ${filter} tasks right now.`
            }
          />
        )}
      </div>
    </div>
  );
}
