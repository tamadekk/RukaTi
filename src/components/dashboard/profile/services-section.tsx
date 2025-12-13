import { useServiceStore } from "@/store/userServicesStore";
import { Link } from "@tanstack/react-router";

import { ServiceCard } from "@/components/dashboard/service-card";

const ServicesSection = () => {
  const services = useServiceStore((state) => state.userServices) || [];
  const isServicesEmpty = services.length === 0;

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
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
        <button className="w-full mt-4 py-2 rounded-lg bg-green-900 text-white font-medium hover:bg-green-800 transition">
          + Add New Service
        </button>
      </Link>
    </div>
  );
};

export default ServicesSection;
