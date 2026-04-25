import type { LucideIcon } from "lucide-react";

export type navigationItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  submenu?: navigationItem[];
};

export type FooterLink = {
  title: string;
  href: string;
};

export type GeoapifySuggestion = {
  formatted: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  name?: string;
  country?: string;
};
