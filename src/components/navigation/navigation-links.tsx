import { Link } from "@tanstack/react-router";
import type { navigationItem } from "@/types";

export type NavigationLinksProps = {
  items: navigationItem[];
  onItemClick?: () => void;
};

export const NavigationLinks = ({
  items,
  onItemClick,
}: NavigationLinksProps) => (
  <>
    {items.map((item) => (
      <Link
        key={item.href}
        to={item.href}
        className="text-gray-600 hover:text-black font-medium transition-colors flex items-center gap-2"
        onClick={onItemClick}
      >
        <span className="md:hidden">
          <item.icon className="w-4 h-4" />
        </span>
        {item.title}
      </Link>
    ))}
  </>
);
