import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckSquare,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusOS — One workspace for your academic life" },
      {
        name: "description",
        content:
          "CampusOS brings your courses, assignments, schedule and deadlines into a single calm student workspace.",
      },
      { property: "og:title", content: "CampusOS — One workspace for your academic life" },
      {
        property: "og:description",
        content:
          "Courses, classwork, calendar and tasks in one organized student workspace.",
      },
    ],
  }),
  component: Landing,
});

const highlights = [
  {
    icon: GraduationCap,
    title: "Courses & classwork",
    text: "Every course, instructor and pending assignment in one list.",
  },
  {
    icon: CalendarDays,
    title: "Academic calendar",
    text: "Lectures, labs, exams and deadlines on a single timeline.",
  },
  {
    icon: CheckSquare,
    title: "Tasks that stay clear",
    text: "Priorities and due dates so nothing slips past you.",
  },
];

function Landing() {
  return (
    <div className="campus-grid-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4.5 w-4.5" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-tight">
              Campus<span className="text-primary">OS</span>
            </span>
          </span>
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Preview workspace</Link>
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Student academic workspace
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Your whole semester, in one calm place.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              CampusOS brings your courses, assignments, schedules and academic
              deadlines into one organized workspace — so you stop switching
              between five different tabs to answer one simple question.
            </p>

            <div className="mt-8 max-w-sm">
              <Button size="lg" className="w-full gap-3" asChild>
                <Link to="/dashboard">
                  <GoogleGlyph />
                  Continue with Google
                </Link>
              </Button>
              <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                Connect your school Google account to sync Classroom courses and
                Calendar events. This prototype opens the workspace with sample
                data — no account is connected yet.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-lift sm:p-8">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              What lives inside
            </p>
            <ul className="mt-5 space-y-5">
              {highlights.map((h) => (
                <li key={h.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <h.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {h.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {h.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-5">
              <p className="text-sm text-muted-foreground">
                Built for students who want one honest answer to “what do I need
                to do today?”
              </p>
            </div>
          </div>
        </div>

        <footer className="border-t pt-5 pb-2 text-xs text-muted-foreground">
          CampusOS · early prototype
        </footer>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.44-1.72 4.2-5.5 4.2A6.3 6.3 0 1 1 16.1 7.1l2.8-2.7A10 10 0 1 0 12 22c5.77 0 9.6-4.05 9.6-9.76 0-.66-.07-1.3-.17-2.04z"
      />
      <path
        fill="#FBBC05"
        d="M12 22c-4.1 0-7.63-2.35-9.35-5.78l3.3-2.55A6.3 6.3 0 0 0 12 18.3z"
      />
      <path fill="#4285F4" d="M21.43 10.2H12v3.9h5.5c-.3 1.8-1.9 4.2-5.5 4.2V22c5.77 0 9.6-4.05 9.6-9.76 0-.66-.07-1.3-.17-2.04z" />
      <path fill="#34A853" d="M12 18.3a6.3 6.3 0 0 1-6.05-4.63l-3.3 2.55A11 11 0 0 0 12 22z" />
    </svg>
  );
}
