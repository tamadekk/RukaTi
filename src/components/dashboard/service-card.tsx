import { useState } from "react";
import type { UserServices } from "@/types/user";
import { Button } from "@/components/ui/button";
import { EditServiceModal } from "@/components/dashboard/edit-service-modal";
import { useServiceStore } from "@/store/userServicesStore";

interface ServiceCardProps {
  service: UserServices;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const deleteService = useServiceStore((state) => state.deleteService);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this service?")) {
      setIsDeleting(true);
      await deleteService(service.service_id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-black p-4 space-y-4 bg-white transition-opacity hover:opacity-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{service.title}</h3>
          <p className="text-sm text-gray-500">{service.category}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
            Manage
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
      
      <p className="text-gray-600 line-clamp-2">{service.description}</p>
      
      <div className="flex gap-4 text-sm text-gray-500">
        {service.price_range && (
          <div>
            <span className="font-medium">Price:</span> {service.price_range}
          </div>
        )}
        {service.availability && (
          <div>
            <span className="font-medium">Availability:</span> {service.availability}
          </div>
        )}
      </div>

      <EditServiceModal 
        service={service} 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
      />
    </div>
  );
};
