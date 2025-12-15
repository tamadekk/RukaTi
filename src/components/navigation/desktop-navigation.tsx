import type { navigationItem } from "@/types";
import { NavigationLinks } from "./navigation-links";
import { AuthButtons } from "./auth-buttons";

export type DesktopNavigationProps = {
  items: navigationItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
};

export const DesktopNavigation = ({
  items,
  isAuthenticated,
  onLogout,
}: DesktopNavigationProps) => (
  <nav className="hidden md:flex items-center gap-8">
    <NavigationLinks items={items} />
    <div className="border-l border-gray-300 h-6 mx-2" />
    <AuthButtons isAuthenticated={isAuthenticated} onLogout={onLogout} />
  </nav>
);
