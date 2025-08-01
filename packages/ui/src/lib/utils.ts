import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
