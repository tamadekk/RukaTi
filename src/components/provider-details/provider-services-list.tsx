import { ServiceCard } from "@/components/dashboard/service-card";
import { ServiceCardSkeleton } from "@/components/skeletons/service-skeleton";
import type { UserServices } from "@/types/user";

type ProviderServicesListProps = {
  services: UserServices[];
  loading?: boolean;
};

export const ProviderServicesList = ({
  services,
  loading = false,
}: ProviderServicesListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-100 animate-pulse mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold uppercase border-b border-black pb-2">
        Active Listings ({services.length})
      </h2>

      {services.length === 0 ? (
        <div className="py-12 text-center text-gray-500 border border-dashed border-gray-300">
          No active services.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.service_id}
              service={service}
              readonly={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
