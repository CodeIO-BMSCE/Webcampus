"use client";

import { Input } from "@webcampus/ui/components/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";

export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const id = useId();
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input
        id={id}
        className={cn("pe-9", className)}
        placeholder="Password"
        type={isVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-describedby={`${id}-description`}
        {...props}
      />
      <Button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
        variant={"ghost"}
      >
        {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
      </Button>
    </div>
  );
}
