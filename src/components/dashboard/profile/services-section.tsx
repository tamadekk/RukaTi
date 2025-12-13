import { useServiceStore } from "@/store/userServicesStore";
import { Link } from "@tanstack/react-router";

import { ServiceCard } from "@/components/dashboard/service-card";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = useServiceStore((state) => state.userServices) || [];
  const isServicesEmpty = services.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="font-semibold mb-4">Your Services</div>
      <div className="flex flex-col gap-3">
        {isServicesEmpty ? (
          <div>No services added yet.</div>
        ) : (
          services.map((service) => (
            <ServiceCard service={service} key={service.service_id} />
          ))
        )}
      </div>
      <Link to="/create-service">
        <Button className="w-full mt-4" variant="default">
          + Add New Service
        </Button>
      </Link>
    </div>
  );
};

export default ServicesSection;
