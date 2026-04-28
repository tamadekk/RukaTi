import { useState, useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import { useUserSession } from "@/store/userSessionsStore";
import { useMarketStore } from "@/store/marketStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";
import MarketFeed from "@/components/dashboard/market-feed";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { ServiceOfferHeader } from "@/components/dashboard/service-offer-header";
import { MobileServiceBar } from "@/components/dashboard/mobile-service-bar";
import { RecentlyViewed } from "@/components/dashboard/recently-viewed";

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
  const { category } = useSearch({ from: "/services/" });
  const setSelectedCategory = useMarketStore((s) => s.setSelectedCategory);

  useEffect(() => {
    if (category) setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  return (
    <>
      <MobileServiceBar />
      <DashboardLayout sidebar={<CategoriesSidebar />}>
        <div className="flex flex-col gap-6">
          {isAuthenticated && <ServiceOfferSection />}
          <RecentlyViewed />
          <MarketFeed />
        </div>
      </DashboardLayout>
    </>
  );
}
