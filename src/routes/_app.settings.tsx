import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  ShieldCheck,
  Palette,
  Bell,
  LogOut,
  ExternalLink,
  Smartphone,
  Globe,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { campusService } from "@/services/campusService";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CampusOS" },
      {
        name: "description",
        content: "Manage your CampusOS profile and preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card shadow-card overflow-hidden">
      <div className="flex items-center gap-2.5 border-b px-5 py-4">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function SettingsPage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: campusService.getProfile,
  });

  const [notifications, setNotifications] = useState({
    assignments: true,
    exams: true,
    deadlines: true,
    announcements: false,
  });

  const [appearance, setAppearance] = useState({
    compactMode: false,
    showScheduleTimeline: true,
  });

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preference updated");
  };

  const handleToggleAppearance = (key: keyof typeof appearance) => {
    setAppearance((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Appearance preference updated");
  };

  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Settings load failed"
          description="We couldn't load your profile settings. Please try again."
          action={
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Settings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your CampusOS profile and preferences.
          </p>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl border bg-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your CampusOS profile and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <SettingsSection title="Profile" icon={User}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {profile?.avatarInitials}
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-lg font-semibold text-foreground">{profile?.name}</h4>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {profile?.program}
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {profile?.year}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              Edit Profile
            </Button>
          </div>
        </SettingsSection>

        <SettingsSection title="Connected Accounts" icon={ShieldCheck}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.5c-.24 1.44-1.72 4.2-5.5 4.2A6.3 6.3 0 1 1 16.1 7.1l2.8-2.7A10 10 0 1 0 12 22c5.77 0 9.6-4.05 9.6-9.76 0-.66-.07-1.3-.17-2.04z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12 22c-4.1 0-7.63-2.35-9.35-5.78l3.3-2.55A6.3 6.3 0 0 0 12 18.3z"
                    />
                    <path
                      fill="#4285F4"
                      d="M21.43 10.2H12v3.9h5.5c-.3 1.8-1.9 4.2-5.5 4.2V22c5.77 0 9.6-4.05 9.6-9.76 0-.66-.07-1.3-.17-2.04z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 18.3a6.3 6.3 0 0 1-6.05-4.63l-3.3 2.55A11 11 0 0 0 12 22z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Google Account</p>
                  <p className="text-xs text-muted-foreground">
                    {profile?.googleConnected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button
                variant={profile?.googleConnected ? "outline" : "default"}
                size="sm"
                className="gap-2"
                onClick={() => toast.info("Google OAuth is not implemented in this prototype.")}
              >
                {profile?.googleConnected ? "Disconnect" : "Connect Google"}
              </Button>
            </div>
            <div className="rounded-lg bg-accent p-4 text-xs text-muted-foreground">
              <p className="flex items-start gap-2">
                <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Connecting your Google account will allow CampusOS to sync your Classroom courses,
                assignments, and Calendar events. This is currently a mock connection.
              </p>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Appearance" icon={Palette}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Compact Mode</p>
                <p className="text-xs text-muted-foreground">Reduce spacing and padding in lists</p>
              </div>
              <Switch
                checked={appearance.compactMode}
                onCheckedChange={() => handleToggleAppearance("compactMode")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Show Schedule Timeline</p>
                <p className="text-xs text-muted-foreground">
                  Display a vertical timeline on the dashboard
                </p>
              </div>
              <Switch
                checked={appearance.showScheduleTimeline}
                onCheckedChange={() => handleToggleAppearance("showScheduleTimeline")}
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Notifications" icon={Bell}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">New Assignments</p>
                <p className="text-xs text-muted-foreground">
                  Notify when a new assignment is posted
                </p>
              </div>
              <Switch
                checked={notifications.assignments}
                onCheckedChange={() => handleToggleNotification("assignments")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Upcoming Exams</p>
                <p className="text-xs text-muted-foreground">
                  Alerts for upcoming midterm and final exams
                </p>
              </div>
              <Switch
                checked={notifications.exams}
                onCheckedChange={() => handleToggleNotification("exams")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Assignment Deadlines</p>
                <p className="text-xs text-muted-foreground">
                  Reminders before assignments are due
                </p>
              </div>
              <Switch
                checked={notifications.deadlines}
                onCheckedChange={() => handleToggleNotification("deadlines")}
              />
            </div>
          </div>
        </SettingsSection>

        <section className="rounded-xl border border-destructive/20 bg-destructive/5 overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-destructive/10 px-5 py-4">
            <LogOut className="h-5 w-5 text-destructive" />
            <h3 className="text-sm font-semibold text-destructive">Sign Out</h3>
          </div>
          <div className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Log out of CampusOS</p>
                <p className="text-xs text-muted-foreground">
                  You are currently using a prototype student account.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={() => toast.info("Sign out is not available in this prototype.")}
              >
                Sign out
              </Button>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-muted-foreground pt-4">
          <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Globe className="h-3.5 w-3.5" />
            Privacy Policy
            <ExternalLink className="h-3 w-3" />
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <ShieldCheck className="h-3.5 w-3.5" />
            Terms of Service
            <ExternalLink className="h-3 w-3" />
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Smartphone className="h-3.5 w-3.5" />
            CampusOS v0.1.0-prototype
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
