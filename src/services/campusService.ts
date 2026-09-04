/**
 * Data access boundary for CampusOS.
 *
 * Components never import mock data directly — they call these functions.
 * Later, each function body can be swapped for its real source:
 *   getProfile        -> Firebase Authentication / Firestore user doc
 *   getCourses        -> Google Classroom API (courses.list)
 *   getAssignments    -> Google Classroom API (courseWork.list)
 *   getCalendarEvents -> Google Calendar API (events.list)
 *   getTasks          -> Firestore tasks collection
 * The signatures are already async so no component needs to change.
 */

import {
  mockAssignments,
  mockCourses,
  mockEvents,
  mockProfile,
  mockSchedule,
  mockStats,
  mockTasks,
} from "@/data/mock";
import type {
  Assignment,
  CalendarEvent,
  Course,
  OverviewStats,
  ScheduleItem,
  StudentProfile,
  Task,
} from "@/data/types";

export const campusService = {
  getProfile: async (): Promise<StudentProfile> => mockProfile,
  getStats: async (): Promise<OverviewStats> => mockStats,
  getCourses: async (): Promise<Course[]> => mockCourses,
  getAssignments: async (): Promise<Assignment[]> => mockAssignments,
  getTasks: async (): Promise<Task[]> => mockTasks,
  getCalendarEvents: async (): Promise<CalendarEvent[]> => mockEvents,
  getTodaySchedule: async (): Promise<ScheduleItem[]> => mockSchedule,
};

/** Synchronous snapshots used by this frontend-only prototype. */
export const snapshot = {
  profile: mockProfile,
  stats: mockStats,
  courses: mockCourses,
  assignments: mockAssignments,
  tasks: mockTasks,
  events: mockEvents,
  schedule: mockSchedule,
};
