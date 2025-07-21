"use client";

import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@webcampus/ui/components/sidebar";
import { capitalize } from "@webcampus/ui/lib/utils";
import {
  BookCopy,
  BookOpenText,
  Fingerprint,
  LayoutDashboard,
  LifeBuoy,
  Send,
  SquareUserRound,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      url: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Courses",
      url: "/student/courses",
      icon: BookCopy,
    },
    {
      name: "Attendance",
      url: "/student/attendance",
      icon: Fingerprint,
    },
    {
      name: "CIE",
      url: "/student/cie",
      icon: BookOpenText,
    },
    {
      name: "Proctor",
      url: "/student/proctor",
      icon: SquareUserRound,
    },
    {
      name: "Profile",
      url: "/student/profile",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <div className="text-sidebar-primary-foreground relative flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/bmsce.svg"
                    alt="BMSCE Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">BMSCE</span>
                  <span className="truncate text-xs">
                    {capitalize(String(session?.user.role))}
                  </span>
                </div>
              </Link>
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
