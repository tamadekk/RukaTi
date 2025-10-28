import type { navigationItem } from "@/types";
import {
  House,
  List,
  Plus,
  CircleUser,
  Info,
  Gauge,
  User,
  HandPlatter,
  MessageCircle,
  Settings,
} from "lucide-react";

export const navigationItems: navigationItem[] = [
  { title: "Home", href: "/", icon: House },
  { title: "Services", href: "/services", icon: List },
  { title: "Post a service", href: "/", icon: Plus },
  { title: "My dashboard", href: "/dashboard", icon: CircleUser },
  { title: "About", href: "/about", icon: Info },
];

export const sideBarItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Gauge,
  },
  {
    title: "Profile",
    url: "/edit-profile",
    icon: User,
  },
  {
    title: "Services",
    url: "/services",
    icon: HandPlatter,
  },
  {
    title: "Messagses",
    url: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
