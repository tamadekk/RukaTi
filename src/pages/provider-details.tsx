import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceCard } from "@/components/dashboard/service-card";
import { Star, Mail, MapPin } from "lucide-react";

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
        {/* Profile Header */}
        <div className="border border-black bg-white p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <Avatar className="w-32 h-32 border-2 border-black rounded-none">
            <AvatarImage
              src={providerProfile.avatar || undefined}
              className="object-cover"
            />
            <AvatarFallback className="rounded-none bg-gray-200 text-2xl font-bold">
              {providerProfile.email?.substring(0, 2).toUpperCase() || "??"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-tight">
                {providerProfile.email?.split("@")[0]}
              </h1>
              <div className="flex items-center gap-4 text-sm mt-1">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-black font-bold">
                    {providerProfile.rating || "New"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>
                    Joined{" "}
                    {new Date(
                      providerProfile.created_at || Date.now(),
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 italic max-w-2xl">
              "{providerProfile.bio || "No bio available."}"
            </p>

            <Button className="uppercase font-bold tracking-widest gap-2">
              <Mail className="w-4 h-4" />
              Contact Provider
            </Button>
          </div>
        </div>

        {/* Active Listings */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold uppercase border-b border-black pb-2">
            Active Listings ({providerServices.length})
          </h2>

          {providerServices.length === 0 ? (
            <div className="py-12 text-center text-gray-500 border border-dashed border-gray-300">
              No active services.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerServices.map((service) => (
                <ServiceCard
                  key={service.service_id}
                  service={service}
                  readonly={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reviews Placeholder */}
        <div className="space-y-4 opacity-75">
          <h2 className="text-xl font-bold uppercase border-b border-black pb-2">
            Latest Reviews
          </h2>
          <div className="border border-black bg-gray-50 p-6 text-center text-gray-500 italic">
            Reviews feature coming soon.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
