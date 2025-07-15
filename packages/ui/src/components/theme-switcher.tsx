"use client";

import { Button } from "@webcampus/ui/components/button";
import { cn } from "@webcampus/ui/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

const themes = [
  { id: "system", icon: Monitor, label: "System theme" },
  { id: "light", icon: Sun, label: "Light theme" },
  { id: "dark", icon: Moon, label: "Dark theme" },
] as const;

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="inline-grid h-8 grid-cols-3 items-center overflow-hidden rounded-full border text-sm font-medium">
      {themes.map(({ id, icon: Icon, label }) => (
        <Toggle
          key={id}
          className={cn(
            "h-full w-full rounded-full p-1.5 hover:cursor-pointer",
            theme === id && "border"
          )}
          onClick={() => setTheme(id)}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </Toggle>
      ))}
    </div>
  );
}

function Toggle({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="ghost" size="icon" className={cn(className)} {...props} />
  );
}
