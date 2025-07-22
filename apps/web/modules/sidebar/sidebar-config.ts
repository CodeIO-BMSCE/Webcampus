import { Role } from "@webcampus/types/rbac";
import {
  BookCopy,
  BookOpenText,
  Building,
  CalendarDays,
  Fingerprint,
  GraduationCap,
  LayoutDashboard,
  Library,
  LifeBuoy,
  Send,
  User,
  Users,
  UserSearch,
} from "lucide-react";
import { NavSecondaryProps, SidebarData } from "./sidebar-types";

const navSecondary: NavSecondaryProps = {
  items: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
};

export const sidebarConfig: Record<Role, SidebarData> = {
  admin: {
    navMain: {
      items: [
        {
          name: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Faculty",
          url: "/admin/faculty",
          icon: Users,
        },
        {
          name: "Department",
          url: "/admin/department",
          icon: Building,
        },
        {
          name: "Semester",
          url: "/admin/semester",
          icon: CalendarDays,
        },
      ],
    },
    navSecondary,
  },
  department: {
    navMain: {
      items: [
        {
          name: "Dashboard",
          url: "/department/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Faculty",
          url: "/department/faculty",
          icon: Users,
        },
        {
          name: "Student",
          url: "/department/student",
          icon: GraduationCap,
        },
        {
          name: "Courses",
          url: "/department/courses",
          icon: Library,
        },
        {
          name: "Sections",
          url: "/department/sections",
          icon: UserSearch,
        },
      ],
    },
    navSecondary,
  },
  student: {
    navMain: {
      items: [
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
          name: "Profile",
          url: "/student/profile",
          icon: User,
        },
      ],
    },
    navSecondary,
  },
  faculty: {
    navMain: {
      items: [
        {
          name: "Dashboard",
          url: "/faculty/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Courses",
          url: "/faculty/courses",
          icon: GraduationCap,
        },
        {
          name: "Students",
          url: "/faculty/students",
          icon: Users,
        },
        {
          name: "Attendance",
          url: "/faculty/attendance",
          icon: Fingerprint,
        },
        {
          name: "Profile",
          url: "/faculty/profile",
          icon: User,
        },
      ],
    },
    navSecondary,
  },
  hod: {
    navMain: {
      items: [
        {
          name: "Dashboard",
          url: "/hod/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Faculty",
          url: "/hod/faculty",
          icon: Users,
        },
        {
          name: "Courses",
          url: "/hod/courses",
          icon: GraduationCap,
        },
        {
          name: "Reports",
          url: "/hod/reports",
          icon: BookOpenText,
        },
        {
          name: "Profile",
          url: "/hod/profile",
          icon: User,
        },
      ],
    },
    navSecondary,
  },
  coordinator: {
    navMain: {
      items: [
        {
          name: "Dashboard",
          url: "/coordinator/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Events",
          url: "/coordinator/events",
          icon: BookCopy,
        },
        {
          name: "Students",
          url: "/coordinator/students",
          icon: Users,
        },
        {
          name: "Reports",
          url: "/coordinator/reports",
          icon: BookOpenText,
        },
        {
          name: "Profile",
          url: "/coordinator/profile",
          icon: User,
        },
      ],
    },
    navSecondary,
  },
  coe: {
    navMain: {
      items: [
        {
          name: "Dashboard",
          url: "/coe/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Examinations",
          url: "/coe/examinations",
          icon: BookOpenText,
        },
        {
          name: "Results",
          url: "/coe/results",
          icon: GraduationCap,
        },
        {
          name: "Reports",
          url: "/coe/reports",
          icon: Fingerprint,
        },
        {
          name: "Profile",
          url: "/coe/profile",
          icon: User,
        },
      ],
    },
    navSecondary,
  },
} as const;
