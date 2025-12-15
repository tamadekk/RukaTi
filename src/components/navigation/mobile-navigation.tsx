import { Menu as MenuIcon, X } from "lucide-react";
import type { navigationItem } from "@/types";
import { NavigationLinks } from "./navigation-links";
import { AuthButtons } from "./auth-buttons";

export type MobileNavigationProps = {
  items: navigationItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export const MobileNavigation = ({
  items,
  isAuthenticated,
  onLogout,
  isOpen,
  onToggle,
  onClose,
}: MobileNavigationProps) => (
  <div className="md:hidden">
    <button onClick={onToggle} aria-label="Toggle menu">
      {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
    </button>

    {isOpen && (
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-black md:hidden px-4 py-4 space-y-4 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
        <div className="flex flex-col gap-4">
          <NavigationLinks items={items} onItemClick={onClose} />
          <div className="border-t border-gray-100 pt-2" />
          <AuthButtons
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
            mobile
            onLoginClick={onClose}
          />
        </div>
      </div>
    )}
  </div>
);
