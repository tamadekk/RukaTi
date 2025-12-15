import { useEffect } from "react";
import { ServiceCard } from "@/components/dashboard/service-card";
import { useMarketStore } from "@/store/marketStore";

const MarketFeed = () => {
  const { services, loading, fetchAllServices } = useMarketStore();

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  if (loading && services.length === 0) {
    return (
      <div className="p-4 text-center font-mono text-sm">
        Loading services...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="font-semibold mb-4 uppercase tracking-wider">
        Explore Services
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500 font-mono text-sm border border-dashed border-gray-300">
            No services found. Be the first to create one!
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard
              service={service}
              key={service.service_id}
              readonly={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MarketFeed;
