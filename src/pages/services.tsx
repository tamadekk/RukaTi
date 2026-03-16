import { useState } from "react";
import { useUserSession } from "@/store/userSessionsStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";
import MarketFeed from "@/components/dashboard/market-feed";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { ServiceOfferHeader } from "@/components/dashboard/service-offer-header";
import { MobileFilters } from "@/components/dashboard/mobile-filters";

function ServiceOfferSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ServiceOfferHeader onOpenCreateModal={() => setIsOpen(true)} />
      <CreateServiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function ServicesPage() {
  const user = useUserSession((state) => state.user);
  const isAuthenticated = !!user?.id;

  return (
    <DashboardLayout sidebar={<CategoriesSidebar />}>
      <div className="flex flex-col gap-6">
        <MobileFilters />
        {isAuthenticated && <ServiceOfferSection />}
        <MarketFeed />
      </div>
    </DashboardLayout>
  );
}
