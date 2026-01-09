import { ServiceCard } from "@/components/dashboard/service-card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import type { UserServices } from "@/types/user";

type ServicesListProps = {
  services: UserServices[];
  onClearFilters: () => void;
};

export const ServicesList = ({
  services,
  onClearFilters,
}: ServicesListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {services.length === 0 ? (
        <div className="py-32 text-center border-4 border-dashed border-neutral-200 bg-white shadow-none">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center mx-auto rounded-full border-2 border-black">
              <Filter className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">
              No Services Found
            </h3>
            <p className="text-gray-500 font-mono text-xs">
              Adjust your search or category filters to find what you're looking
              for.
            </p>
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="rounded-none font-mono text-xs uppercase tracking-widest border-black border-2"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.service_id}
              service={service}
              variant="horizontal"
            />
          ))}
        </div>
      )}
    </div>
  );
};
