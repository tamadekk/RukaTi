import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AuthButtonsProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
  onCreateService?: () => void;
  mobile?: boolean;
  onLoginClick?: () => void;
};

export const AuthButtons = ({
  isAuthenticated,
  onLogout,
  onCreateService,
  mobile = false,
  onLoginClick,
}: AuthButtonsProps) => {
  const mobileBase = "w-full font-bold uppercase gap-2";
  const desktopBase = "font-bold uppercase gap-2";

  if (isAuthenticated) {
    return (
      <div className={`flex ${mobile ? "flex-col" : "items-center"} gap-2`}>
        <Button
          onClick={onCreateService}
          className={`${mobile ? mobileBase : desktopBase} bg-black text-white hover:bg-neutral-800 rounded-none`}
        >
          <Plus className="h-4 w-4" />
          Post a Service
        </Button>
        <Button
          variant="outline"
          className={`${mobile ? mobileBase : desktopBase} rounded-none border-black`}
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      onClick={onLoginClick}
      className={mobile ? "w-full" : undefined}
    >
      <Button variant="default" className={mobile ? mobileBase : desktopBase}>
        <LogIn className="h-4 w-4" />
        Login
      </Button>
    </Link>
  );
};
