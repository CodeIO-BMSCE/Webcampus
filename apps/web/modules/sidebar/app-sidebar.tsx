"use client";

import { authClient } from "@/lib/auth-client";
import { Role } from "@webcampus/types/rbac";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@webcampus/ui/components/sidebar";
import { capitalize } from "@webcampus/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { sidebarConfig } from "./sidebar-config";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <SidebarSkeleton />;
  }
  const { navMain, navSecondary } = sidebarConfig[session?.user.role as Role];

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
        <NavMain items={navMain.items} />
        <NavSecondary items={navSecondary.items} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}

const SidebarSkeleton = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex animate-pulse items-center gap-2 rounded-md p-2">
              <div className="bg-sidebar-accent relative flex aspect-square size-8 items-center justify-center rounded-lg">
                <div className="bg-sidebar-accent-foreground/20 size-5 rounded" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="bg-sidebar-foreground/20 mb-1 h-4 w-16 rounded" />
                <div className="bg-sidebar-foreground/10 h-3 w-12 rounded" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main navigation with proper spacing */}
        <div className="space-y-1 p-2">
          <div className="px-2 py-1">
            <div className="bg-sidebar-foreground/10 h-3 w-16 animate-pulse rounded" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-3 rounded-md px-3 py-2"
            >
              <div className="bg-sidebar-foreground/20 size-4 rounded" />
              <div className="bg-sidebar-foreground/20 h-4 flex-1 rounded" />
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Secondary navigation */}
        <div className="space-y-1 p-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-3 rounded-md px-3 py-2"
            >
              <div className="bg-sidebar-foreground/10 size-4 rounded" />
              <div className="bg-sidebar-foreground/10 h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
