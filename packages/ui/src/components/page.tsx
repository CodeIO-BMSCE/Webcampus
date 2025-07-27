"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { capitalize } from "../lib/utils";

interface PageProps {
  children: React.ReactNode;
}

interface PageHeaderProps {
  children: React.ReactNode;
  title?: string;
}

interface PageContentProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return <div>{children}</div>;
};

export const PageHeader = ({ children, title }: PageHeaderProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const pageTitle = pathSegments[pathSegments.length - 1];

  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-xl font-semibold">
        {capitalize(title || pageTitle!)}
      </h1>
      {children}
    </div>
  );
};

export const PageContent = ({ children }: PageContentProps) => {
  return <div>{children}</div>;
};
