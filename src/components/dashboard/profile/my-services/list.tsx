import { ServiceCard } from "@/components/dashboard/service-card";
import { Button } from "@/components/ui/button";
import { Filter, Hammer, ArrowRight } from "lucide-react";
import type { UserServices } from "@/types/user";

type ServicesListProps = {
  services: UserServices[];
  hasAnyServices: boolean;
  onClearFilters: () => void;
  onCreateClick: () => void;
};

export const ServicesList = ({
  services,
  hasAnyServices,
  onClearFilters,
  onCreateClick,
}: ServicesListProps) => {
  if (services.length === 0 && !hasAnyServices) {
    return (
      <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 md:p-16 space-y-6 flex flex-col justify-center">
            <div className="w-14 h-14 bg-black flex items-center justify-center">
              <Hammer className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight">
                Your first listing is one click away.
              </h3>
              <p className="text-sm text-neutral-500 font-mono leading-relaxed">
                Create a service listing and start getting discovered by people
                in your neighborhood. It takes less than 5 minutes.
              </p>
            </div>
            <Button
              onClick={onCreateClick}
              className="self-start bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 font-mono uppercase tracking-widest border-2 border-black gap-2 group"
            >
              Create Your First Service
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="hidden md:flex border-l border-black flex-col divide-y divide-black">
            {[
              "Add a title & description",
              "Set your price range",
              "Pick your neighborhood",
              "Go live instantly",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-4 px-8 py-6">
                <span className="text-xs font-black text-neutral-300 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-mono text-neutral-600">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-24 text-center border-2 border-dashed border-neutral-200 bg-white">
        <div className="max-w-xs mx-auto space-y-4">
          <div className="w-12 h-12 bg-neutral-100 border-2 border-black flex items-center justify-center mx-auto">
            <Filter className="w-5 h-5 text-neutral-400" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-tight">
            No matches
          </h3>
          <p className="text-gray-500 font-mono text-xs">
            No services match your current filters.
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
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.service_id}
          service={service}
          variant="horizontal"
        />
      ))}
    </div>
  );
};
