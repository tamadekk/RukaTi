import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUserSession } from "@/store/userSessionsStore";
import {
  guestNavigationItems,
  authenticatedNavigationItems,
} from "@/const/navigation-links";
import { signOut } from "@/lib/authentication";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
    setIsMenuOpen(false);
  };

  const navItems = user ? authenticatedNavigationItems : guestNavigationItems;

  return (
    <>
      <DesktopNavigation
        items={navItems}
        isAuthenticated={!!user}
        onLogout={handleLogout}
      />
      <MobileNavigation
        items={navItems}
        isAuthenticated={!!user}
        onLogout={handleLogout}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default NavigationBar;
