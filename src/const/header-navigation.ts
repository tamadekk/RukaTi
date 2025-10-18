import type { navigationItem } from "@/types";
import { House, List, Plus, CircleUser, Info } from "lucide-react";

export const navigationItems: navigationItem[] = [
  { title: "Home", href: "/", icon: House },
  { title: "Services", href: "/services", icon: List },
  { title: "Post a service", href: "/", icon: Plus },
  { title: "My profile", href: "/profile", icon: CircleUser },
  { title: "About", href: "/about", icon: Info },
];
