import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserSession } from "@/store/userSessionsStore";
import { useUserProfile } from "@/hooks/useUserProfileQuery";
import { UserMenu } from "./user-menu";

type NavAuthSectionProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
  onCreateService?: () => void;
};

export const NavAuthSection = ({
  isAuthenticated,
  onLogout,
  onCreateService,
}: NavAuthSectionProps) => {
  const { user } = useUserSession();
  const { data: profile } = useUserProfile(user?.id);

  if (isAuthenticated) {
    return (
      <UserMenu
        profile={profile ?? null}
        onLogout={onLogout}
        onCreateService={onCreateService}
      />
    );
  }

  return (
    <Link to="/login">
      <Button className="font-bold uppercase gap-2">
        <LogIn className="h-4 w-4" />
        Login
      </Button>
    </Link>
  );
};
