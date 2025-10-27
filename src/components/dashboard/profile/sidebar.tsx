import type { UserProfile } from "@/types/user";

type SideBarProps = {
  user?: UserProfile | null;
};

const Sidebar = ({ user }: SideBarProps) => {
  const name = user?.email ?? "Provider";
  const avatar = user?.profile_image_url ?? "/src/assets/tutorTile.jpg";

  return (
    <aside className="w-full md:w-64 bg-white border-r flex flex-row md:flex-col justify-between py-4 md:py-6 px-2 md:px-4 h-20 md:h-auto fixed md:static bottom-0 left-0 right-0 z-20 md:z-auto">
      <div className="flex flex-row md:flex-col w-full">
        <div className="flex items-center gap-3 mb-0 md:mb-8 flex-1 md:flex-none">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          />
          <div className="hidden md:block">
            <div className="font-semibold text-base">{name}</div>
            <div className="text-xs text-gray-500">Provider</div>
          </div>
        </div>
        <nav className="flex flex-1 flex-row md:flex-col gap-2 justify-center md:justify-start items-center md:items-start">
          <SidebarLink label="Dashboard" active />
          <SidebarLink label="Profile" />
          <SidebarLink label="Services" />
          <SidebarLink label="Messages" />
          <SidebarLink label="Settings" />
        </nav>
      </div>
      <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm mt-4">
        <span className="material-icons text-base">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;

const SidebarLink = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <a
    href="#"
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${active ? "bg-green-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
  >
    {label}
  </a>
);
