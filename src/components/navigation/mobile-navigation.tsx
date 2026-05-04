import { NavAuthSection } from "./nav-auth-section";

type MobileNavigationProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
  onCreateService?: () => void;
};

export const MobileNavigation = ({
  isAuthenticated,
  onLogout,
  onCreateService,
}: MobileNavigationProps) => (
  <div className="md:hidden">
    <NavAuthSection
      isAuthenticated={isAuthenticated}
      onLogout={onLogout}
      onCreateService={onCreateService}
    />
  </div>
);
