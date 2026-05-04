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
  const { user } = useUserSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const handleCreateService = () => {
    navigate({ to: "/my-services", search: { create: true } });
  };

  const navItems = user ? authenticatedNavigationItems : guestNavigationItems;

  return (
    <>
      <DesktopNavigation
        items={navItems}
        isAuthenticated={!!user}
        onLogout={handleLogout}
        onCreateService={handleCreateService}
      />
      <MobileNavigation
        isAuthenticated={!!user}
        onLogout={handleLogout}
        onCreateService={handleCreateService}
      />
    </>
  );
};

export default NavigationBar;
