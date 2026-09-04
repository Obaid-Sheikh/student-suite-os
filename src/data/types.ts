/**
 * Domain types for CampusOS.
 *
 * These shapes are intentionally close to the payloads that the future
 * backends will provide, so the UI never has to change:
 *   StudentProfile   -> Firebase Authentication + Firestore user document
 *   Course           -> Google Classroom `courses`
 *   Assignment       -> Google Classroom `courseWork` + submission state
 *   CalendarEvent    -> Google Calendar `events`
 *   Task             -> Firestore `tasks` collection
 */

export type TaskStatus = "not-started" | "in-progress" | "submitted" | "overdue";
export type TaskPriority = "low" | "medium" | "high";
export type EventType = "lecture" | "lab" | "deadline" | "exam" | "meeting";

export interface StudentProfile {
  id: string;
  name: string;
  firstName: string;
  email: string;
  program: string;
  year: string;
  avatarInitials: string;
  googleConnected: boolean;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  section: string;
  pendingAssignments: number;
  totalAssignments: number;
  /** Stable visual identity token used by the UI (not a raw color class). */
  accent: "indigo" | "teal" | "amber" | "rose" | "violet";
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  overdue: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  courseName?: string;
  date: string;
  time: string;
  endTime?: string;
  location?: string;
  type: EventType;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  courseName: string;
  location: string;
  status: "done" | "now" | "upcoming";
}

export interface OverviewStats {
  activeCourses: number;
  pendingTasks: number;
  todaysEvents: number;
  upcomingDeadlines: number;
}
