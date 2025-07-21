import { LucideIcon } from "lucide-react";

export interface NavMainProps {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export interface NavSecondaryProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export interface SidebarData {
  navMain: NavMainProps;
  navSecondary: NavSecondaryProps;
}
