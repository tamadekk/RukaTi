import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkHasChanges<T extends Record<string, any>>(
  formData: T,
  originalData: Record<string, any> | null | undefined,
  keys: (keyof T)[],
): boolean {
  if (!originalData) return false;

  return keys.some((key) => {
    const current = formData[key] ?? "";
    const original = originalData[key as string] ?? "";
    return current !== original;
  });
}
