import { useState } from "react";
import { useUserSession } from "@/store/userSessionsStore";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";
import MarketFeed from "@/components/dashboard/market-feed";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { Button } from "@/components/ui/button";

export function ServicesPage() {
  const user = useUserSession((state) => state.user);
  const isAuthenticated = !!user?.id;

  // Hooks for auth users - kept for Create Modal only
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sidebar determination - Always Categories for Marketplace view
  const Sidebar = <CategoriesSidebar />;

  // Main Content determination - Show Marketplace for EVERYONE
  const MainContent = (
    <div className="flex flex-col gap-6">
      {isAuthenticated && (
        <div className="flex justify-between items-center bg-white p-4 border border-black">
          <div>
            <h2 className="font-bold uppercase tracking-tight">
              Offer your services
            </h2>
            <p className="text-xs text-gray-500 font-mono">
              Join the marketplace today
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="uppercase font-bold"
          >
            Create Service
          </Button>
        </div>
      )}
      <MarketFeed />
    </div>
  );

  return (
    <>
      <DashboardLayout sidebar={Sidebar}>{MainContent}</DashboardLayout>

      {isAuthenticated && (
        <CreateServiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </>
  );
}
