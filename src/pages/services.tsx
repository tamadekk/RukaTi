import { useState } from "react";
import { useUserSession } from "@/store/userSessionsStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";
import MarketFeed from "@/components/dashboard/market-feed";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { ServiceOfferHeader } from "@/components/dashboard/service-offer-header";
import { MobileServiceBar } from "@/components/dashboard/mobile-service-bar";

function ServiceOfferSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <ServiceOfferHeader onOpenCreateModal={() => setIsOpen(true)} />
      </div>
      <CreateServiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function ServicesPage() {
  const user = useUserSession((state) => state.user);
  const isAuthenticated = !!user?.id;

  return (
    <>
      <MobileServiceBar />
      <DashboardLayout sidebar={<CategoriesSidebar />}>
        <div className="flex flex-col gap-6">
          {isAuthenticated && <ServiceOfferSection />}
          <MarketFeed />
        </div>
      </DashboardLayout>
    </>
  );
}
