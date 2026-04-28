import { Link } from "@tanstack/react-router";
import { LogOut, User, HandPlatter, Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { UserProfile } from "@/types/user";

type UserMenuProps = {
  profile: UserProfile | null;
  onLogout: () => void;
  onCreateService?: () => void;
};

function getInitials(name: string | null, email: string): string {
  if (name) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  }
  return email[0].toUpperCase();
}

export const UserMenu = ({
  profile,
  onLogout,
  onCreateService,
}: UserMenuProps) => {
  const displayName = profile?.full_name ?? profile?.email ?? "";
  const initials = getInitials(
    profile?.full_name ?? null,
    profile?.email ?? "?",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none">
          <Avatar className="size-8 rounded-none border-2 border-black">
            <AvatarImage src={profile?.avatar ?? undefined} alt={displayName} />
            <AvatarFallback className="rounded-none bg-black text-white text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden lg:block text-sm font-bold uppercase tracking-wide max-w-[120px] truncate">
            {profile?.full_name ?? "Account"}
          </span>
          <ChevronDown className="w-3 h-3 text-neutral-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 font-mono"
      >
        <DropdownMenuLabel className="px-4 py-3 border-b border-black">
          <p className="text-xs font-bold uppercase tracking-widest truncate">
            {profile?.full_name ?? "My Account"}
          </p>
          <p className="text-xs text-muted-foreground font-normal truncate mt-0.5">
            {profile?.email}
          </p>
        </DropdownMenuLabel>

        <div className="py-1">
          <DropdownMenuItem
            onClick={onCreateService}
            className="rounded-none px-4 py-3 gap-3 font-bold uppercase text-xs tracking-widest cursor-pointer bg-black text-white hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white m-2"
          >
            <Plus className="w-4 h-4" />
            Post a Service
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0 border-black" />

        <div className="py-1">
          <DropdownMenuItem asChild>
            <Link
              to="/my-services"
              className="rounded-none px-4 py-2.5 gap-3 text-xs uppercase tracking-widest cursor-pointer flex items-center"
            >
              <HandPlatter className="w-4 h-4" />
              My Services
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/edit-profile"
              className="rounded-none px-4 py-2.5 gap-3 text-xs uppercase tracking-widest cursor-pointer flex items-center"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0 border-black" />

        <div className="py-1">
          <DropdownMenuItem
            onClick={onLogout}
            className="rounded-none px-4 py-2.5 gap-3 text-xs uppercase tracking-widest cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
