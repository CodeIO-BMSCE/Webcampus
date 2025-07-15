"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@webcampus/ui/components/sidebar";
import {
  BookCopy,
  BookOpenText,
  Command,
  Fingerprint,
  LayoutDashboard,
  LifeBuoy,
  Send,
  SquareUserRound,
  User,
} from "lucide-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

const data = {
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      name: "Courses",
      url: "#",
      icon: BookCopy,
    },
    {
      name: "Attendance",
      url: "#",
      icon: Fingerprint,
    },
    {
      name: "CIE",
      url: "#",
      icon: BookOpenText,
    },
    {
      name: "Proctor",
      url: "#",
      icon: SquareUserRound,
    },
    {
      name: "Profile",
      url: "#",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">BMSCE</span>
                  <span className="truncate text-xs">Student</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
