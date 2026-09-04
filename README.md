# Campus Hub

Context

I need a modern student academic workspace called CampusOS.

This is a frontend prototype for a larger project. The purpose of this prototype is to create the complete frontend experience first, while keeping backend integrations modular so Firebase Authentication, Firestore, Google Classroom API, and Google Calendar API can be connected later.

CampusOS is intended to bring a student's academic information into one organized workspace instead of forcing them to switch between multiple platforms.

For this first implementation, focus primarily on the frontend experience, component architecture, navigation, responsive behavior, and realistic mock data.

Do NOT implement AI, RAG, vector databases, PDF processing, Google Drive, or n8n.

Task

Build the frontend of CampusOS as a polished, modern, responsive student productivity dashboard.

Create the following pages:

Landing / Login

Dashboard

Google Classroom

Calendar

Tasks

The application should feel like a cohesive product rather than a collection of unrelated pages.

Use realistic mock data for now. Structure the code so that the mock data can later be replaced by Firebase and Google API services without redesigning the UI.

Tech Stack

React

Vite

TypeScript

Tailwind CSS

shadcn/ui where appropriate

Lucide React icons

React Router if routing is required

Do not introduce unnecessary frameworks or dependencies.

Do not implement Firebase or Google API authentication in this first frontend phase. Create clean service/data boundaries so those integrations can be added later.

Product Structure

1. Landing / Login

Create a minimal but polished CampusOS welcome screen.

Include:

CampusOS logo/wordmark

Short value proposition

Brief explanation that CampusOS brings courses, assignments, schedules, and academic information into one workspace

Primary "Continue with Google" button

Small supporting text about connecting a Google account

The login page should feel modern and trustworthy rather than like a generic authentication template.

Use a subtle academic/productivity visual treatment in the background without using stock photography.

The Google login button is currently UI-only and should not perform real authentication.

2. Dashboard

The dashboard is the main screen.

Create a left sidebar on desktop and a mobile-friendly navigation pattern on smaller screens.

Sidebar navigation:

Overview

Classroom

Calendar

Tasks

Settings

Top header:

Page title / contextual greeting

Search icon or search field

Notification icon

User avatar

User name

Small dropdown indicator

Main dashboard content:

Greeting

Show:

"Good morning, Obaid 👋"

and:

"Here's what's happening with your academics today."

Use a generic mock student profile so this can later be replaced by Firebase Auth data.

Overview statistics

Create four compact summary cards:

Active Courses

Pending Tasks

Today's Events

Upcoming Deadlines

Use realistic numbers.

Today's Schedule

Create a timeline/list showing several classes or academic events.

Each item should contain:

time

title

course

location

optional status indicator

Upcoming Tasks

Show a compact list of upcoming assignments.

Each task should contain:

assignment title

subject

due date

priority/status

Classroom Snapshot

Show a few Google Classroom courses.

Each card/list item should show:

course name

teacher

number of pending assignments

subtle course identifier

Upcoming Calendar

Show the next few calendar events.

Include:

event title

date

time

event type

The dashboard should prioritize information hierarchy and quick scanning.

3. Google Classroom Page

Create a dedicated Classroom page representing the future Google Classroom integration.

Header:

"Google Classroom"

Supporting text:

"Your courses and classwork in one place."

Include:

Course cards

Display realistic courses such as:

Data Structures

Java Programming

Mathematics

Entrepreneurship

Each course card should show:

course name

course code

instructor

pending assignment count

total assignment count

subtle course visual identity

Recent Classwork

Create a list/table of assignments.

Each item:

assignment title

course

due date

status

priority

Statuses can include:

Not started

In progress

Submitted

Overdue

Use badges consistently.

Add filtering controls for:

All

Pending

Submitted

Overdue

These controls can work entirely on mock data for now.

4. Calendar Page

Create a dedicated academic calendar page.

The purpose is to represent the future Google Calendar integration.

Include:

Page header

Current date

Month/week/day controls

Simple calendar visualization

Upcoming event list

Use realistic academic events:

lectures

labs

assignment deadlines

exams

project meetings

The calendar does not need to be extremely complex. Prioritize a polished, readable experience.

Use a clean event system where different event types can be visually distinguished without relying only on color.

5. Tasks Page

Create a dedicated task management page.

Header:

"Tasks"

Supporting text:

"Keep track of everything you need to get done."

Include:

task statistics

filter controls

task list

priority indicators

due dates

completion status

Allow the mock interface to demonstrate:

pending tasks

completed tasks

overdue tasks

Include a visually clear "Add Task" button.

The add-task interaction can use a modal/dialog and local frontend state only.

Do not connect it to Firebase yet.

6. Settings Page

Create a simple settings screen accessible from the sidebar.

Include:

Profile

Connected accounts

Appearance

Notifications

For Connected Accounts, show:

Google Account
"Not connected" or a realistic mock connected state.

Make it clear that Google integrations will eventually be connected here.

Do not implement the real OAuth flow yet.

Navigation

Implement working frontend navigation between:

Overview

Classroom

Calendar

Tasks

Settings

The active navigation item should be visually obvious.

Use smooth but subtle transitions.

Avoid excessive animations.

Design System

The visual direction should be:

Modern academic productivity workspace.

Avoid making this look like:

a school ERP

an admin dashboard

a generic SaaS template

a social media application

The interface should feel similar in quality to modern productivity applications.

Colors

Use a restrained palette:

Deep indigo / blue-violet as the primary accent

Very light cool-gray background

White surfaces

Dark slate typography

Muted gray secondary text

Subtle green for success

Subtle amber for warnings

Subtle red for overdue/error states

Avoid excessive gradients.

Avoid neon colors.

Avoid excessive glassmorphism.

Typography

Use a clean modern sans-serif such as Inter.

Create strong hierarchy between:

page titles

section headings

card titles

metadata

labels

Components

Use reusable components for:

Sidebar

Header

StatCard

CourseCard

TaskItem

EventItem

StatusBadge

EmptyState

LoadingState

Modal/Dialog

Filter controls

Do not duplicate UI unnecessarily.

Layout

Desktop:

Use a persistent left sidebar with a spacious main content area.

Tablet:

Collapse the sidebar appropriately.

Mobile:

Use a mobile-first layout with a compact header and mobile navigation.

All pages must remain usable at standard Tailwind breakpoints.

Do not create unnecessary custom breakpoints.

Ensure tables/lists become mobile-friendly rather than overflowing horizontally wherever possible.

UX Guidelines

Prioritize:

Clear information hierarchy

Fast scanning

Consistent spacing

Consistent component behavior

Accessible contrast

Clear interactive states

Responsive design

Use:

hover states

focus states

disabled states

loading states

empty states

where appropriate.

Do not over-animate the interface.

The application should feel fast and calm.

Data Architecture

Use realistic mock data in a dedicated data layer rather than scattering hardcoded data throughout components.

Create clear structures for:

student profile

courses

tasks

calendar events

classroom assignments

Keep the data model structured so it can later be replaced with:

Firebase Authentication → user profile

Firestore → application data

Google Classroom API → courses/classwork

Google Calendar API → calendar events

Do not tightly couple UI components directly to future APIs.

Important Constraints

This is a frontend-first prototype.

DO NOT implement:

Firebase Authentication

Firestore

Google OAuth

Google Classroom API

Google Calendar API

Google Drive

AI assistant

RAG

vector database

PDF processing

n8n

payment systems

admin dashboard

Instead, create the UI and clean integration boundaries needed to add these later.

The "Continue with Google" button should be a visual placeholder for now.

Implementation Guidelines

Build this systematically.

Start with:

Application shell

Global design system

Sidebar and header

Dashboard

Classroom page

Calendar page

Tasks page

Settings page

Responsive behavior

Final consistency pass

Use reusable components and avoid duplicated code.

Do not over-engineer the application.

Do not add features that are not requested.

Before making major architectural decisions, prioritize maintainability and the ability to connect real Firebase and Google API services later.

Final Quality Bar

The result should look like a real early-stage product that could be demonstrated at a hackathon.

It should be:

polished

minimal

modern

responsive

cohesive

easy to navigate

information-focused

Do not make the interface visually overwhelming.

The primary goal is to make the student immediately understand:

"This is one place where I can see my academic life."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6e179326-a8d7-480b-a031-b43b3c8c9ce6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
