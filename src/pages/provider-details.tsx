import { useParams } from "@tanstack/react-router";
import { useProviderDetails } from "@/hooks/useMarketQuery";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProviderHeader } from "@/components/provider-details/provider-header";
import { ProviderServicesList } from "@/components/provider-details/provider-services-list";

export function ProviderDetailsPage() {
  const { userId } = useParams({ from: "/provider/$userId" });
  const {
    data: providerData,
    isLoading: loading,
    isError,
  } = useProviderDetails(userId);

  const providerProfile = providerData?.profile ?? null;
  const providerServices = providerData?.services ?? [];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center font-mono">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !providerProfile) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center font-mono text-red-500">
          Provider not found
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 font-mono max-w-6xl mx-auto w-full">
        <ProviderHeader profile={providerProfile} />
        <ProviderServicesList services={providerServices} />
      </div>
    </DashboardLayout>
  );
}
