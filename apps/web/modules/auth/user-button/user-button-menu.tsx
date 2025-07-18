"use client";

import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@webcampus/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@webcampus/ui/components/dropdown-menu";
import { ThemeSwitcher } from "@webcampus/ui/components/theme-switcher";
import { Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const UserButton = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user.name}&radius=50&backgroundColor=0052ff&textColor=ffffff&size=128`;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="flex flex-col space-y-0.5">
          <span className="max-w-[16rem] truncate text-sm font-medium">
            {session?.user.name}
          </span>
          <span className="text-muted-foreground max-w-[16rem] truncate text-xs">
            {session?.user.displayUsername}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/student/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/account")}>
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center justify-between font-normal">
          <span>Theme</span>
          <ThemeSwitcher />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => router.push("/")}
        >
          <span>Home Page</span>
          <Home className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:text-destructive-foreground flex items-center justify-between"
          onClick={handleLogout}
        >
          <span>Log Out</span>
          <LogOut className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
