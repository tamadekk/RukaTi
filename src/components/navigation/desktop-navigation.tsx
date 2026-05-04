import type { navigationItem } from "@/types";
import { NavigationLinks } from "./navigation-links";
import { NavAuthSection } from "./nav-auth-section";

export type DesktopNavigationProps = {
  items: navigationItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
  onCreateService?: () => void;
};

export const DesktopNavigation = ({
  items,
  isAuthenticated,
  onLogout,
  onCreateService,
}: DesktopNavigationProps) => (
  <nav className="hidden md:flex items-center gap-8">
    <NavigationLinks items={items} />
    <div className="border-l border-gray-300 h-6 mx-2" />
    <NavAuthSection
      isAuthenticated={isAuthenticated}
      onLogout={onLogout}
      onCreateService={onCreateService}
    />
  </nav>
);
