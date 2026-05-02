import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAsyncAction } from "@/hooks/use-async-action";
import { CreateServiceForm } from "@/components/forms/create-service-form";
import type { UserServices } from "@/types/user";
import { useUpdateService } from "@/hooks/useUserServicesQuery";
import { ServiceSchema, type ServiceFormData } from "@/schemas/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkHasChanges } from "@/lib/utils";
import { uploadImage } from "@/lib/storage";

interface EditServiceModalProps {
  service: UserServices;
  isOpen: boolean;
  onClose: () => void;
}

export const EditServiceModal = ({
  service,
  isOpen,
  onClose,
}: EditServiceModalProps) => {
  const { mutateAsync: updateService } = useUpdateService();
  const { isLoading, execute } = useAsyncAction();

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      title: service.title,
      description: service.description,
      category: service.category,
      location: service.location,
      contact: service.contact,
      price_range: service.price_range,
      availability: service.availability,
      service_image: service.service_image,
    },
  });

  const handleSubmit = async (data: ServiceFormData) => {
    const hasChanges = checkHasChanges(data, service, [
      "title",
      "description",
      "category",
      "location",
      "contact",
      "price_range",
      "availability",
    ]);

    // TODO: consolidate with create service
    const isNewImage =
      data.service_image &&
      typeof data.service_image !== "string" &&
      data.service_image.length > 0;

    const isImageCleared =
      (!data.service_image ||
        (typeof data.service_image !== "string" &&
          data.service_image.length === 0)) &&
      service.service_image !== "";

    if (!hasChanges && !isNewImage && !isImageCleared) {
      toast.info("No changes detected.");
      return;
    }

    if (isNewImage) {
      const image = (data.service_image as unknown as FileList)[0];
      const imageUrl = await uploadImage({
        file: image,
        bucket: "user_services",
        folderPath: "service_image",
        fileNamePrefix: service.service_id,
      });
      data.service_image = imageUrl;
    } else if (isImageCleared) {
      data.service_image = "";
    } else {
      data.service_image = service.service_image;
    }

    await execute(
      () =>
        updateService({
          serviceId: service.service_id,
          userId: service.user_id,
          updates: data,
        }),
      {
        successMessage: "Service updated successfully",
        errorMessage: "Failed to update service",
        onSuccess: onClose,
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full sm:w-[95vw] sm:max-w-7xl sm:h-auto sm:max-h-[90vh] overflow-y-auto border-0 sm:border-2 border-black p-6 sm:p-8 sm:rounded-none bg-white shadow-none left-0 top-0 translate-x-0 translate-y-0 sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] max-w-none sm:max-w-7xl">
        <DialogHeader className="mb-6 border-b border-black pb-4">
          <DialogTitle className="text-2xl font-bold uppercase tracking-tight font-mono">
            Edit Service
          </DialogTitle>
        </DialogHeader>
        <CreateServiceForm
          form={form}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
