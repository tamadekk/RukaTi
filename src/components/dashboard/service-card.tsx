import { useState } from "react";
import type { UserServices } from "@/types/user";
import { Button } from "@/components/ui/button";
import { EditServiceModal } from "@/components/dashboard/edit-service-modal";
import { useServiceStore } from "@/store/userServicesStore";
import { Link } from "@tanstack/react-router";

interface ServiceCardProps {
  service: UserServices;
  readonly?: boolean;
}

export const ServiceCard = ({
  service,
  readonly = false,
}: ServiceCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const deleteService = useServiceStore((state) => state.deleteService);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this service?")) {
      setIsDeleting(true);
      await deleteService(service.service_id);
      setIsDeleting(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const CardContent = (
    <div className="border border-black bg-white transition-opacity hover:opacity-100 group cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 flex flex-row h-36">
      {service.service_image ? (
        <div className="w-36 h-full shrink-0 border-r border-black overflow-hidden relative">
          <img
            src={service.service_image}
            alt={service.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      ) : (
        <div className="w-36 h-full shrink-0 border-r border-black bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-mono p-4 text-center">
          No Image
        </div>
      )}

      <div className="flex flex-col min-w-0 flex-1 p-3 pl-4 relative">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 w-full">
            <h3
              className="font-bold uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors text-lg max-w-[85%]"
              title={service.title}
            >
              {service.title}
            </h3>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">
              {service.category}
            </p>
          </div>
          {!readonly && (
            <div className="absolute top-0 right-0 gap-1 flex bg-white/50 backdrop-blur-sm p-1">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={handleEditClick}
              >
                <span className="sr-only">Edit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <span className="sr-only">Delete</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </Button>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-xs line-clamp-2 mt-2 leading-relaxed">
          {service.description}
        </p>

        <div className="mt-auto pt-2 flex flex-col gap-0.5 text-[10px] text-gray-500 font-mono">
          {service.price_range && (
            <div className="flex justify-between">
              <span className="font-bold text-black">PRICE:</span>{" "}
              <span>{service.price_range}</span>
            </div>
          )}
          {service.availability && (
            <div className="flex justify-between">
              <span className="font-bold text-black">AVAIL:</span>{" "}
              <span>{service.availability}</span>
            </div>
          )}
        </div>
      </div>

      {!readonly && (
        <div onClick={(e) => e.stopPropagation()}>
          <EditServiceModal
            service={service}
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
          />
        </div>
      )}
    </div>
  );

  return (
    <Link
      to="/services/$serviceId"
      params={{ serviceId: service.service_id }}
      className="block h-full"
    >
      {CardContent}
    </Link>
  );
};
