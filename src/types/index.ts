import type { LucideIcon } from "lucide-react";

export type navigationItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  submenu?: navigationItem[];
};
