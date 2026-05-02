import { useUserServices } from "@/hooks/useUserServicesQuery";
import { useUserSession } from "@/store/userSessionsStore";
import { ServiceCard } from "@/components/dashboard/service-card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface ServicesSectionProps {
  onAddServiceClick?: () => void;
}

const ServicesSection = ({ onAddServiceClick }: ServicesSectionProps) => {
  const { user } = useUserSession();
  const { data: allServices = [] } = useUserServices(user?.id);
  const displayServices = allServices.slice(0, 3);
  const hasMore = allServices.length > 3;
  const isServicesEmpty = allServices.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">Your Services</div>
        {hasMore && (
          <Link
            to="/my-services"
            className="text-xs font-mono uppercase tracking-tighter text-gray-500 hover:text-black transition-colors"
          >
            Show More ({allServices.length}) →
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {isServicesEmpty ? (
          <div className="text-sm text-gray-400 font-mono py-4 text-center border border-dashed border-gray-200">
            No services added yet.
          </div>
        ) : (
          displayServices.map((service) => (
            <ServiceCard
              service={service}
              key={service.service_id}
              variant="horizontal"
            />
          ))
        )}
      </div>
      <Button
        className="w-full mt-4 font-mono uppercase tracking-wide text-xs h-10 rounded-none border-black border-2"
        variant="outline"
        onClick={onAddServiceClick}
      >
        + Add New Service
      </Button>
    </div>
  );
};

export default ServicesSection;
