import { Link, useRouterState } from "@tanstack/react-router";
import {
  Search,
  HandPlatter,
  Plus,
  MessageCircle,
  UserCircle,
} from "lucide-react";

type MobileBottomBarProps = {
  onCreateService: () => void;
};

const leftItems = [
  { label: "Browse", href: "/services", icon: Search },
  { label: "My Services", href: "/my-services", icon: HandPlatter },
];
const rightItems = [
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Profile", href: "/edit-profile", icon: UserCircle },
];

export const MobileBottomBar = ({ onCreateService }: MobileBottomBarProps) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className={
        "z-50 md:hidden bg-white border-t-2 border-black transition-transform duration-300 "
      }
    >
      <div className="flex items-stretch h-16">
        {/* Left */}
        <div className="flex flex-1 items-stretch">
          {leftItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  active ? "text-blue-600" : "text-neutral-400 hover:text-black"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Centre CTA */}
        <button
          onClick={onCreateService}
          className="flex flex-col items-center justify-center bg-black text-white border-x-2 border-black hover:bg-neutral-800 transition-colors px-6"
          aria-label="Post a service"
        >
          <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
        </button>

        {/* Right */}
        <div className="flex flex-1 items-stretch">
          {rightItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  active ? "text-blue-600" : "text-neutral-400 hover:text-black"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
