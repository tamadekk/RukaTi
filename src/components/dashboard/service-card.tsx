import { useState } from "react";
import { Star } from "lucide-react";
import { parseServiceImages } from "@/lib/utils";
import { useAsyncAction } from "@/hooks/use-async-action";
import type { UserServices } from "@/types/user";
import { Button } from "@/components/ui/button";
import { EditServiceModal } from "@/components/dashboard/edit-service-modal";
import { useDeleteService } from "@/hooks/useUserServicesQuery";
import { Link } from "@tanstack/react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import ServicePlaceholder from "@/assets/service-placeholder.svg";

interface ServiceCardProps {
  service: UserServices;
  readonly?: boolean;
  variant?: "vertical" | "horizontal";
}

export const ServiceCard = ({
  service,
  readonly = false,
  variant = "vertical",
}: ServiceCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { mutateAsync: deleteService } = useDeleteService();
  const { isLoading: isDeleting, execute: executeDelete } = useAsyncAction();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = ServicePlaceholder;
    setImageLoaded(true);
    console.error("Service image not found");
  };

  const onConfirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    await executeDelete(
      () =>
        deleteService({
          serviceId: service.service_id,
          userId: service.user_id,
        }),
      {
        successMessage: "Service deleted",
        errorMessage: "Failed to delete service",
        onSuccess: () => setIsDeleteDialogOpen(false),
      },
    );
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const isHorizontal = variant === "horizontal";

  const CardContent = (
    <div
      className={`border border-black bg-white transition-opacity hover:opacity-100 group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200
      ${isHorizontal ? "flex flex-row h-44" : "flex flex-col h-full p-3 space-y-2 cursor-pointer"}
      `}
    >
      <div
        className={`overflow-hidden border-black relative bg-gray-50
        ${isHorizontal ? "w-40 h-full shrink-0 border-r" : "aspect-[3/2] w-full border mb-1"}
        `}
      >
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full bg-gray-100 rounded-none animate-pulse" />
        )}
        <img
          src={
            parseServiceImages(service.service_image as string)[0] ??
            ServicePlaceholder
          }
          alt={service.title}
          className={`w-full h-full object-cover transition-all duration-700
            ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div
        className={`flex flex-col min-w-0 flex-1 ${isHorizontal ? "p-3 pl-4 relative" : ""}`}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 w-full">
            <h3
              className={`font-bold uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors
                ${isHorizontal ? "text-lg max-w-[85%]" : "text-sm"}
                `}
              title={service.title}
            >
              {service.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">
                {service.category}
              </p>
            </div>
          </div>
          {!readonly && (
            <div
              className={`flex gap-1
                ${isHorizontal ? "absolute top-0 right-0 bg-white/50 backdrop-blur-sm p-1" : "relative shrink-0 z-10"}
                `}
            >
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

              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6"
                    disabled={isDeleting}
                    onClick={(e) => e.stopPropagation()}
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
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Service?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete{" "}
                      <strong>{service.title}</strong>? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onConfirmDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white border-0 font-bold uppercase rounded-none"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <p
          className={`text-gray-600 text-xs line-clamp-3 leading-relaxed
          ${isHorizontal ? "mt-2" : ""}
          `}
        >
          {service.description}
        </p>

        <div
          className={`mt-auto pt-2 flex flex-col gap-0.5 text-[10px] text-gray-500 font-mono
          ${isHorizontal ? "" : "border-t border-gray-100"}
          `}
        >
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
          {service.rating ? (
            <div className="flex justify-between items-center">
              <span className="font-bold text-black">RATING:</span>
              <div className="flex items-center gap-0.5 text-[10px] font-bold text-black">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" />
                <span>{Number(service.rating).toFixed(1)}</span>
              </div>
            </div>
          ) : null}
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

  if (isHorizontal) {
    return CardContent;
  }

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
