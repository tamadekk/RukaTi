import { Link } from "@tanstack/react-router";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AuthButtonsProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
  mobile?: boolean;
  onLoginClick?: () => void;
};

export const AuthButtons = ({
  isAuthenticated,
  onLogout,
  mobile = false,
  onLoginClick,
}: AuthButtonsProps) => {
  const baseClasses = "font-bold uppercase gap-2";
  const mobileClasses = "w-full";

  const buttonClass = mobile ? `${mobileClasses} ${baseClasses}` : baseClasses;

  if (isAuthenticated) {
    return (
      <Button variant="default" className={buttonClass} onClick={onLogout}>
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    );
  }

  return (
    <Link
      to="/login"
      onClick={onLoginClick}
      className={mobile ? "w-full" : undefined}
    >
      <Button variant="default" className={buttonClass}>
        <LogIn className="h-4 w-4" />
        Login
      </Button>
    </Link>
  );
};
