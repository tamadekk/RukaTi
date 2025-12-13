import type { ReactNode } from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export const DashboardLayout = ({ sidebar, children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="max-w-7xl mx-auto border-x border-black bg-black gap-[1px] grid grid-cols-1 lg:grid-cols-12">
        {/* Sidebar - Spans 3 cols */}
        <div className="lg:col-span-3 bg-background p-6 flex flex-col gap-6">
          {sidebar}
        </div>

        {/* Main Content - Spans 9 cols */}
        <div className="lg:col-span-9 bg-background p-6 flex flex-col gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};
