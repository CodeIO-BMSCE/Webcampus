import { HOD } from "./hod";

export const MESSAGES = {
  HOD,
} as const;

export type MESSAGES = (typeof MESSAGES)[keyof typeof MESSAGES];
