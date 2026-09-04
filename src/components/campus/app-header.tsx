import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CampusLogo, SidebarNav } from "./app-sidebar";
import { campusService } from "@/services/campusService";

export function AppHeader({ title }: { title: string }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: campusService.getProfile,
  });

  if (!profile) return null;

  return (
    <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-16 items-center border-b px-5">
              <CampusLogo />
            </div>
            <div className="p-3">
              <SidebarNav onNavigate={() => setMobileNavOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {title}
          </h1>
        </div>

        <div className="hidden items-center md:flex">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search courses, tasks, events"
              className="w-64 pl-9"
              aria-label="Search CampusOS"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Search"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((v) => !v)}
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {profile.avatarInitials}
              </span>
              <span className="hidden text-sm font-medium text-foreground sm:block">
                {profile.name}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <span className="block text-sm font-medium">{profile.name}</span>
              <span className="block text-xs font-normal text-muted-foreground">
                {profile.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile</DropdownMenuItem>
            <DropdownMenuItem disabled>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {searchOpen ? (
        <div className="border-t p-3 md:hidden">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search courses, tasks, events"
              className="pl-9"
              aria-label="Search CampusOS"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
