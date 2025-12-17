import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProviderHeader } from "@/components/provider-details/provider-header";
import { ProviderServicesList } from "@/components/provider-details/provider-services-list";
import { ProviderReviews } from "@/components/provider-details/provider-reviews";

export function ProviderDetailsPage() {
  const { userId } = useParams({ from: "/provider/$userId" });
  const {
    providerProfile,
    providerServices,
    loading,
    error,
    fetchProviderDetails,
  } = useMarketStore();

  useEffect(() => {
    if (userId) {
      fetchProviderDetails(userId);
    }
  }, [userId, fetchProviderDetails]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center font-mono">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  if (error || !providerProfile) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center font-mono text-red-500">
          {error || "Provider not found"}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 font-mono max-w-6xl mx-auto w-full">
        <ProviderHeader profile={providerProfile} />
        <ProviderServicesList services={providerServices} />
        <ProviderReviews />
      </div>
    </DashboardLayout>
  );
}
