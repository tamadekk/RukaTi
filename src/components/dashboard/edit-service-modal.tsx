import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAsyncAction } from "@/hooks/use-async-action";
import { CreateServiceForm } from "@/components/forms/create-service-form";
import type { UserServices } from "@/types/user";
import { useServiceStore } from "@/store/userServicesStore";
import type { ServiceFormData } from "@/schemas/services";
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
  const updateService = useServiceStore((state) => state.updateService);
  const loading = useServiceStore((state) => state.loading);
  const { isLoading, execute } = useAsyncAction();

  const handleSubmit = async (data: ServiceFormData) => {
    // TODO: consolidate with create service
    const hasChanges = checkHasChanges(data, service, [
      "title",
      "description",
      "category",
      "location",
      "contact",
      "price_range",
      "availability",
    ]);

    const hasImageChange = data.service_image && data.service_image.length > 0;

    if (!hasChanges && !hasImageChange) {
      toast.info("No changes detected.");
      return;
    }
    // TODO: terible logic going on here - stopgap, refactor ASAP
    if (hasImageChange) {
      const image = data.service_image[0];
      console.log(image);
      const imageUrl = await uploadImage({
        file: image,
        bucket: "user_services",
        folderPath: "service_image",
        fileNamePrefix: service.service_id,
      });
      data.service_image = imageUrl;
    }

    await execute(() => updateService(service.service_id, data), {
      successMessage: "Service updated successfully",
      errorMessage: "Failed to update service",
      onSuccess: onClose,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto border-2 border-black p-8 sm:rounded-none bg-white shadow-none">
        <DialogHeader className="mb-6 border-b border-black pb-4">
          <DialogTitle className="text-2xl font-bold uppercase tracking-tight font-mono">
            Edit Service
          </DialogTitle>
        </DialogHeader>
        <CreateServiceForm
          onSubmit={handleSubmit}
          loading={loading || isLoading}
          defaultValues={{
            title: service.title,
            description: service.description,
            category: service.category,
            location: service.location,
            contact: service.contact,
            price_range: service.price_range,
            availability: service.availability,
            service_image: service.service_image,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
