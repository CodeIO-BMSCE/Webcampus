"use client";

import { UserButton } from "@/modules/auth/user-button/user-button-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@webcampus/ui/components/breadcrumb";
import { Separator } from "@webcampus/ui/components/separator";
import { SidebarTrigger } from "@webcampus/ui/components/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export const SiteHeader = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  console.log(pathNames);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <UserButton />
    </header>
  );
};
