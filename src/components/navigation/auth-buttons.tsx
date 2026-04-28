import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";
import { useUserProfileStore } from "@/store/userProfileStore";

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
  const profile = useUserProfileStore((s) => s.userProfile);

  if (isAuthenticated) {
    if (mobile) {
      return (
        <div className="flex flex-col gap-2">
          <Button
            onClick={onCreateService}
            className="w-full font-bold uppercase gap-2 bg-black text-white hover:bg-neutral-800 rounded-none"
          >
            <Plus className="h-4 w-4" />
            Post a Service
          </Button>
          <Button
            variant="outline"
            className="w-full font-bold uppercase gap-2 rounded-none border-black"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      );
    }

    return (
      <UserMenu
        profile={profile}
        onLogout={onLogout}
        onCreateService={onCreateService}
      />
    );
  }

  return (
    <Link
      to="/login"
      onClick={onLoginClick}
      className={mobile ? "w-full" : undefined}
    >
      <Button
        variant="default"
        className={`font-bold uppercase gap-2 ${mobile ? "w-full" : ""}`}
      >
        <LogIn className="h-4 w-4" />
        Login
      </Button>
    </Link>
  );
};
