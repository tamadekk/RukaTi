import { useState } from "react";
import { useUserSession } from "@/store/userSessionsStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";
import MarketFeed from "@/components/dashboard/market-feed";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { ServiceOfferHeader } from "@/components/dashboard/service-offer-header";
import { MobileFilters } from "@/components/dashboard/mobile-filters";

export function ServicesPage() {
  const user = useUserSession((state) => state.user);
  const isAuthenticated = !!user?.id;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const Sidebar = <CategoriesSidebar />;

  return (
    <>
      <DashboardLayout sidebar={Sidebar}>
        <div className="flex flex-col gap-6">
          <MobileFilters />
          {isAuthenticated && (
            <ServiceOfferHeader
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          )}
          <MarketFeed />
        </div>
      </DashboardLayout>

      {isAuthenticated && (
        <CreateServiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </>
  );
}
