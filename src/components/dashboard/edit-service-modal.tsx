import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAsyncAction } from "@/hooks/use-async-action";
import {
  CreateServiceForm,
  type ServiceImageData,
} from "@/components/forms/create-service-form";
import type { UserServices } from "@/types/user";
import { useUpdateService } from "@/hooks/useUserServicesQuery";
import { ServiceSchema, type ServiceFormData } from "@/schemas/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkHasChanges, parseServiceImages } from "@/lib/utils";
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

  const handleSubmit = async (
    data: ServiceFormData,
    images: ServiceImageData,
  ) => {
    const originalImageUrls = parseServiceImages(
      service.service_image as string,
    );
    const hasFieldChanges = checkHasChanges(data, service, [
      "title",
      "description",
      "category",
      "location",
      "contact",
      "price_range",
      "availability",
    ]);
    const hasImageChanges =
      images.newFiles.length > 0 ||
      images.existingUrls.length !== originalImageUrls.length ||
      images.existingUrls.some((url, i) => url !== originalImageUrls[i]);

    if (!hasFieldChanges && !hasImageChanges) {
      toast.info("No changes detected.");
      return;
    }

    const uploadedUrls = await Promise.all(
      images.newFiles.map((file) =>
        uploadImage({
          file,
          bucket: "user_services",
          folderPath: "service_image",
          fileNamePrefix: service.service_id,
        }),
      ),
    );
    const allImageUrls = [...images.existingUrls, ...uploadedUrls];
    data.service_image = JSON.stringify(allImageUrls);

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
