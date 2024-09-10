// @ts-nocheck
import { RoleProp } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkPermission = (
  userRole: RoleProp,
  module: string,
  action: string
) => {
  console.log("userRole", userRole);

  if (userRole?.name === "Master") return true;

  if (!userRole?.permissions || !Array.isArray(userRole.permissions)) {
    return false;
  }

  return userRole.permissions.some(
    (p: any) => p.module === module && p.actions.includes(action)
  );
};
